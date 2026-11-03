
import Link from "next/link";
import { Clapperboard, Send } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#howItWork" },
  { name: "About Us", href: "/#about" },
];

const categories = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
];

const socialLinks = [
  {
    icon: FaFacebookF,
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    icon: FaLinkedinIn,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: FaYoutube,
    href: "https://youtube.com",
    label: "YouTube",
  },
  {
    icon: FaXTwitter,
    href: "https://x.com",
    label: "X",
  },
];

const Footer = () => {
  return (
    <footer className="relative mt-5 overflow-hidden bg-[#071B49] text-white">

      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-blue-600/20 blur-[100px]" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-lime-400/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-6 lg:px-8 lg:pt-16">

        {/* Main Footer */}
        <div className="grid gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:pb-12">

          {/* Brand Section */}
          <div className="space-y-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-md shadow-black/10 transition-transform hover:scale-[1.02]"
            >
              <Clapperboard
                size={40}
                className="rounded-xl bg-[#102A72] p-2 text-[#CCFF00]"
              />

              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-blue-950">
                  Studio<span className="text-blue-600">Space</span>
                </span>

                <span className="text-[8px] font-semibold uppercase tracking-[2px] text-slate-500">
                  Creative Hub
                </span>
              </div>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-blue-100/70">
              Your creative journey starts here. Discover inspiring studios,
              connect with creators, and turn your creative ideas into reality.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-blue-100 transition-all duration-300 hover:border-[#CCFF00] hover:bg-[#CCFF00] hover:text-[#102A72]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-blue-100/70 transition-colors duration-300 hover:pl-1 hover:text-[#CCFF00]"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">
              Popular Categories
            </h3>

            <ul className="space-y-4">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/studios?category=${encodeURIComponent(category)}`}
                    className="text-sm text-blue-100/70 transition-colors duration-300 hover:pl-1 hover:text-[#CCFF00]"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">
              Stay In The Loop
            </h3>

            <p className="mb-5 text-sm leading-6 text-blue-100/70">
              Subscribe to get creative inspiration, studio updates, and
              exclusive offers.
            </p>

            <div className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 p-1.5 focus-within:border-[#CCFF00]/50">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-blue-100/40"
              />

              <button
                type="button"
                aria-label="Subscribe"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#CCFF00] text-[#102A72] transition-colors hover:bg-lime-300"
              >
                <Send size={17} />
              </button>
            </div>

            <p className="mt-3 text-xs leading-5 text-blue-100/40">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-5 pt-8 text-center sm:flex-row sm:text-left">

          <p className="text-sm text-blue-100/50">
            © {new Date().getFullYear()} StudioSpace. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-blue-100/60 sm:gap-6">
            <Link
              href="/terms"
              className="transition-colors hover:text-[#CCFF00]"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/privacy"
              className="transition-colors hover:text-[#CCFF00]"
            >
              Privacy Policy
            </Link>
          </div>

          <p className="text-xs text-blue-100/40">
            Made for creators, with creativity.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
