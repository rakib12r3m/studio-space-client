import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import BookingList from "@/components/my-bookings/BookingList";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/login");

  const res = await fetch(
    `${API_URL}/my-bookings/${encodeURIComponent(session.user.email)}`,
    { cache: "no-store" }
  );

  const bookings = res.ok ? await res.json() : [];

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-16 dark:bg-[#080D20]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-green-600 dark:text-lime-400">
            Your Reservations
          </p>

          <h1 className="text-3xl font-bold text-[#14275D] dark:text-white md:text-4xl">
            My Bookings
          </h1>

          <p className="mt-3 text-slate-600 dark:text-gray-400">
            Manage your creative space reservations in one place.
          </p>
        </div>

        <BookingList
          bookings={bookings}
          email={session.user.email}
        />
      </div>
    </section>
  );
};

export default MyBookingPage;