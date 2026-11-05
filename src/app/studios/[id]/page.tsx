
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin, Users, Clock, ShieldCheck,
  CheckCircle2, ArrowLeft, Star, Mail,
} from "lucide-react";
import BookingModal from "@/components/BookingModal";

export interface Studio {
  _id: string;
  title: string;
  category: string;
  location: string;
  hourlyRate: string;
  securityDeposit: string;
  maxCapacity: string;
  imageUrl: string;
  overview: string;
  amenities: string[];
  ownerName: string;
  ownerEmail: string;
  rating?: number;
}

interface Props {
  params: Promise<{ id: string }>;
}

const StudioDetails = async ({ params }: Props) => {
  const { id } = await params;
 
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios/${id}`);


  if (!res.ok) {
  notFound();
}

  const studio: Studio = await res.json();

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-8 text-[#0F172A] transition-colors duration-300 dark:bg-[#080F2A] dark:text-white md:px-8">
      <div className="mx-auto max-w-7xl">

        <Link href="/studios" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-lime-600 dark:text-gray-400 dark:hover:text-lime-400">
          <ArrowLeft size={16} />
          Back to Studios
        </Link>

        <div className="relative h-[280px] overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 sm:h-[400px]">
          <Image
            src={studio.imageUrl}
            alt={studio.title}
            fill
            priority
            unoptimized
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#080F2A]/90 via-transparent to-transparent" />

          <span className="absolute bottom-5 left-5 rounded-lg bg-lime-400 px-4 py-2 text-xs font-bold text-[#080F2A]">
            {studio.category}
          </span>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_350px]">

          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold md:text-4xl">
                  {studio.title}
                </h1>

                <p className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-gray-400">
                  <MapPin size={17} className="text-lime-600 dark:text-lime-400" />
                  {studio.location}
                </p>
              </div>

              <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm dark:border-white/10 dark:bg-[#111B3A]">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                {studio.rating || "New"}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#111B3A]">
                <Users className="mb-3 text-lime-600 dark:text-lime-400" />
                <p className="text-lg font-bold">{studio.maxCapacity}</p>
                <p className="text-xs text-slate-500 dark:text-gray-400">Maximum Guests</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#111B3A]">
                <Clock className="mb-3 text-lime-600 dark:text-lime-400" />
                <p className="text-lg font-bold">Hourly</p>
                <p className="text-xs text-slate-500 dark:text-gray-400">Booking Type</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#111B3A]">
                <ShieldCheck className="mb-3 text-lime-600 dark:text-lime-400" />
                <p className="text-lg font-bold">Secure</p>
                <p className="text-xs text-slate-500 dark:text-gray-400">Studio Booking</p>
              </div>
            </div>

            <section className="mt-10">
              <h2 className="text-xl font-bold">About This Studio</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-gray-400">
                {studio.overview}
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-bold">Studio Amenities</h2>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {studio.amenities?.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-[#111B3A]">
                    <CheckCircle2 size={18} className="text-lime-600 dark:text-lime-400" />
                    <span className="text-sm text-slate-700 dark:text-gray-300">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#111B3A]">
              <h2 className="text-xl font-bold">Meet Your Host</h2>

              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-lime-400 text-xl font-bold text-[#080F2A]">
                  {studio.ownerName?.charAt(0) || "H"}
                </div>

                <div>
                  <h3 className="font-bold">{studio.ownerName}</h3>
                  <p className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-gray-400">
                    <Mail size={14} />
                    {studio.ownerEmail}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <aside>
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 dark:border-white/10 dark:bg-[#111B3A] dark:shadow-black/20">
              <p className="text-sm text-slate-500 dark:text-gray-400">Starting from</p>

              <h2 className="mt-2 text-3xl font-bold text-lime-600 dark:text-lime-400">
                ${studio.hourlyRate}
                <span className="text-sm font-normal text-slate-500 dark:text-gray-400"> / hour</span>
              </h2>

              <div className="my-6 border-t border-slate-200 dark:border-white/10" />

              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-gray-400">Hourly Rate</span>
                <span>${studio.hourlyRate}</span>
              </div>

              <div className="mt-4 flex justify-between text-sm">
                <span className="text-slate-500 dark:text-gray-400">Security Deposit</span>
                <span>${studio.securityDeposit}</span>
              </div>

              <div className="my-6 border-t border-slate-200 dark:border-white/10" />

              <BookingModal studio={studio} />

              <p className="mt-4 text-center text-xs text-slate-500 dark:text-gray-500">
                Book your creative space with confidence.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default StudioDetails;
