
"use client";

import Image from "next/image";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  Trash2,
} from "lucide-react";

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

const BookingCard = ({
  booking,
  onCancel,
}: {
  booking: Booking;
  onCancel: (id: string) => void;
}) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#111B38] sm:flex-row">
      <div className="relative h-44 w-full shrink-0 sm:h-auto sm:w-44">
        <Image
          src={booking.imageUrl}
          alt={booking.title}
          fill
          sizes="(max-width: 640px) 100vw, 176px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-4">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-lime-400">
              {booking.category}
            </span>

            <span className="rounded-full bg-yellow-400/10 px-3 py-1 text-xs text-yellow-400">
              Pending
            </span>
          </div>

          <h2 className="mt-1 text-lg font-bold text-white">
            {booking.title}
          </h2>

          <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
            <MapPin size={14} />
            {booking.location}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-xs text-gray-300">
            <p className="flex items-center gap-2">
              <CalendarDays size={15} className="text-lime-400" />
              {booking.bookingDate}
            </p>

            <p className="flex items-center gap-2">
              <Clock3 size={15} className="text-lime-400" />
              {booking.startTime} - {booking.endTime}
            </p>

            <p className="flex items-center gap-2">
              <Users size={15} className="text-lime-400" />
              {booking.guests} Guests
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3">
          <div>
            <p className="text-xs text-gray-400">
              Hosted by {booking.ownerName}
            </p>

            <p className="mt-1 text-lg font-bold text-lime-400">
              ${booking.hourlyRate}
              <span className="text-xs font-normal text-gray-400">
                /hr
              </span>
            </p>
          </div>

          <button
            onClick={() => onCancel(booking._id)}
            className="flex items-center gap-2 rounded-lg border border-red-400/30 px-3 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-400/10"
          >
            <Trash2 size={14} />
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
