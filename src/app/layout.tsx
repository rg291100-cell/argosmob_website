import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "ArgosMob Tech & AI Pvt Ltd — Mobile, Web & AI Solutions",
    template: "%s | ArgosMob Tech & AI",
  },
  description:
    "ArgosMob Tech & AI Pvt Ltd — Premium mobile app development, web development, AI automation and SaaS solutions from Greater Noida, India.",
  keywords: [
    "mobile app development",
    "web development",
    "AI automation",
    "AI integration",
    "SaaS development",
    "Greater Noida",
    "India tech company",
  ],
  authors: [{ name: "ArgosMob Tech & AI Pvt Ltd" }],
  creator: "ArgosMob Tech & AI Pvt Ltd",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://argosmob.com",
    siteName: "ArgosMob Tech & AI",
    title: "ArgosMob Tech & AI Pvt Ltd — Mobile, Web & AI Solutions",
    description:
      "Premium mobile app development, web development, AI automation and SaaS solutions from Greater Noida, India.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArgosMob Tech & AI Pvt Ltd",
    description: "Premium mobile app, web & AI solutions from India.",
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)] bg-white overflow-x-hidden">
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
