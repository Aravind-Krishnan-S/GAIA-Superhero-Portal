import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import TopNavigation from "@/components/TopNavigation";
import ContactGaia from "@/components/ContactGaia";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "G.A.I.A. Portal",
  description: "Global Anomaly Investigation Agency",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#050505] text-[#F8F9FA] relative">
        <div className="tech-background"></div>
        <CustomCursor />
        <TopNavigation />
        <main className="flex-1 mt-16">
          {children}
        </main>
        <ContactGaia />
      </body>
    </html>
  );
}
