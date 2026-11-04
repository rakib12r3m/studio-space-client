
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Star,
  Sparkles,
  Clock,
} from "lucide-react";

type Studio = {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  location: string;
  hourlyRate: number | string;
  rating?: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function FeaturedStudios() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeaturedStudios = async () => {
      try {
        const response = await fetch(
          `${API_URL}/featured-studios`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch featured studios");
        }

        const data: Studio[] = await response.json();

        setStudios(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load studios. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedStudios();
  }, []);

  return (
    <section className="bg-[#F8FAFC] px-5 py-20 transition-colors duration-300 dark:bg-[#07152F] md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}

        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">

          <div className="text-center md:text-left">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-sm font-medium text-lime-600 dark:text-lime-400">
              <Sparkles size={16} />
              Featured Collection
            </div>

            <h2 className="text-3xl font-bold text-[#0F172A] md:text-4xl lg:text-5xl dark:text-white">
              Discover Creative{" "}
              <span className="text-lime-600 dark:text-lime-400">
                Spaces
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 md:text-base dark:text-slate-400">
              Explore inspiring creative spaces designed
              to bring your next big idea to life.
            </p>

          </div>

          <Link
            href="/studios"
            className="inline-flex items-center gap-2 rounded-xl bg-lime-400 px-6 py-3 font-semibold text-[#07152F] transition hover:bg-lime-300"
          >
            Explore All Studios
            <ArrowRight size={18} />
          </Link>

        </div>

        {/* Loading Skeleton */}

        {loading && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#102344]"
              >
                <div className="h-56 bg-slate-200 dark:bg-slate-700/50" />

                <div className="space-y-4 p-5">
                  <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-10 rounded bg-slate-200 dark:bg-slate-700" />
                </div>
              </div>
            ))}

          </div>
        )}

        {/* Error Message */}

        {!loading && error && (
          <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-5 py-12 text-center">
            <p className="text-red-600 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Empty State */}

        {!loading && !error && studios.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center dark:border-white/10 dark:bg-[#102344]">

            <Sparkles
              className="mx-auto mb-4 text-lime-600 dark:text-lime-400"
              size={40}
            />

            <h3 className="text-xl font-semibold text-[#0F172A] dark:text-white">
              No Studios Available Yet
            </h3>

            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Be the first to share your creative space!
            </p>

            <Link
              href="/add-studio"
              className="mt-6 inline-flex rounded-xl bg-lime-400 px-6 py-3 font-semibold text-[#07152F] transition hover:bg-lime-300"
            >
              Add Your Studio
            </Link>

          </div>
        )}

        {/* Studio Cards */}

        {!loading && !error && studios.length > 0 && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {studios.map((studio) => (
              <div
                key={studio._id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-2 hover:border-lime-400/50 hover:shadow-xl hover:shadow-lime-400/5 dark:border-white/10 dark:bg-[#102344]"
              >

                {/* Studio Image */}

                <div className="relative h-56 overflow-hidden bg-slate-200 dark:bg-slate-800">

                  {studio.imageUrl ? (
                    <Image
                      src={studio.imageUrl}
                      alt={studio.title}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-500 dark:text-slate-400">
                      No Image Available
                    </div>
                  )}

                  {/* Category Badge */}

                  <span className="absolute left-4 top-4 rounded-full bg-lime-400 px-3 py-1.5 text-xs font-bold text-[#07152F]">
                    {studio.category}
                  </span>

                  {/* Rating Badge */}

                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-[#07152F]/90 px-3 py-1.5 text-sm font-semibold text-white">

                    <Star
                      size={14}
                      className="fill-lime-400 text-lime-400"
                    />

                    {typeof studio.rating === "number"
                      ? studio.rating.toFixed(1)
                      : "New"}

                  </div>

                </div>

                {/* Studio Information */}

                <div className="p-5">

                  <h3 className="truncate text-xl font-bold text-[#0F172A] transition group-hover:text-lime-600 dark:text-white dark:group-hover:text-lime-400">
                    {studio.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-1.5">
  <Star
    size={15}
    className="fill-yellow-400 text-yellow-400"
  />

  <span className="text-sm font-semibold text-slate-700 dark:text-gray-200">
    {studio.rating
  ? Number(studio.rating).toFixed(1)
  : "0"}
      
  </span>

  <span className="text-xs text-slate-500 dark:text-gray-400">
    / 5 
  </span>
</div>

                  {/* Location */}

                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">

                    <MapPin
                      size={16}
                      className="shrink-0 text-lime-600 dark:text-lime-400"
                    />

                    <span className="truncate">
                      {studio.location}
                    </span>

                  </div>

                  {/* Price */}

                  <div className="my-5 flex items-center justify-between border-t border-slate-200 pt-5 dark:border-white/10">

                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Starting from
                      </p>

                      <p className="mt-1 text-2xl font-bold text-lime-600 dark:text-lime-400">
                        ${studio.hourlyRate}

                        <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                          {" "}/ hr
                        </span>
                      </p>
                    </div>

                    <Clock
                      size={20}
                      className="text-slate-500 dark:text-slate-400"
                    />

                  </div>

                  {/* View Details Button */}

                  <Link
                    href={`/studios/${studio._id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-lime-500/40 py-3 font-semibold text-lime-700 transition hover:bg-lime-400 hover:text-[#07152F] dark:text-lime-400"
                  >
                    View Details
                    <ArrowRight size={17} />
                  </Link>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}
