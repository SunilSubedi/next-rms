"use client";

import React from "react";
import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/dashboard" className="text-2xl font-bold text-blue-600">
          🍽️ Resturant Name
        </Link>

     

        {/* User Info */}
        <div className="flex items-center gap-3">
         <UserButton></UserButton>

          
        </div>
      </div>
    </nav>
  );
}
