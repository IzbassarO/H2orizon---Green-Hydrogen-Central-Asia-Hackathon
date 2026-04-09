import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "KazH2 — Green Hydrogen Intelligence Platform",
  description: "Strategic decision support for green hydrogen in Kazakhstan & Central Asia",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-0 md:ml-[220px] pt-14 md:pt-0">
          {children}
        </main>
      </body>
    </html>
  );
}
