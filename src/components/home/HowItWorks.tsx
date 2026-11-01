
import Link from "next/link";
import {
  Search,
  CalendarDays,
  CreditCard,
  Clapperboard,
  ArrowUpRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Find Your Space",
    description:
      "Discover inspiring studios that match your creative vision and project requirements.",
    icon: Search,
  },
  {
    number: "02",
    title: "Pick Your Schedule",
    description:
      "Explore available time slots and choose the perfect hours for your production.",
    icon: CalendarDays,
  },
  {
    number: "03",
    title: "Book With Confidence",
    description:
      "Enjoy transparent pricing and secure your creative space in just a few clicks.",
    icon: CreditCard,
  },
  {
    number: "04",
    title: "Bring Ideas to Life",
    description:
      "Enter your studio, get creative, and transform your vision into something extraordinary.",
    icon: Clapperboard,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="howItWork"
      className="bg-white scroll-mt-10 px-4 py-8 sm:px-6 lg:px-8 lg:py-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-5 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-lime-500/30 bg-lime-50 px-3 py-1 text-[9px] font-bold uppercase tracking-[2px] text-[#729A00]">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />
            The Studio Experience
            <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />
          </span>

          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-[#071B55] sm:text-4xl">
            <span className="block text-[#8BB800]">
              How StudioSpace Works
            </span>
          </h2>

          <p className="mt-2 max-w-lg text-xs leading-5 text-slate-500 sm:text-sm">
            Discover inspiring studios, book your time, and bring your
            creative vision to life.
          </p>
        </div>

        {/* Main Card */}
        <div className="grid overflow-hidden rounded-[26px] bg-[#071B55] lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left Content */}
          <div className="relative flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#071B55] to-[#12347C] p-5 sm:p-6 lg:p-7">
            <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-lime-400/10 blur-[80px]" />

            <div className="relative">
              <span className="inline-flex rounded-full border border-lime-400/30 bg-lime-400/10 px-3 py-1.5 text-[11px] font-bold tracking-widest text-lime-300">
                HOW IT WORKS
              </span>

              <h3 className="mt-4 text-3xl font-black leading-[1.15] text-white sm:text-4xl lg:text-[42px]">
                Your Space.
                <br />
                Your Vision.
                <br />
                <span className="text-lime-400">Your Creation.</span>
              </h3>

              <p className="mt-3 max-w-sm text-sm leading-6 text-blue-100/70">
                Everything you need to create something amazing, all in
                one place. Discover, book, and experience creativity
                without limits.
              </p>

              <Link
                href="/studios"
                className="group mt-4 inline-flex items-center gap-2 rounded-xl bg-lime-400 px-5 py-2.5 text-sm font-extrabold text-[#071B55] transition-all hover:bg-lime-300"
              >
                Explore Studios
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

              <p className="mt-3 text-[10px] font-semibold tracking-widest text-blue-200/40">
                DISCOVER YOUR CREATIVE POTENTIAL
              </p>
            </div>
          </div>

          {/* Right Steps */}
          <div className="bg-gradient-to-br from-[#102D75] to-[#080F2A] p-4 sm:p-5 lg:p-6">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-[2px] text-white">
                The Process
              </h4>

              <span className="text-[10px] font-bold tracking-widest text-lime-400">
                4 EASY STEPS
              </span>
            </div>

            <div>
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="group flex gap-4 rounded-xl border border-transparent px-3 py-1.5 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.05]"
                  >
                    {/* Icon */}
                    <div className="flex shrink-0 flex-col items-center">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-400/10 text-lime-400 transition-all group-hover:bg-lime-400 group-hover:text-[#071B55]">
                        <Icon size={18} />
                      </div>

                      {index !== 3 && (
                        <div className="mt-1 h-3 w-px bg-white/15" />
                      )}
                    </div>

                    {/* Text */}
                    <div className="min-w-0 flex-1 pb-0.5">
                      <div className="mb-0.5 flex items-center gap-2">
                        <span className="text-[10px] font-bold tracking-widest text-lime-400">
                          {step.number}
                        </span>

                        <span className="h-px w-5 bg-white/20" />
                      </div>

                      <h5 className="text-base font-bold text-white transition-colors group-hover:text-lime-400 sm:text-lg">
                        {step.title}
                      </h5>

                      <p className="mt-0.5 text-xs leading-5 text-blue-100/60">
                        {step.description}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={16}
                      className="mt-1 shrink-0 text-white/20 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lime-400"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
