import type React from "react";
import Providers from "./providers";
import RootLayout from "@/components/RootLayout";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <RootLayout>{children}</RootLayout>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
