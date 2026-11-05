
"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import type { Studio } from "@/app/studios/[id]/page";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const BookingModal = ({ studio }: { studio: Studio }) => {
  const [open, setOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login before booking");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const bookingDate = formData.get("bookingDate") as string;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;
    const guests = Number(formData.get("guests"));

    if (startTime >= endTime) {
      toast.error("End time must be after start time");
      return;
    }

    try {
      // Check existing bookings
      const checkRes = await fetch(
        `${API_URL}/bookings/${studio._id}/${bookingDate}`
      );

      if (!checkRes.ok) {
        toast.error("Could not check studio availability");
        return;
      }

      const existingBookings = await checkRes.json();

      // Check time overlap
      const isBooked = existingBookings.some(
        (booking: { startTime: string; endTime: string }) =>
          startTime < booking.endTime && endTime > booking.startTime
      );

      if (isBooked) {
        toast.error("This time slot is already booked!");
        return;
      }

      // Prepare booking data
      const data = {
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image,

        id: studio._id,
        bookingDate,
        startTime,
        endTime,
        guests: String(guests),

        title: studio.title,
        category: studio.category,
        location: studio.location,
        hourlyRate: studio.hourlyRate,
        securityDeposit: studio.securityDeposit,
        maxCapacity: studio.maxCapacity,
        imageUrl: studio.imageUrl,
        overview: studio.overview,
        amenities: studio.amenities,
        ownerName: studio.ownerName,
        ownerEmail: studio.ownerEmail,

        status: "Pending",
        bookedAt: new Date().toLocaleDateString("en-GB"),
      };

      // Save booking
      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Booking failed!");
        return;
      }

      toast.success("Studio booked successfully!");
      form.reset();
      setOpen(false);
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-lg bg-lime-400 py-3 font-bold text-[#080F2A]"
      >
        Book Workspace Now
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-xl bg-[#111B3A] p-6 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Book Your Studio</h2>

              <button type="button" onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <p className="mt-2 text-sm text-gray-400">
              {studio.title}
            </p>

            <form onSubmit={handleBooking} className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Booking Date
                </label>

                <input
                  type="date"
                  name="bookingDate"
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="w-full rounded-lg border border-white/10 bg-[#080F2A] p-3 text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Start Time
                </label>

                <input
                  type="time"
                  name="startTime"
                  required
                  className="w-full rounded-lg border border-white/10 bg-[#080F2A] p-3 text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  End Time
                </label>

                <input
                  type="time"
                  name="endTime"
                  required
                  className="w-full rounded-lg border border-white/10 bg-[#080F2A] p-3 text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Number of Guests
                </label>

                <input
                  type="number"
                  name="guests"
                  min="1"
                  max={Number(studio.maxCapacity)}
                  placeholder={`Enter guests (Max ${studio.maxCapacity} people)`}
                  required
                  className="w-full rounded-lg border border-white/10 bg-[#080F2A] p-3 text-white placeholder:text-gray-500"
                />
              </div>

              <p className="text-sm text-gray-400">
                Hourly Rate:{" "}
                <span className="font-bold text-lime-400">
                  ${studio.hourlyRate}
                </span>
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full rounded-lg border border-white/20 py-3 text-white transition hover:bg-white/10"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-lime-400 py-3 font-semibold text-[#080F2A] transition hover:bg-lime-300"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingModal;
