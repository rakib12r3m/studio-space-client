"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Plus, Trash2, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StudioListingCard, {
  StudioType,
} from "@/components/my-listings/studio-listing-card";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function MyListingsPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [studios, setStudios] = useState<StudioType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudio, setSelectedStudio] = useState<StudioType | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.push("/login");
      return;
    }

    const fetchListings = async () => {
      try {
        const res = await fetch(
          `${API_URL}/my-listings/${encodeURIComponent(session.user.email)}`,
        );

        if (!res.ok) throw new Error();

        const data = await res.json();
        setStudios(data);
      } catch {
        toast.error("Failed to load your studios");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [session, isPending, router]);

  const handleDelete = async () => {
    if (!selectedStudio || !session?.user) return;

    try {
      setDeleting(true);

      const res = await fetch(
        `${API_URL}/studios/${selectedStudio._id}?email=${encodeURIComponent(session.user.email)}`,
        { method: "DELETE" },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Delete failed");
        return;
      }

      setStudios((prev) =>
        prev.filter((studio) => studio._id !== selectedStudio._id),
      );

      setSelectedStudio(null);
      toast.success("Studio deleted successfully!");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeleting(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-green-600 dark:bg-[#071936] dark:text-lime-400">
        Loading your studios...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-[#14275D] dark:bg-[#071936] dark:text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold text-green-600 dark:text-lime-400">
              STUDIO MANAGEMENT
            </p>

            <h1 className="text-3xl font-bold md:text-4xl">
              My Studio Listings<span className="text-green-600 dark:text-lime-400">.</span>
            </h1>

            <p className="mt-2 text-slate-600 dark:text-gray-400">
              Manage and organize your creative spaces.
            </p>
          </div>

          {/* <Button
            asChild
            className="bg-lime-400 font-bold text-[#071936] hover:bg-lime-300"
          >
            <Link href="/add-studio">
              <Plus size={18} />
              Add New Studio
            </Link>
          </Button> */}
          <Link
  href="/add-studio"
  className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700 dark:bg-lime-400 dark:text-[#071936] dark:hover:bg-lime-300 "
>
  <Plus size={18} />
  Add New Studio
</Link>
        </div>

        <div className="mb-8 rounded-xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#0D2450]">
          <p className="text-sm text-slate-600 dark:text-gray-400">Total Studios</p>
          <h2 className="mt-2 text-3xl font-bold text-green-600 dark:text-lime-400">
            {studios.length}
          </h2>
        </div>

        {studios.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 py-20 text-center dark:border-white/20">
            <h2 className="text-2xl font-bold">No Studios Found!</h2>

            <p className="mt-3 text-slate-600 dark:text-gray-400">
              You haven&apos;t listed any studios yet.
            </p>

            {/* <Button asChild className="mt-6 bg-lime-400 text-[#071936]">
              <Link href="/add-studio">
                <Plus size={18} />
                Add Your First Studio
              </Link>
            </Button> */}
           <Link href="/add-studio">
  <Button className="mt-6 bg-green-600 text-white hover:bg-green-700 dark:bg-lime-400 dark:text-[#071936] dark:hover:bg-lime-300 dark:hover:text-[#071936]">
    <Plus size={18} />
    Add Your First Studio
  </Button>
</Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <StudioListingCard
                key={studio._id}
                studio={studio}
                onDelete={setSelectedStudio}
              />
            ))}
          </div>
        )}
      </div>

      {selectedStudio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-[#14275D] dark:border-white/10 dark:bg-[#0D2450] dark:text-white">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Delete Studio?</h2>

              <button
                onClick={() => setSelectedStudio(null)}
                disabled={deleting}
              >
                <X />
              </button>
            </div>

            <p className="text-slate-600 dark:text-gray-400">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#14275D] dark:text-white">
                {selectedStudio.title}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <Button
                variant="outline"
                disabled={deleting}
                onClick={() => setSelectedStudio(null)}
              >
                Cancel
              </Button>

              <Button
                variant="destructive"
                disabled={deleting}
                onClick={handleDelete}
              >
                <Trash2 size={16} />
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}