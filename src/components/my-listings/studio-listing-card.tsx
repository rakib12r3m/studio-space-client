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
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0D2450]">
      <div className="relative h-52">
        <Image
          src={studio.imageUrl}
          alt={studio.title}
          fill
          className="object-cover"
          unoptimized
        />

        <span className="absolute left-3 top-3 rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-[#071936]">
          {studio.category}
        </span>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h2 className="text-xl font-bold text-white">{studio.title}</h2>

          <p className="mt-2 flex items-center gap-2 text-sm text-gray-400">
            <MapPin size={16} />
            {studio.location}
          </p>

          <p className="mt-2 flex items-center gap-2 text-sm text-gray-400">
            <Users size={16} />
            Maximum {studio.maxCapacity} people
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <p className="text-lg font-bold text-lime-400">
            ${studio.hourlyRate}
            <span className="text-xs text-gray-400"> / hour</span>
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
            <Button className="w-full bg-lime-400 text-[#071936] hover:bg-lime-300">
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
