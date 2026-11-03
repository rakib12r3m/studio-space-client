
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Studio {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
}

const categories = [
  {
    name: "Photo Studio",
    description: "Photography & Creative Shoots",
  },
  {
    name: "Film Stage",
    description: "Film & Video Production",
  },
  {
    name: "Podcast Lounge",
    description: "Podcast & Audio Recording",
  },
  {
    name: "Music Suite",
    description: "Music & Sound Production",
  },
  {
    name: "Workshop",
    description: "Art & Creative Projects",
  },
];

const StudioCategories = () => {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/studios")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch studios");
        return res.json();
      })
      .then((data) => setStudios(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-[#080F2A] py-16 text-white md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">

        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[3px] text-lime-400">
            Find Your Creative Space
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Browse by Studio Categories
          </h2>

          <p className="mt-3 text-sm text-gray-400">
            Find the perfect creative space for your next project.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">

          {categories.map((category) => {
            const categoryStudio = studios.find(
              (studio) => studio.category === category.name
            );

            return (
              <Link
                key={category.name}
                href={`/studios?category=${encodeURIComponent(category.name)}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111B3A] transition hover:-translate-y-2 hover:border-lime-400/50"
              >
                <div className="relative h-48 overflow-hidden bg-[#172448]">

                  {loading ? (
                    <div className="h-full w-full animate-pulse bg-white/10" />
                  ) : categoryStudio ? (
                    <Image
                      src={categoryStudio.imageUrl}
                      alt={category.name}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, 20vw"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                      No image available
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#080F2A]/80 to-transparent" />
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold group-hover:text-lime-400">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-xs text-gray-400">
                    {category.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs font-bold text-lime-400">
                      Explore Studios
                    </span>

                    <span className="text-lime-400 transition group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default StudioCategories;
