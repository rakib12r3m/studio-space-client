
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



export default function AddStudioPage() {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
const [form, setForm] = useState(initialForm);

const update = (field: keyof typeof form, value: string) =>
  setForm((current) => ({ ...current, [field]: value }));


  const toggleAmenity = (item: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(item)
        ? prev.filter((a) => a !== item)
        : [...prev, item]
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  
  if (!form.category) {
  alert("Please select a studio category");
  return;
}
  const res = await fetch("http://localhost:8000/add-studio",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify(form)
  })

  const data = await res.json()
  console.log(data, 'from ,,,');
  






  // const studioData = {
  //   title: form.title,
  //   category: form.category,
  //   location: form.location,
  //   hourlyRate: Number(form.hourlyRate),
  //   securityDeposit: Number(form.securityDeposit),
  //   maxCapacity: Number(form.maxCapacity),
  //   imageUrl: form.imageUrl,
  //   amenities: selectedAmenities,
  //   overview: form.overview,
  // };

  // console.log(studioData);
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

        <form 
      onSubmit={handleSubmit}
        className="space-y-8 rounded-2xl border border-white/10 bg-[#0D2450] p-5 md:p-8">

          <div className="space-y-5">
            <h2 className="text-xl font-semibold">Basic Information</h2>

            <div className="space-y-2">
              <Label>Studio Title</Label>
             <Input
  placeholder="Enter studio name"
  value={form.title}
  onChange={(event) => update("title", event.target.value)}
  required
  className="border-white/10 bg-[#081936]"
/>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Studio Category</Label>
                <Select
  value={form.category}
  onValueChange={(value) => update("category", value ?? "")}
>
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
                <Input
  placeholder="City, Country"
  value={form.location}
  onChange={(event) => update("location", event.target.value)}
  required
  className="border-white/10 bg-[#081936]"
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
  className="border-white/10 bg-[#081936]"
/>
              </div>
              <div className="space-y-2">
                <Label>Security Deposit ($)</Label>
                <Input
  type="number"
  placeholder="100"
  value={form.securityDeposit}
  onChange={(event) => update("securityDeposit", event.target.value)}
  required
  min="0"
  className="border-white/10 bg-[#081936]"
/>
              </div>
              <div className="space-y-2">
                <Label>Max Capacity</Label>
                <Input
  type="number"
  placeholder="10"
  value={form.maxCapacity}
  onChange={(event) => update("maxCapacity", event.target.value)}
  required
  min="1"
  className="border-white/10 bg-[#081936]"
/>
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
  className="border-white/10 bg-[#081936]"
/>
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
  value={form.overview}
  onChange={(event) => update("overview", event.target.value)}
  required
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
            <Button type="reset" className="border-white/20  text-white">
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
