"use client";

import type React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

export default function RootLayout(
  { children }: { children: React.ReactNode },
) {
  const { cart } = useCart();
  const { user, handleLogin } = useUser();
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (user) {
      setShowLogin(false);
    }
  },[user])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed w-full z-50 bg-background border-b">
        <div className="container mx-auto px-8">
          <nav className="flex h-16 items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              E-Commerce
            </Link>
            <div className="flex items-center space-x-4">
              {showLogin && (
                <Link href="#" className="hover:underline" onClick={handleLogin}>
                  Logar
                </Link>
              )}
              <Link href="/cart" className="hover:underline relative">
                {cart.length
                  ? (
                    <span className="absolute -top-2 -right-4 rounded-full bg-white border border-gray-400 h-5 w-5 flex items-center justify-center text-red-800 font-semibold">
                      {cart.length}
                    </span>
                  )
                  : null}
                <div className=" border border-gray-500 p-2 rounded-lg">
                  <ShoppingCart className="h-4 w-4" />
                </div>
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto mt-8 pt-12 px-4">{children}</main>
    </div>
  );
}
