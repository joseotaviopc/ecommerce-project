"use client";

import type React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function RootLayout(
  { children }: { children: React.ReactNode },
) {
  const { cart } = useCart();
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background border-b">
        <div className="container mx-auto px-8">
          <nav className="flex h-16 items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              E-Commerce
            </Link>
            <Link href="/cart" className="hover:underline relative">
              {cart.length
                ? (
                  <span className="absolute -top-2 -right-4 rounded-full bg-white border border-gray-400 h-5 w-5 flex items-center justify-center text-red-800 font-semibold">
                    {cart.length}
                  </span>
                )
                : null}
              Cart
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto mt-8 px-4">{children}</main>
    </div>
  );
}
