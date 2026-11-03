
"use client";

import Link from "next/link";
import { CalendarDays } from "lucide-react";
import BookingCard from "./BookingCard";

type Booking = {
  _id: string;
  title: string;
  category: string;
  location: string;
  imageUrl: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  guests: string;
  hourlyRate: string;
  securityDeposit: string;
  amenities: string[];
  ownerName: string;
  ownerEmail: string;
};

const BookingList = ({ bookings }: { bookings: Booking[] }) => {
  if (!bookings.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#111B38] px-5 py-20 text-center">
        <CalendarDays className="mx-auto mb-5 text-lime-400" size={45} />

        <h2 className="text-2xl font-bold text-white">
          No Bookings Yet!
        </h2>

        <p className="mx-auto mt-3 max-w-md text-gray-400">
          You haven't booked any creative spaces yet. Explore our studios
          and find the perfect space for your next project.
        </p>

        <Link
          href="/studios"
          className="mt-7 inline-block rounded-lg bg-lime-400 px-6 py-3 font-semibold text-[#080D20] transition hover:bg-lime-300"
        >
          Explore Studios
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} />
      ))}
    </div>
  );
};

export default BookingList;
