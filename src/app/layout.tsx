import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Outfit, Phetsarath } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

// Latin companion + Lao script font, used together for the Lao language.
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const phetsarath = Phetsarath({
  variable: "--font-phetsarath",
  subsets: ["lao"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Sykhai Gym — Vientiane's Most Affordable Gym",
  description:
    "Sykhai Gym in Vientiane, Laos. Day passes from 20,000 kip, monthly memberships, full equipment, and a virtual tour. See pricing, hours, and directions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${outfit.variable} ${phetsarath.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
