
"use client";

import { useRouter } from "next/navigation";
import {
  ChevronUp,
  LayoutDashboard,
  Plus,
  UserRound,
  CalendarDays,
  LogOut,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

type Props = {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
};

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Add New Studio", href: "/add-studio", icon: Plus },
  { name: "My Studio Listings", href: "/my-studios", icon: UserRound },
  { name: "My Bookings", href: "/my-bookings", icon: CalendarDays },
];

export default function ProfileDropdown({ user }: Props) {
  const router = useRouter();
   const handleSignout = () => {
    authClient.signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-14 items-center gap-3 rounded-full border px-3 outline-none hover:bg-slate-50">
        <Avatar className="size-10 border-2 border-[#CCFF00]">
          <AvatarImage src={user.image || ""} />
          <AvatarFallback>
            {user.name?.charAt(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <span className="max-w-28 truncate font-bold">{user.name}</span>
        <ChevronUp className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-[min(384px,calc(100vw-24px))] rounded-2xl p-0 shadow-xl"
      >
        <div className="border-b p-5 sm:p-6">
          <h3 className="text-xl font-bold">{user.name}</h3>
          <p className="mt-1 break-all text-sm text-slate-500">
            {user.email}
          </p>
        </div>

        <div className="space-y-1 p-3 sm:p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <DropdownMenuItem
                key={item.name}
                onSelect={() => router.push(item.href)}
                className="cursor-pointer gap-3 rounded-lg px-3 py-3 text-base"
              >
                <Icon className="size-5" />
                {item.name}
              </DropdownMenuItem>
            );
          })}
        </div>

        <DropdownMenuSeparator />

        <div className="p-3 sm:p-4">
          <DropdownMenuItem
           
            onClick={handleSignout}
            className="cursor-pointer gap-3 rounded-lg px-3 py-3 font-semibold text-red-600 focus:bg-red-50 focus:text-red-600"
          >
            <LogOut className="size-5" />
            Logout
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
