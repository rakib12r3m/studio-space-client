import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  CalendarCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Spaces for Every Creator",
    description:
      "Find the perfect photography, podcast, or production space for your vision.",
  },
  {
    icon: CalendarCheck,
    title: "Booking Made Simple",
    description:
      "Compare prices, check availability, and reserve your ideal workspace.",
  },
  {
    icon: ShieldCheck,
    title: "A Community You Can Trust",
    description:
      "Connect with studio owners through transparent listings and reliable bookings.",
  },
];

const AboutSection = () => {
  return (
    <section
      id="about"
      className="scroll-mt-18 bg-[#F5F7FF] py-7 transition-colors dark:bg-[var(--background)] md:py-9"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Page Heading */}
        <div className="mb-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[3px] text-[#3158C9] dark:text-lime-400">
            Get to Know Us
          </span>

          <h2 className="mt-2 text-3xl font-extrabold text-[#14275D] dark:text-white sm:text-4xl">
            About <span className="text-[#3158C9] dark:text-lime-400">Us</span>
          </h2>

          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#C8FF36]" />

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 dark:text-slate-400">
            Discover the story behind StudioSpace and how we bring
            creative minds and inspiring spaces together.
          </p>
        </div>

        {/* Main About Content */}
        <div className="grid items-center gap-7 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#E8EDFF] px-3.5 py-1.5 text-xs font-semibold text-[#2446A5] dark:bg-[#172443] dark:text-lime-400">
              <Sparkles size={15} />
              Our Story
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#14275D] dark:text-white sm:text-4xl md:text-[40px]">
              Great Ideas
              <br />
              Deserve
              <span className="relative ml-2 inline-block text-[#3158C9] dark:text-lime-400">
                Great Spaces.
                <span className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-[#C8FF36]" />
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-gray-600 dark:text-slate-300">
              Every creative project needs the right environment.
              StudioSpace makes it easier for photographers,
              filmmakers, musicians, and podcasters to discover
              inspiring workspaces.
            </p>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600 dark:text-slate-300">
              We bring studio owners and creative minds together
              through one simple platform where discovering,
              sharing, and booking creative spaces feels effortless.
            </p>

            <Link
              href="/studios"
              className="mt-5 inline-flex items-center gap-2.5 rounded-xl bg-[#2446A5] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-900/10 transition hover:bg-[#183784] dark:bg-lime-400 dark:text-[#071B55] dark:hover:bg-lime-300"
            >
              Explore Our Studios
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative pb-7 pr-3">
            <div className="relative h-[230px] overflow-hidden rounded-2xl sm:h-[270px] lg:h-[290px]">
              <Image
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72"
                alt="Modern creative workspace"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#101B48]/70 to-transparent" />

              <div className="absolute bottom-5 left-5">
                <p className="text-xs font-medium tracking-wider text-[#C8FF36]">
                  YOUR SPACE. YOUR VISION.
                </p>

                <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                  Make Something Amazing.
                </h3>
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-1 right-0 rounded-xl border border-gray-100 bg-white p-3 shadow-lg transition-colors dark:border-[var(--border)] dark:bg-[var(--card)]">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-lg bg-[#C8FF36] text-[#14275D]">
                  <Sparkles size={19} />
                </div>

                <div>
                  <p className="text-sm font-bold text-[#14275D] dark:text-white">
                    Create Without Limits
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-slate-400">
                    Find your creative space
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="rounded-xl border border-[#E7EBF5] bg-white p-4 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/5 dark:border-[var(--border)] dark:bg-[var(--card)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex size-10 items-center justify-center rounded-lg bg-[#EAF0FF] text-[#2446A5] dark:bg-[#172443] dark:text-lime-400">
                  <feature.icon size={21} />
                </div>

                <span className="text-xs font-bold text-[#C1C9D9] dark:text-slate-500">
                  0{index + 1}
                </span>
              </div>

              <h3 className="mt-3 text-base font-bold text-[#14275D] dark:text-white">
                {feature.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-gray-500 dark:text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;