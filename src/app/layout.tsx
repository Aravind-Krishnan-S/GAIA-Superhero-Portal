import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Cinzel_Decorative } from "next/font/google";
import "./globals.css";
import TopNavigation from "@/components/TopNavigation";
import CustomCursor from "@/components/CustomCursor";
import UISoundEffects from "@/components/UISoundEffects";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const cinzelDecorative = Cinzel_Decorative({
  weight: ["400", "700", "900"],
  variable: "--font-cinzel",
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
      className={`${inter.variable} ${jetbrainsMono.variable} ${cinzelDecorative.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#050505] text-[#F8F9FA] relative">
        <div className="tech-background"></div>
        <CustomCursor />
        <UISoundEffects />
        <TopNavigation />
        <main className="flex-1 mt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
