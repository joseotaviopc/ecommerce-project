"use client"

import type React from "react";
import Link from "next/link";

export default function RootLayout(
  { children }: { children: React.ReactNode },
) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4">
          <nav className="flex h-16 items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              E-Commerce
            </Link>
            <Link href="/cart" className="hover:underline">
              Cart
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto mt-8 px-4">{children}</main>
    </div>
  );
}
