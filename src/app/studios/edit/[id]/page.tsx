"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const amenities = [
  "WiFi",
  "Air Conditioning",
  "Professional Lighting",
  "Soundproof",
  "Parking",
  "Generator",
  "Editing Equipment",
  "Waiting Area",
];

const initialForm = {
  title: "",
  category: "",
  location: "",
  hourlyRate: "",
  securityDeposit: "",
  maxCapacity: "",
  imageUrl: "",
  overview: "",
};

export default function EditStudioPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [form, setForm] = useState(initialForm);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.push("/login");
      return;
    }

    const fetchStudio = async () => {
      try {
        const res = await fetch(`${API_URL}/studios/${id}`);

      

        if (!res.ok) throw new Error();

        const data = await res.json();

        if (data.ownerEmail !== session.user.email) {
          toast.error("You cannot edit this studio");
          router.push("/my-listings");
          return;
        }

        setForm({
          title: data.title || "",
          category: data.category || "",
          location: data.location || "",
          hourlyRate: String(data.hourlyRate ?? ""),
          securityDeposit: String(data.securityDeposit ?? ""),
          maxCapacity: String(data.maxCapacity ?? ""),
          imageUrl: data.imageUrl || "",
          overview: data.overview || "",
        });

        setSelectedAmenities(data.amenities || []);
      } catch {
        toast.error("Failed to load studio");
        router.push("/my-listings");
      } finally {
        setLoading(false);
      }
    };

    fetchStudio();
  }, [id, session, isPending, router]);

  const update = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleAmenity = (item: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item],
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!session?.user) return;

    try {
      setSaving(true);

      const res = await fetch(
        `${API_URL}/studios/${id}?email=${encodeURIComponent(session.user.email)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            amenities: selectedAmenities,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Update failed");
        return;
      }

      toast.success("Studio updated successfully!");
      router.push("/my-listings");
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setSaving(false);
    }
  };

  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#071936] text-lime-400">
        Loading studio...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#071936] px-4 py-12 text-white md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-lime-400">
            STUDIO MANAGEMENT
          </p>

          <h1 className="text-3xl font-bold md:text-4xl">
            Update Studio<span className="text-lime-400">.</span>
          </h1>

          <p className="mt-2 text-gray-400">Update your studio information.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-7 rounded-2xl border border-white/10 bg-[#0D2450] p-5 md:p-8"
        >
          <div className="space-y-2">
            <Label>Studio Title</Label>
            <Input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              required
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Category</Label>

              <Select
                value={form.category}
                onValueChange={(value) => update("category", value ?? "")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {[
                    "Photo Studio",
                    "Film Stage",
                    "Podcast Lounge",
                    "Music Suite",
                    "Workshop",
                  ].map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Hourly Rate ($)</Label>
              <Input
                type="number"
                min="1"
                value={form.hourlyRate}
                onChange={(e) => update("hourlyRate", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Security Deposit ($)</Label>
              <Input
                type="number"
                min="0"
                value={form.securityDeposit}
                onChange={(e) => update("securityDeposit", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Max Capacity</Label>
              <Input
                type="number"
                min="1"
                value={form.maxCapacity}
                onChange={(e) => update("maxCapacity", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Studio Image URL</Label>
            <Input
              type="url"
              value={form.imageUrl}
              onChange={(e) => update("imageUrl", e.target.value)}
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Studio Amenities</Label>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {amenities.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <Checkbox
                    checked={selectedAmenities.includes(item)}
                    onCheckedChange={() => toggleAmenity(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Studio Overview</Label>
            <Textarea
              value={form.overview}
              onChange={(e) => update("overview", e.target.value)}
              required
              className="min-h-36"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-white/10 pt-6">
            <Button type="button" onClick={() => router.push("/my-listings")}>
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={saving}
              className="bg-lime-400 font-bold text-[#071936] hover:bg-lime-300"
            >
              {saving ? "Updating..." : "Update Studio"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
