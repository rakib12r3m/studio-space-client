
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

export default function AddStudioPage() {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleAmenity = (item: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(item)
        ? prev.filter((a) => a !== item)
        : [...prev, item]
    );
  };

  return (
    <div className="min-h-screen bg-[#071936] px-4 py-12 text-white md:px-8">
      <div className="mx-auto max-w-4xl">

        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-lime-400">
            STUDIO MANAGEMENT
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">
            Add New Studio<span className="text-lime-400">.</span>
          </h1>
          <p className="mt-2 text-gray-400">
            Share your creative space with creators around the world.
          </p>
        </div>

        <form className="space-y-8 rounded-2xl border border-white/10 bg-[#0D2450] p-5 md:p-8">

          <div className="space-y-5">
            <h2 className="text-xl font-semibold">Basic Information</h2>

            <div className="space-y-2">
              <Label>Studio Title</Label>
              <Input placeholder="Enter studio name" className="border-white/10 bg-[#081936]" />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Studio Category</Label>
                <Select>
                  <SelectTrigger className="border-white/10 bg-[#081936]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Photo Studio", "Film Stage", "Podcast Lounge", "Music Suite", "Workshop"].map((item) => (
                      <SelectItem key={item} value={item}>{item}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input placeholder="City, Country" className="border-white/10 bg-[#081936]" />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-xl font-semibold">Pricing & Capacity</h2>

            <div className="grid gap-5 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Hourly Rate ($)</Label>
                <Input type="number" placeholder="50" className="border-white/10 bg-[#081936]" />
              </div>
              <div className="space-y-2">
                <Label>Security Deposit ($)</Label>
                <Input type="number" placeholder="100" className="border-white/10 bg-[#081936]" />
              </div>
              <div className="space-y-2">
                <Label>Max Capacity</Label>
                <Input type="number" placeholder="10 people" className="border-white/10 bg-[#081936]" />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-xl font-semibold">Studio Image</h2>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <div className="flex gap-2">
                <Input placeholder="Paste your studio image URL" className="border-white/10 bg-[#081936]" />
                <Button type="button" className="shrink-0 border-lime-400 text-lime-400 cursor-pointer">
                  <ImagePlus size={18} className="bg-blue"/>
                </Button>
              </div>
              <p className="text-xs text-gray-400">Upload your image to ImgBB and paste the URL here.</p>
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-xl font-semibold">Studio Amenities</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {amenities.map((item) => (
                <label key={item} className="flex cursor-pointer items-center gap-2 text-sm text-gray-300">
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
              className="min-h-36 border-white/10 bg-[#081936]"
            />
          </div>

          <div className="space-y-5">
            <h2 className="text-xl font-semibold">Host Information</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Host Name</Label>
                <Input value="Loading profile..." readOnly className="border-white/10 bg-[#081936]" />
              </div>
              <div className="space-y-2">
                <Label>Host Email</Label>
                <Input value="Loading profile..." readOnly className="border-white/10 bg-[#081936]" />
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Host information is automatically provided by your account.
            </p>
          </div>

          <div className="flex flex-col justify-end gap-3 border-t border-white/10 pt-6 sm:flex-row">
            <Button type="reset" variant="outline" className="border-white/20 text-white">
              Cancel
            </Button>
            <Button type="submit" className="bg-lime-400 font-bold text-[#071936] hover:bg-lime-300">
              <Plus size={18} className="mr-2" />
              Publish Studio
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}
