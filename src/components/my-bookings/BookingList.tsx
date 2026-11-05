"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CalendarDays, Trash2 } from "lucide-react";
import { toast } from "sonner";
import BookingCard, { Booking } from "./BookingCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const BookingList = ({
  bookings,
  email,
}: {
  bookings: Booking[];
  email: string;
}) => {
  const router = useRouter();

  const [myBookings, setMyBookings] = useState(bookings);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);

  const handleCancel = async () => {
    if (!bookingToCancel) return;

    const id = bookingToCancel;

    const selectedBooking = myBookings.find((booking) => booking._id === id);

    if (!selectedBooking || selectedBooking.status !== "Pending") {
      return;
    }

    try {
      setCancellingId(id);
      const token = await getTokenFromClient();
      const res = await fetch(
        `${API_URL}/bookings/${id}?email=${encodeURIComponent(email)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: "Cancelled",
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to cancel booking");
        return;
      }

      setMyBookings((prev) =>
        prev.map((booking) =>
          booking._id === id ? { ...booking, status: "Cancelled" } : booking,
        ),
      );

      setBookingToCancel(null);

      toast.success("Booking cancelled successfully!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setCancellingId(null);
    }
  };

  const handleDelete = async () => {
    if (!bookingToDelete) return;

    try {
      setDeletingId(bookingToDelete);
      const token = await getTokenFromClient();
      const res = await fetch(
        `${API_URL}/bookings/${bookingToDelete}?email=${encodeURIComponent(email)}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to delete booking");
        return;
      }

      setMyBookings((prev) =>
        prev.filter((booking) => booking._id !== bookingToDelete),
      );

      toast.success("Booking deleted successfully!");

      setBookingToDelete(null);

      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (!myBookings.length) {
    return (
      <>
        <div className="rounded-2xl border border-white/10 bg-[#111B38] px-5 py-20 text-center">
          <CalendarDays className="mx-auto mb-5 text-lime-400" size={45} />

          <h2 className="text-2xl font-bold text-white">No Bookings Yet!</h2>

          <p className="mx-auto mt-3 max-w-md text-gray-400">
            You haven&apos;t booked any creative spaces yet. Explore our studios
            and find the perfect space for your next project.
          </p>

          <Link
            href="/studios"
            className="mt-7 inline-block rounded-lg bg-lime-400 px-6 py-3 font-semibold text-[#080D20] transition hover:bg-lime-300"
          >
            Explore Studios
          </Link>
        </div>

        <AlertDialog
          open={!!bookingToDelete}
          onOpenChange={(open) => {
            if (!open && !deletingId) setBookingToDelete(null);
          }}
        >
          <AlertDialogContent className="border border-white/10 bg-[#111B38] text-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">
                Delete Booking?
              </AlertDialogTitle>

              <AlertDialogDescription className="text-gray-400">
                Are you sure you want to permanently delete this booking? This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={handleDelete}
                disabled={!!deletingId}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                {deletingId ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        {myBookings.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            onCancel={setBookingToCancel}
            onDelete={setBookingToDelete}
            cancelling={cancellingId === booking._id}
            deleting={deletingId === booking._id}
          />
        ))}
      </div>

      {/* Cancel Booking Confirmation */}
      <AlertDialog
        open={!!bookingToCancel}
        onOpenChange={(open) => {
          if (!open && !cancellingId) setBookingToCancel(null);
        }}
      >
        <AlertDialogContent className="border border-white/10 bg-[#111B38] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Cancel Booking?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to cancel this booking? This action will
              change your booking status to Cancelled.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={!!cancellingId}
              className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              Keep Booking
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleCancel}
              disabled={!!cancellingId}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              {cancellingId ? "Cancelling..." : "Yes, Cancel Booking"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Booking Confirmation */}
      <AlertDialog
        open={!!bookingToDelete}
        onOpenChange={(open) => {
          if (!open && !deletingId) setBookingToDelete(null);
        }}
      >
        <AlertDialogContent className="border border-white/10 bg-[#111B38] text-white">
          <AlertDialogHeader>
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
              <Trash2 className="text-red-400" size={22} />
            </div>

            <AlertDialogTitle className="text-white">
              Delete Booking?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to permanently delete this booking? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              disabled={!!deletingId}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              {deletingId ? "Deleting..." : "Yes, Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BookingList;
