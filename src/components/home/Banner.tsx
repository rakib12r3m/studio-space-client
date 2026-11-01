
"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { slides } from "@/lib/data/bannerData";

// const slides = [
//   {
//     title: "Find Your Perfect Creative Space",
//     highlight: "Create Without Limits.",
//     description:
//       "Discover inspiring photography studios, recording rooms, and creative spaces designed to bring your ideas to life.",
//     image:
//       "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
//   },
//   {
//     title: "Turn Your Vision Into Reality",
//     highlight: "Make Something Amazing.",
//     description:
//       "From professional photography setups to cinematic production spaces, find everything you need to create.",
//     image:
//       "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb",
//   },
//   {
//     title: "Share Your Space With Creators",
//     highlight: "Earn From Your Studio.",
//     description:
//       "List your creative workspace, connect with talented creators, and turn your unused space into an opportunity.",
//     image:
//       "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
//   },
// ];

export default function Banner() {
  return (
    <section className="mx-auto max-w-7xl px-3 pt-5 sm:px-5 lg:pt-8">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="overflow-hidden rounded-2xl shadow-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
  className="relative flex h-[430px] items-center bg-cover bg-center px-6 py-16 sm:h-[480px] sm:px-12 lg:h-[540px] lg:px-20"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              {/* Background Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#071B55]/95 via-[#102D75]/75 to-black/20" />

              {/* Content */}
              <div className="relative z-10 max-w-2xl text-white">
                <span className="mb-5 inline-block rounded-full border border-lime-400/40 bg-lime-400/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-lime-300">
                  Welcome to StudioSpace
                </span>

                <h1 className="text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">
                  {slide.title}
                  <span className="mt-2 block text-lime-400">
                    {slide.highlight}
                  </span>
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
                  {slide.description}
                </p>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/studios"
                    className="inline-flex items-center justify-center rounded-xl bg-lime-400 px-6 py-3 text-sm font-bold text-blue-950 shadow-lg transition hover:bg-lime-300"
                  >
                    Explore Studios →
                  </Link>

                  <Link
                    href="/studios"
                    className="inline-flex items-center justify-center rounded-xl border border-white/50 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-blue-950"
                  >
                    Host Your Space →
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
