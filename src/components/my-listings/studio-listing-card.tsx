
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export type StudioType = {
  _id: string;
  title: string;
  category: string;
  location: string;
  hourlyRate: string | number;
  securityDeposit: string | number;
  maxCapacity: string | number;
  imageUrl: string;
  amenities: string[];
  overview: string;
  ownerName: string;
  ownerEmail: string;
};

type Props = {
  studio: StudioType;
  onDelete: (studio: StudioType) => void;
};

export default function StudioListingCard({ studio, onDelete }: Props) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors dark:border-white/10 dark:bg-[#0D2450] sm:flex-row">
      <div className="relative h-52 sm:h-auto sm:w-1/3 sm:shrink-0">
        <Image
          src={studio.imageUrl}
          alt={studio.title}
          fill
          className="object-cover"
          unoptimized
        />

        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-green-700 dark:bg-[#080F2A]/85 dark:text-lime-400">
          {studio.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between space-y-4 p-5">
        <div>
          <h2 className="text-xl font-bold text-[#14275D] dark:text-white">{studio.title}</h2>

          <p className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <MapPin size={16} />
            {studio.location}
          </p>

          <p className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Users size={16} />
            Maximum {studio.maxCapacity} people
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 pt-4 dark:border-white/10">
          <p className="text-lg font-bold text-green-600 dark:text-lime-400">
            ${studio.hourlyRate}
            <span className="text-xs text-gray-500 dark:text-gray-400"> / hour</span>
          </p>
        </div>

        <div className="flex gap-3">
          {/* <Button asChild className="flex-1 bg-lime-400 text-[#071936] hover:bg-lime-300">
            <Link href={`/studios/edit/${studio._id}`}>
              <Pencil size={16} />
              Edit
            </Link>
          </Button> */}
          <Link href={`/studios/edit/${studio._id}`} className="flex-1">
            <Button className="w-full bg-green-600 text-white hover:bg-green-700 dark:bg-lime-400 dark:text-[#080F2A] dark:hover:bg-lime-300">
              <Pencil size={16} />
              Edit
            </Button>
          </Link>

          <Button variant="destructive" onClick={() => onDelete(studio)}>
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
