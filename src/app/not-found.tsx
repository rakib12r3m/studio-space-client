"use client";

import Link from "next/link";
import { Clapperboard, Home, ArrowRight, Search } from "lucide-react";

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080F2A] px-4 py-16 text-white">

      {/* Background Effects */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-lime-400/10 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">

        {/* Logo */}
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#CCFF00] text-[#080F2A]">
            <Clapperboard size={27} />
          </div>

          <span className="text-2xl font-black tracking-tight">
            Studio<span className="text-[#CCFF00]">Space</span>
          </span>
        </Link>

        {/* 404 */}
        <div className="relative mb-6">
          <h1 className="select-none text-[130px] font-black leading-none tracking-tighter text-white sm:text-[190px]">
            4<span className="text-[#CCFF00]">0</span>4
          </h1>

          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-48 w-48 rounded-full bg-blue-600/20 blur-[70px]" />
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-lg">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#CCFF00]/20 bg-[#CCFF00]/10 px-4 py-2 text-xs font-semibold tracking-widest text-[#CCFF00]">
            <span className="h-2 w-2 rounded-full bg-[#CCFF00]" />
            ERROR 404
          </div>

          <h2 className="text-2xl font-bold sm:text-4xl">
            Oops! Page Not Found
          </h2>

          <p className="mt-4 text-sm leading-7 text-blue-100/60 sm:text-base">
            The creative space you&apos;re looking for may have moved,
            been removed, or doesn&apos;t exist anymore.
            Don&apos;t worry, let&apos;s get you back on track!
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">

          <Link
            href="/"
            className="group flex items-center justify-center gap-2 rounded-xl bg-[#CCFF00] px-7 py-3.5 text-sm font-bold text-[#080F2A] shadow-lg shadow-lime-400/10 transition duration-300 hover:-translate-y-1 hover:bg-[#DFFF55]"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <Link
            href="/studios"
            className="group flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:border-[#CCFF00]/50 hover:bg-white/10"
          >
            <Search size={18} />
            Explore Studios
            <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </Link>

        </div>

        {/* Footer */}
        <div className="mt-16 border-t border-white/10 pt-6">
          <p className="text-xs text-blue-100/40">
            © {new Date().getFullYear()} StudioSpace. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-blue-100/30">
            Find your space. Create something amazing.
          </p>
        </div>

      </div>
    </main>
  );
};

export default NotFound;