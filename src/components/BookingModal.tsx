"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import type { Studio } from "@/app/studios/[id]/page";

const BookingModal = ({ studio }: { studio: Studio }) => {
  const [open, setOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user, "user from bookingModal");

  // const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault(); 
  //   const formData = new FormData(e.currentTarget)
  //   const info = Object.fromEntries(formData.entries())
  //   console.log(info, 'from booking form');
    

  //   if (!user) {
  //     toast.error("Please login before booking");
  //     return;
  //   }

  //   // const formData = new FormData(e.currentTarget);

  //   // const bookingDate = formData.get("bookingDate") as string;
  //   // const startTime = formData.get("startTime") as string;
  //   // const endTime = formData.get("endTime") as string;
  //   // const guests = Number(formData.get("guests"));

  //   // const start = new Date(`2000-01-01T${startTime}`);
  //   // const end = new Date(`2000-01-01T${endTime}`);

  //   // const hours = (end.getTime() - start.getTime()) / 3600000;

  //   // if (hours <= 0) {
  //   //   toast.error("End time must be after start time");
  //   //   return;
  //   // }

  //   // const bookingData = {
  //   //   studioId: studio._id,
  //   //   studioTitle: studio.title,
  //   //   ownerName: studio.ownerName,
  //   //   ownerEmail: studio.ownerEmail,
  //   //   userName: user.name,
  //   //   userEmail: user.email,
  //   //   bookingDate,
  //   //   startTime,
  //   //   endTime,
  //   //   guests,
  //   //   hourlyRate: Number(studio.hourlyRate),
  //   //   totalPrice: hours * Number(studio.hourlyRate),
  //   //   securityDeposit: Number(studio.securityDeposit),
  //   //   status: "Pending",
  //   //   createdAt: new Date(),
  //   // };

  //   // try {
  //   //   const res = await fetch("http://localhost:8000/bookings", {
  //   //     method: "POST",
  //   //     headers: {
  //   //       "Content-Type": "application/json",
  //   //     },
  //   //     body: JSON.stringify(bookingData),
  //   //   });

  //   //   const result = await res.json();

  //   //   if (!res.ok) {
  //   //     toast.error(result.message || "Booking failed");
  //   //     return;
  //   //   }

  //   //   toast.success("Studio booked successfully!");
  //   //   setOpen(false);
  //   //   e.currentTarget.reset();
  //   // } catch {
  //   //   toast.error("Something went wrong!");
  //   // }
  // };
const handleBooking =async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const info = Object.fromEntries(formData.entries());

  console.log(info, "Booking Form Data");

const data = {
  ...user,
  ...info,
  ...studio,
  bookedAt: new Date().toLocaleDateString("en-GB"),

}
// const data = {
//   ...info,
//   userName: user?.name,
//   userEmail: user?.email,
//   studioId: studio._id,
//   studioTitle: studio.title,
//   ownerName: studio.ownerName,
//   ownerEmail: studio.ownerEmail,
//   hourlyRate: Number(studio.hourlyRate),
//   securityDeposit: Number(studio.securityDeposit),
//   bookedAt: new Date(),
//   status: "Pending",
// };
console.log(data, " all Data");

const res = await fetch('http://localhost:8000/bookings',{
  method: "POST",
  headers: {
    "Content-Type":"application/json"
  },
  body: JSON.stringify(data)
})
const BookingData = await res.json()
console.log(BookingData, "Booking Data");

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

            <p className="mt-2 text-sm text-gray-400">{studio.title}</p>

            {/* <form onSubmit={handleBooking} className="mt-5 space-y-4">

              <input
                type="date"
                name="bookingDate"
                min={new Date().toISOString().split("T")[0]}
                required
                className="w-full rounded-lg bg-[#080F2A] p-3"
              />

              <input
                type="time"
                name="startTime"
                required
                className="w-full rounded-lg bg-[#080F2A] p-3"
              />

              <input
                type="time"
                name="endTime"
                required
                className="w-full rounded-lg bg-[#080F2A] p-3"
              />

              <input
                type="number"
                name="guests"
                min="1"
                max={Number(studio.maxCapacity)}
                placeholder="Number of guests"
                required
                className="w-full rounded-lg bg-[#080F2A] p-3"
              />

              <p className="text-sm text-gray-400">
                Hourly Rate: ${studio.hourlyRate}
              </p>

              <button
                type="submit"
                className="w-full rounded-lg bg-lime-400 py-3 font-bold text-[#080F2A]"
              >
                Confirm Booking
              </button>

            </form> */}
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
