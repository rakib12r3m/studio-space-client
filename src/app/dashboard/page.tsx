
import Link from "next/link";
import {
  LayoutDashboard,
  Plus,
  Building2,
  CalendarDays,
  Compass,
} from "lucide-react";

const DashboardPage = () => {
  const links = [
    { title: "Explore Studios", href: "/studios", icon: Compass },
    { title: "Add New Studio", href: "/add-studio", icon: Plus },
    { title: "My Listings", href: "/my-listings", icon: Building2 },
    { title: "My Bookings", href: "/my-bookings", icon: CalendarDays },
  ];

  return (
    <main className="min-h-screen bg-[#080F2A] px-4 py-16 text-white">
      <div className="mx-auto max-w-5xl">

        <div className="mb-10">
          <p className="text-sm text-lime-400">StudioSpace Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold">
            Welcome to Your Dashboard!
          </h1>
          <p className="mt-2 text-gray-400">
            Manage your creative spaces and bookings easily.
          </p>
        </div>

        <div className="mb-8 rounded-2xl bg-gradient-to-r from-[#172C69] to-[#101B42] p-8">
          <LayoutDashboard size={35} className="text-lime-400" />
          <h2 className="mt-4 text-2xl font-bold">
            Your Creative Space, Your Control.
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Everything you need to manage your StudioSpace account.
          </p>
        </div>

        <h2 className="mb-5 text-xl font-bold">Quick Access</h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#111B3A] p-6 transition hover:border-lime-400 hover:bg-[#17244A]"
              >
                <Icon size={28} className="text-lime-400" />
                <span className="font-semibold">{item.title}</span>
              </Link>
            );
          })}
        </div>

      </div>
    </main>
  );
};

export default DashboardPage;
