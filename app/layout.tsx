import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar/Navbar";
import { getMe } from "@/service/getMe";

// 1. Primary UI & Body Font (Clean, accessible, modern SaaS feel)
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

// 2. Athletic Display Font for Headings & Hero Sections
const fontDisplay = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GearUp | Rent Sports & Outdoor Gear Instantly",
    template: "%s | GearUp",
  },
  description:
    "Browse, rent, and manage premium sports equipment and outdoor gear effortlessly.",
  keywords: [
    "Sports Gear Rental",
    "Outdoor Equipment",
    "Camping Rentals",
    "Ski & Surf Gear",
    "Fitness Equipment",
  ],
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMe()
  return (
    <html
      lang="en"
      className={cn("scroll-smooth", fontDisplay.variable, "font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary selection:text-primary-foreground">
        <main>
          <Navbar user={user}></Navbar>
          {children}
        </main>
      </body>
    </html>
  );
}