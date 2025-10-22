"use client";
import { SignOutButton } from "@clerk/nextjs";

export default function SignOut() {
  return (
    <header className="flex justify-between p-4 bg-gray-100">
      <h1>Dashboard</h1>
      <SignOutButton>
        <button className="px-4 py-2 bg-red-500 text-white rounded">
          Sign Out
        </button>
      </SignOutButton>
    </header>
  );
}
