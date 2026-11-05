import Image from "next/image";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  Trash2,
} from "lucide-react";

export type Booking = {
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
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
};

const statusStyles: Record<Booking["status"], string> = {
  Pending: "bg-yellow-400/10 text-yellow-400",
  Confirmed: "bg-green-400/10 text-green-400",
  Completed: "bg-blue-400/10 text-blue-400",
  Cancelled: "bg-red-400/10 text-red-400",
};

const BookingCard = ({
  booking,
  onCancel,
  onDelete,
  cancelling,
  deleting,
}: {
  booking: Booking;
  onCancel: (id: string) => void;
  onDelete: (id: string) => void;
  cancelling: boolean;
  deleting: boolean;
}) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#111B38] sm:flex-row">
      <div className="relative h-20 w-full shrink-0 p-2 sm:h-auto sm:w-32">
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          <Image
            src={booking.imageUrl}
            alt={booking.title}
            fill
            sizes="(max-width: 640px) 100vw, 112px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-1.5 p-2.5">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold text-lime-400">
              {booking.category}
            </span>

            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusStyles[booking.status]}`}
            >
              {booking.status}
            </span>
          </div>

          <h2 className="mt-1 text-sm font-bold text-white">
            {booking.title}
          </h2>

          <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-gray-400">
            <MapPin size={12} />
            {booking.location}
          </p>

          <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] text-gray-300 sm:grid-cols-3">
            <p className="flex items-center gap-1.5">
              <CalendarDays size={13} className="shrink-0 text-lime-400" />
              {booking.bookingDate}
            </p>

            <p className="flex items-center gap-1.5">
              <Clock3 size={13} className="shrink-0 text-lime-400" />
              {booking.startTime} - {booking.endTime}
            </p>

            <p className="flex items-center gap-1.5">
              <Users size={13} className="shrink-0 text-lime-400" />
              {booking.guests} Guests
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-1.5">
          <div>
            <p className="text-[11px] text-gray-400">
              Hosted by {booking.ownerName}
            </p>

            <p className="text-sm font-bold text-lime-400">
              ${booking.hourlyRate}
              <span className="text-[11px] font-normal text-gray-400">
                /hr
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {booking.status === "Pending" && (
              <button
                onClick={() => onCancel(booking._id)}
                disabled={cancelling || deleting}
                className="flex items-center gap-1.5 rounded-lg border border-red-400/30 px-2.5 py-1.5 text-[11px] font-semibold text-red-400 transition hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 size={13} />
                {cancelling ? "Cancelling..." : "Cancel Booking"}
              </button>
            )}

            <button
              onClick={() => onDelete(booking._id)}
              disabled={cancelling || deleting}
              className="flex items-center gap-1.5 rounded-lg bg-red-500 px-2.5 py-1.5 text-[11px] font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 size={13} />
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;