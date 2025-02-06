import type React from "react";
// import { Inter } from "next/font/google";
import Providers from "./providers";
import RootLayout from "@/components/RootLayout";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <RootLayout>{children}</RootLayout>
        </Providers>
      </body>
    </html>
  );
}
