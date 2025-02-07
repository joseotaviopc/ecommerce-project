"use client";

import type React from "react";
import { CartProvider } from "../context/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "@/context/UserContext";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
