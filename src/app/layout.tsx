import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "../components/layout/layout"; // New client component

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food Magnet",
  description: "Welcome ko food magnet",
  icons: {
    icon: "/logo.svg",       // your SVG logo as favicon
    shortcut: "/logo.svg",   // optional shortcut icon
    apple: "/logo.svg",      // optional for iOS
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout> {children} </ClientLayout>
      </body>
    </html>
  );
}
