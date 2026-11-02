
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Users,
  ArrowUpRight,
  SlidersHorizontal,
} from "lucide-react";

interface Studio {
  _id: string;
  title: string;
  category: string;
  location: string;
  hourlyRate: string;
  maxCapacity: string;
  imageUrl: string;
}

const categories = [
  "All Studios",
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
];

const AllStudios = () => {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Studios");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/studios")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch studios");
        return res.json();
      })
      .then(setStudios)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredStudios = studios
    .filter(
      (studio) =>
        (studio.title.toLowerCase().includes(search.toLowerCase()) ||
          studio.location.toLowerCase().includes(search.toLowerCase())) &&
        (category === "All Studios" || studio.category === category)
    )
    .sort((a, b) => {
      if (sort === "low")
        return Number(a.hourlyRate) - Number(b.hourlyRate);
      if (sort === "high")
        return Number(b.hourlyRate) - Number(a.hourlyRate);
      return 0;
    });

  return (
    <main className="min-h-screen bg-[#080F2A] text-white">

      {/* Search Section */}
      <section className="border-b border-white/10 bg-gradient-to-br from-[#101F52] to-[#080F2A]">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto flex max-w-2xl items-center gap-2 rounded-xl bg-white p-2 shadow-xl">
            <Search className="ml-2 h-5 w-5 shrink-0 text-gray-500" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search studios or location..."
              className="w-full min-w-0 bg-transparent px-2 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />

            <button
              onClick={() => setSearch(search.trim())}
              className="rounded-lg bg-lime-400 px-4 py-2.5 text-sm font-bold text-[#080F2A] hover:bg-lime-300"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* All Studios */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-8">

        {/* Section Heading */}
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[2px] text-lime-400">
              Discover Your Space
            </p>
            <h2 className="mt-1 text-2xl font-bold md:text-3xl">
              Explore All Studios
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Find the right space for your creative project.
            </p>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#111B3A] px-3 py-2">
            <SlidersHorizontal className="h-4 w-4 text-lime-400" />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent text-sm text-gray-300 outline-none"
            >
              <option value="default">Default Sorting</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
                category === item
                  ? "bg-lime-400 text-[#080F2A]"
                  : "border border-white/10 bg-[#111B3A] text-gray-300 hover:text-lime-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Result Count */}
        <p className="mb-4 text-sm text-gray-400">
          Showing{" "}
          <span className="text-lime-400">{filteredStudios.length}</span>{" "}
          studios
        </p>

        {/* Loading & Empty State */}
        {loading ? (
          <p className="py-12 text-center text-gray-400">
            Loading studios...
          </p>
        ) : filteredStudios.length === 0 ? (
          <div className="py-16 text-center">
            <h3 className="text-xl font-bold">No Studios Found</h3>
            <p className="mt-2 text-sm text-gray-400">
              Try another search or category.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All Studios");
              }}
              className="mt-4 rounded-lg bg-lime-400 px-4 py-2 text-sm font-bold text-[#080F2A]"
            >
              Clear Filters
            </button>
          </div>
        ) : (

          /* Studio Cards */
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredStudios.map((studio) => (
              <div
                key={studio._id}
                className="group overflow-hidden rounded-xl border border-white/10 bg-[#111B3A] transition hover:-translate-y-1 hover:border-lime-400/40"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden sm:h-44">
                  <Image
                    src={studio.imageUrl}
                    alt={studio.title}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-3 top-3 rounded-md bg-[#080F2A]/85 px-2.5 py-1 text-[10px] text-lime-400">
                    {studio.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-3.5">
                  <h3 className="truncate text-base font-bold group-hover:text-lime-400">
                    {studio.title}
                  </h3>

                  <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                    <MapPin size={14} className="text-lime-400" />
                    {studio.location}
                  </p>

                  <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                    <Users size={14} className="text-lime-400" />
                    Up to {studio.maxCapacity} people
                  </p>

                  <div className="my-3 border-t border-white/10" />

                  <div className="flex items-center justify-between gap-2">
                    <p className="text-lg font-bold text-lime-400">
                      ${studio.hourlyRate}
                      <span className="text-[10px] font-normal text-gray-400">
                        /hour
                      </span>
                    </p>

                    <Link
                      href={`/studios/${studio._id}`}
                      className="flex items-center gap-1 rounded-lg bg-lime-400 px-3 py-2 text-xs font-bold text-[#080F2A] hover:bg-lime-300"
                    >
                      View Details
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default AllStudios;
