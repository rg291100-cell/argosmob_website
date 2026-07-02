import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MotionProvider from "@/components/ui/MotionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://argosmob.com"),
  title: {
    default: "ArgosMob Tech & AI Pvt Ltd — Mobile, Web & AI Solutions",
    template: "%s | ArgosMob Tech & AI",
  },
  alternates: {
    canonical: "/",
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
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ArgosMob Tech & AI — Mobile, Web & AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ArgosMob Tech & AI Pvt Ltd",
    description: "Premium mobile app, web & AI solutions from India.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://argosmob.com/#organization",
      name: "ArgosMob Tech & AI Pvt Ltd",
      url: "https://argosmob.com",
      logo: "https://argosmob.com/images/logo.png",
      email: "hello@argosmob.onmicrosoft.com",
      telephone: "+91-70426-03342",
      address: {
        "@type": "PostalAddress",
        streetAddress: "618, Hope Tower, Galaxy Blue Sapphire Plaza",
        addressLocality: "Greater Noida",
        addressRegion: "Uttar Pradesh",
        postalCode: "201018",
        addressCountry: "IN",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://argosmob.com/#localbusiness",
      name: "ArgosMob Tech & AI Pvt Ltd",
      description:
        "Premium mobile app development, web development, AI automation and SaaS solutions.",
      url: "https://argosmob.com",
      image: "https://argosmob.com/og-image.jpg",
      telephone: "+91-70426-03342",
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: "618, Hope Tower, Galaxy Blue Sapphire Plaza",
        addressLocality: "Greater Noida",
        addressRegion: "Uttar Pradesh",
        postalCode: "201018",
        addressCountry: "IN",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
      parentOrganization: { "@id": "https://argosmob.com/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} h-full antialiased font-sans`}>
      <body className="min-h-full flex flex-col font-sans bg-white overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
