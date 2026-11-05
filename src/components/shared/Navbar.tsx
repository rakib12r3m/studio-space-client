"use client";

import Link from "next/link";
import { ArrowUpRight, Clapperboard, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import ProfileDropdown from "@/components/shared/ProfileDropdown";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
];

const sectionNavLinks = [
  { name: "How It Works", href: "/#howItWork" },
  { name: "About Us", href: "/#about" },
];

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  console.log(user, "from nav");

  return (
    <header className="sticky top-0 z-50 w-full overflow-hidden bg-gradient-to-br from-[#071B55] via-[#102D75] to-[#071B55] px-3 py-2 sm:px-5">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-20 -top-24 size-64 rounded-full bg-lime-400/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-blue-400/30 blur-[110px]" />

      <nav className="relative mx-auto flex max-w-6xl items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 shadow-2xl sm:px-4">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Clapperboard
            size={40}
            className="rounded-xl bg-[#102A72] p-2 text-[#CCFF00]"
          />

          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-blue-950 dark:text-white">
              Studio
              <span className="text-blue-600 dark:text-lime-400">Space</span>
            </span>

            <span className="text-[8px] font-semibold uppercase tracking-[2px] text-slate-500 dark:text-slate-400">
              Creative Hub
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="rounded-lg px-3 py-2 text-[13px] font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-blue-950 dark:hover:text-lime-400"
            >
              {link.name}
            </Link>
          ))}

          {sectionNavLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="rounded-lg px-3 py-2 text-[13px] font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-blue-950 dark:hover:text-lime-400"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        {/* <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          {user ? (
            <ProfileDropdown user={user} />
          ) : (
            <>
              <Button
                variant="ghost"
                className="h-9 rounded-lg px-3 text-sm font-semibold text-blue-800 hover:bg-blue-50 dark:text-lime-400 dark:hover:bg-blue-950"
              >
                <Link href="/login">Sign In</Link>
              </Button>

              <Button className="group h-9 rounded-lg bg-blue-800 px-4 text-sm font-bold text-white shadow-md shadow-blue-900/20 transition-all duration-300 hover:bg-blue-950">
                <Link href="/signup" className="flex items-center gap-1.5">
                  Get Started
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </Button>
            </>
          )}
        </div> */}
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />

          {isPending ? null : user ? (
            <ProfileDropdown user={user} />
          ) : (
            <>
              <Button
                variant="ghost"
                className="h-9 rounded-lg px-3 text-sm font-semibold text-blue-800 hover:bg-blue-50 dark:text-lime-400 dark:hover:bg-blue-950"
              >
                <Link href="/login">Sign In</Link>
              </Button>

              <Button className="group h-9 rounded-lg bg-blue-800 px-4 text-sm font-bold text-white shadow-md shadow-blue-900/20 transition-all duration-300 hover:bg-blue-950">
                <Link href="/signup" className="flex items-center gap-1.5">
                  Get Started
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger
              type="button"
              aria-label="Open navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-700 hover:bg-gray-100 dark:text-white dark:hover:bg-blue-950"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[280px] max-w-[85vw] overflow-y-auto border-[var(--border)] bg-[var(--card)] p-5 text-[var(--foreground)]"
            >
              {/* Mobile Logo */}
              <Link href="/" className="mb-4 flex items-center gap-2">
                <span className="text-lg font-black text-blue-950 dark:text-white">
                  Studio
                  <span className="text-blue-600 dark:text-lime-400">
                    Space
                  </span>
                </span>
              </Link>

              {/* Mobile Links */}
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-blue-950 dark:hover:text-lime-400"
                  >
                    {link.name}
                  </Link>
                ))}

                {sectionNavLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="rounded-lg px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-blue-950 dark:hover:text-lime-400"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="my-5 border-t border-[var(--border)]" />

              {/* Mobile Actions */}
              {/* <div className="flex flex-col gap-2">
                <ThemeToggle />
                {user ? (
                  <ProfileDropdown user={user} />
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="rounded-lg border-blue-200 text-blue-800 dark:border-blue-700 dark:text-lime-400"
                    >
                      <Link href="/login">Sign In</Link>
                    </Button>

                    <Button className="rounded-lg bg-blue-800 font-bold text-white hover:bg-blue-950">
                      <Link href="/register" className="flex items-center gap-2">
                        Get Started
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </Button>
                  </>
                )}
              </div> */}
              <div className="flex flex-col gap-2">
                <ThemeToggle />

                {isPending ? null : user ? (
                  <ProfileDropdown user={user} />
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="rounded-lg border-blue-200 text-blue-800 dark:border-blue-700 dark:text-lime-400"
                    >
                      <Link href="/login">Sign In</Link>
                    </Button>

                    <Button className="rounded-lg bg-blue-800 font-bold text-white hover:bg-blue-950">
                      <Link
                        href="/register"
                        className="flex items-center gap-2"
                      >
                        Get Started
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
