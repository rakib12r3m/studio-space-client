"use client";

import { useState } from "react";
import { Plus, ImagePlus, X } from "lucide-react";
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
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

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
  rating: "0",
};

export default function AddStudioPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [form, setForm] = useState(initialForm);

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const toggleAmenity = (item: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item],
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.category) {
      toast.error("Please select a studio category");
      return;
    }

    if (!session?.user) {
      toast.error("Please login first");
      return;
    }

    const studioData = {
      ...form,
      amenities: selectedAmenities,
      ownerName: session.user.name || "",
      ownerEmail: session.user.email || "",
    };

    try {
     const token = await getTokenFromClient()
      
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-studio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(studioData),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Failed to add studio");
        return;
      }

      toast.success("Studio added successfully!");

      setForm(initialForm);
      setSelectedAmenities([]);

      router.push("/my-listings");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 text-[#14275D] dark:bg-[#071936] dark:text-white md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-green-600 dark:text-lime-400">
            STUDIO MANAGEMENT
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">
            Add New Studio
            <span className="text-green-600 dark:text-lime-400">.</span>
          </h1>
          <p className="mt-2 text-slate-600 dark:text-gray-400">
            Share your creative space with creators around the world.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0D2450] md:p-8"
        >
          <div className="space-y-5">
            <h2 className="text-xl font-semibold">Basic Information</h2>

            <div className="space-y-2">
              <Label>Studio Title</Label>
              <Input
                placeholder="Enter studio name"
                value={form.title}
                onChange={(event) => update("title", event.target.value)}
                required
                className="border-slate-300 bg-white text-[#14275D] placeholder:text-slate-400 dark:border-white/10 dark:bg-[#081936] dark:text-white"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Studio Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => update("category", value ?? "")}
                >
                  <SelectTrigger className="border-slate-300 bg-white dark:border-white/10 dark:bg-[#081936]">
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
                  placeholder="City, Country"
                  value={form.location}
                  onChange={(event) => update("location", event.target.value)}
                  required
                  className="border-slate-300 bg-white text-[#14275D] placeholder:text-slate-400 dark:border-white/10 dark:bg-[#081936] dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-xl font-semibold">Pricing & Capacity</h2>

            <div className="grid gap-5 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Hourly Rate ($)</Label>
                <Input
                  type="number"
                  placeholder="50"
                  value={form.hourlyRate}
                  onChange={(event) => update("hourlyRate", event.target.value)}
                  required
                  min="1"
                  className="border-slate-300 bg-white text-[#14275D] placeholder:text-slate-400 dark:border-white/10 dark:bg-[#081936] dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label>Security Deposit ($)</Label>
                <Input
                  type="number"
                  placeholder="100"
                  value={form.securityDeposit}
                  onChange={(event) =>
                    update("securityDeposit", event.target.value)
                  }
                  required
                  min="0"
                  className="border-slate-300 bg-white text-[#14275D] placeholder:text-slate-400 dark:border-white/10 dark:bg-[#081936] dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label>Max Capacity</Label>
                <Input
                  type="number"
                  placeholder="10"
                  value={form.maxCapacity}
                  onChange={(event) =>
                    update("maxCapacity", event.target.value)
                  }
                  required
                  min="1"
                  className="border-slate-300 bg-white text-[#14275D] placeholder:text-slate-400 dark:border-white/10 dark:bg-[#081936] dark:text-white"
                />
              </div>
              {/* ---- */}
              <div className="space-y-2">
                <Label>Studio Rating (Out of 5)</Label>

                <Input
                  type="number"
                  placeholder="4.5"
                  value={form.rating}
                  onChange={(event) => update("rating", event.target.value)}
                  min="0"
                  max="5"
                  step="0.1"
                  required
                  className="border-slate-300 bg-white text-[#14275D] placeholder:text-slate-400 dark:border-white/10 dark:bg-[#081936] dark:text-white"
                />

                <p className="text-xs text-slate-500 dark:text-gray-400">
                  Enter a rating between 0 and 5.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-xl font-semibold">Studio Image</h2>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <div className="flex gap-2">
                <Input
                  type="url"
                  placeholder="Paste your studio image URL"
                  value={form.imageUrl}
                  onChange={(event) => update("imageUrl", event.target.value)}
                  required
                  className="border-slate-300 bg-white text-[#14275D] placeholder:text-slate-400 dark:border-white/10 dark:bg-[#081936] dark:text-white"
                />
                <Button
                  type="button"
                  className="shrink-0 cursor-pointer border border-green-600 bg-green-50 text-green-700 hover:bg-green-100 dark:border-lime-400 dark:bg-lime-400/10 dark:text-lime-400 dark:hover:bg-lime-400/20"
                >
                  <ImagePlus size={18} />
                </Button>
              </div>
              <p className="text-xs text-slate-500 dark:text-gray-400">
                Upload your image to ImgBB and paste the URL here.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-xl font-semibold">Studio Amenities</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {amenities.map((item) => (
                <label
                  key={item}
                  className="flex cursor-pointer items-center gap-2 text-sm text-slate-700 dark:text-gray-300"
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
            <h2 className="text-xl font-semibold">Studio Overview</h2>
            <Textarea
              placeholder="Describe your studio, equipment, facilities and creative environment..."
              value={form.overview}
              onChange={(event) => update("overview", event.target.value)}
              required
              className="min-h-36 border-slate-300 bg-white text-[#14275D] placeholder:text-slate-400 dark:border-white/10 dark:bg-[#081936] dark:text-white"
            />
          </div>

          <div className="space-y-5">
            <h2 className="text-xl font-semibold">Host Information</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Host Name</Label>
                <Input value={session?.user?.name || ""} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Host Email</Label>

                <Input value={session?.user?.email || ""} readOnly />
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-gray-400">
              Host information is automatically provided by your account.
            </p>
          </div>

          <div className="flex flex-col justify-end gap-3 border-t border-slate-200 pt-6 dark:border-white/10 sm:flex-row">
            <Button type="button" onClick={() => router.push("/")}>
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? "Adding Studio..." : "Add Studio"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
