import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
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
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
