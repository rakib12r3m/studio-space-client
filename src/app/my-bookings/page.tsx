
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import BookingList from "@/components/my-bookings/BookingList";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/login");

  const res = await fetch(
    `http://localhost:8000/my-bookings/${encodeURIComponent(session.user.email)}`,
    { cache: "no-store" }
  );

  const bookings = res.ok ? await res.json() : [];

  return (
    <section className="min-h-screen bg-[#080D20] px-4 py-16">
      <div className="mx-auto max-w-6xl">

        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-lime-400">
            Your Reservations
          </p>

          <h1 className="text-3xl font-bold text-white md:text-4xl">
            My Bookings
          </h1>

          <p className="mt-3 text-gray-400">
            Manage your creative space reservations in one place.
          </p>
        </div>

        <BookingList bookings={bookings} />

      </div>
    </section>
  );
};

export default MyBookingPage;
