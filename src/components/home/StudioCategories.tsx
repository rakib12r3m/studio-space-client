
"use client";

import Link from "next/link";
import {
  Camera,
  Clapperboard,
  Mic2,
  Music2,
  Palette,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  {
    name: "Photo Studio",
    description: "Photography, portraits and creative shoots.",
    number: "01",
    icon: Camera,
  },
  {
    name: "Film Stage",
    description: "Professional spaces for film and video production.",
    number: "02",
    icon: Clapperboard,
  },
  {
    name: "Podcast Lounge",
    description: "Perfect environments for podcasts and recording.",
    number: "03",
    icon: Mic2,
  },
  {
    name: "Music Suite",
    description: "Create, record and produce your next sound.",
    number: "04",
    icon: Music2,
  },
  {
    name: "Workshop",
    description: "Inspiring spaces for art and creative projects.",
    number: "05",
    icon: Palette,
  },
];

const StudioCategories = () => {
  return (
    <section className="bg-slate-50 py-20 text-slate-900 transition-colors duration-300 dark:bg-[#080F2A] dark:text-white md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">

        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">

          <span className="inline-flex items-center gap-2 rounded-full border border-lime-500/30 bg-lime-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-lime-700 dark:text-lime-400">
            <span className="h-2 w-2 rounded-full bg-lime-500" />
            Explore Categories
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
            Find Your Perfect{" "}
            <span className="text-blue-800 dark:text-lime-400">
              Creative Space
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-gray-400 md:text-base">
            Discover thoughtfully designed spaces for every
            creative journey. Choose a category and bring
            your ideas to life.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={`/studios?category=${encodeURIComponent(category.name)}`}
                className="group flex min-h-[260px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-lime-400 hover:shadow-xl dark:border-white/10 dark:bg-[#111B3A] dark:hover:border-lime-400/60"
              >
                {/* Card Top */}
                <div className="flex items-center justify-between">

                  <span className="text-sm font-bold tracking-widest text-slate-400 dark:text-slate-500">
                    {category.number}
                  </span>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-800 transition-all duration-300 group-hover:bg-lime-400 group-hover:text-[#080F2A] dark:bg-blue-500/10 dark:text-lime-400 dark:group-hover:bg-lime-400">
                    <Icon size={23} strokeWidth={1.8} />
                  </div>

                </div>

                {/* Card Content */}
                <div className="mt-8">

                  <h3 className="text-lg font-bold transition-colors duration-300 group-hover:text-blue-800 dark:group-hover:text-lime-400">
                    {category.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-gray-400">
                    {category.description}
                  </p>

                </div>

                {/* Card Footer */}
                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5 dark:border-white/10">

                  <span className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-lime-400">
                    Explore Studios
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="text-blue-800 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 dark:text-lime-400"
                  />

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
