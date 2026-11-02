"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Aperture,
  User,
  Mail,
  Lock,
  Image as ImageIcon,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  X,
  Clapperboard,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";


export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const rules = [
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One lowercase letter", valid: /[a-z]/.test(password) },
    { label: "At least 6 characters", valid: password.length >= 6 },
  ];

  const isValid = rules.every((rule) => rule.valid);


  const handleEmailSignUp =async (e: React.SubmitEvent<HTMLElement>) =>{
        e.preventDefault();
        const formData = new FormData(e.target)
        const user = Object.fromEntries(formData.entries()) as {name:string, email: string, imageUrl: string, password:string}
        // console.log(user);

        const {data , error} = await authClient.signUp.email({
          ...user
        })

        if(data){
          redirect('/')
        }
        if(error){
          console.log(error);
          
        }
        
        
  }




  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080F35] px-4 py-8">
      <div className="w-full max-w-[420px] rounded-2xl border border-white/10 bg-[#111C4B] p-6 shadow-2xl sm:p-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-md shadow-black/10"
        >
          <Clapperboard
            size={40}
            className="rounded-xl bg-[#102A72] p-2 text-[#CCFF00]"
          />

          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-blue-950">
              Studio<span className="text-blue-600">Space</span>
            </span>
          </div>
        </Link>

        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="mt-2 text-sm text-blue-100/60">
            Join StudioSpace and explore creative spaces.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleEmailSignUp} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-white">Full Name</label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                size={17}
              />
              <input
                type="text"  
                name="name"
                placeholder="Enter your name"
                required
                className="h-11 w-full rounded-lg border border-white/10 bg-[#080F35] pl-10 pr-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#CCFF00]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-white">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                size={17}
              />
              <input
                type="email" 
                name="email"
                placeholder="you@example.com"
                required
                className="h-11 w-full rounded-lg border border-white/10 bg-[#080F35] pl-10 pr-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#CCFF00]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-white">Photo URL</label>
            <div className="relative">
              <ImageIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                size={17}
              />
              <input
                type="url" 
                name="imageUrl"
                placeholder="Enter your photo URL"
                required
                className="h-11 w-full rounded-lg border border-white/10 bg-[#080F35] pl-10 pr-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#CCFF00]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-white">Password</label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                size={17}
              />
              <input
                type={showPassword ? "text" : "password"} 
                name="password" 
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 w-full rounded-lg border border-white/10 bg-[#080F35] pl-10 pr-11 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#CCFF00]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#CCFF00]"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5">
              {rules.map((rule) => (
                <span
                  key={rule.label}
                  className={`flex items-center gap-1 text-[11px] ${
                    rule.valid ? "text-[#CCFF00]" : "text-white/40"
                  }`}
                >
                  {rule.valid ? <Check size={12} /> : <X size={12} />}
                  {rule.label}
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#CCFF00] text-sm font-bold text-[#101A4A] transition hover:bg-[#DFFF55] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Create Account
            <ArrowRight size={17} />
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-white/40">OR</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Google */}
        <button
          type="button"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 text-sm text-white transition hover:bg-white/10"
        >
          <span className="font-bold text-lg">G</span>
          Continue with Google
        </button>

        {/* Login */}
        <p className="mt-5 text-center text-sm text-white/60">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#CCFF00] hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
