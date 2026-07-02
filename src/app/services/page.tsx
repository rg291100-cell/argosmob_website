import type { Metadata } from "next";
import { Smartphone, Globe, Brain, Zap, Package, Database, Palette, Cloud, Cpu, Code, Server, Layout, Shield, BarChart3, MessageSquare, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import CtaSection from "@/components/sections/CtaSection";
import { API_BASE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description: "Premium mobile app development, web development, AI automation, SaaS, UI/UX design and cloud solutions by ArgosMob Tech & AI.",
  alternates: { canonical: "/services" },
};

const iconMap: Record<string, any> = {
  Smartphone, Globe, Brain, Zap, Package, Database, Palette, Cloud, Cpu, Code, Server, Layout, Shield, BarChart3, MessageSquare
};

const colorConfig: Record<string, { badge: string; icon: string; border: string; color: string }> = {
  blue: { badge: "bg-blue-50 text-blue-700", icon: "bg-blue-100 text-blue-700", border: "hover:border-blue-200", color: "blue" },
  indigo: { badge: "bg-indigo-50 text-indigo-700", icon: "bg-indigo-100 text-indigo-700", border: "hover:border-indigo-200", color: "indigo" },
  violet: { badge: "bg-violet-50 text-violet-700", icon: "bg-violet-100 text-violet-700", border: "hover:border-violet-200", color: "violet" },
  cyan: { badge: "bg-cyan-50 text-cyan-700", icon: "bg-cyan-100 text-cyan-700", border: "hover:border-cyan-200", color: "cyan" },
  slate: { badge: "bg-slate-100 text-slate-700", icon: "bg-slate-100 text-slate-700", border: "hover:border-slate-300", color: "slate" },
  pink: { badge: "bg-pink-50 text-pink-700", icon: "bg-pink-100 text-pink-700", border: "hover:border-pink-200", color: "pink" },
  sky: { badge: "bg-sky-50 text-sky-700", icon: "bg-sky-100 text-sky-700", border: "hover:border-sky-200", color: "sky" },
};

const colors = ["blue", "indigo", "violet", "cyan", "slate", "pink", "sky"];

export default async function ServicesPage() {
  let displayServices: any[] = [];

  try {
    const res = await fetch(`${API_BASE_URL}/api/services`, { next: { revalidate: 60 } });
    if (res.ok) {
      const raw = await res.json();
      const data = Array.isArray(raw) ? raw : [];
      // Only content that actually exists in the CMS — no auto-generated claims
      displayServices = data.filter((s: any) => s.is_active).map((s: any, i: number) => ({
        id: s.id,
        // Anchor target for footer deep-links, e.g. /services#mobile-app-development
        anchor: String(s.title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        title: s.title,
        description: s.description,
        icon: iconMap[s.icon] || Zap,
        tagline: typeof s.tagline === "string" ? s.tagline : "",
        features: Array.isArray(s.features) ? s.features.filter((f: any) => typeof f === "string") : [],
        tech: Array.isArray(s.tech_stack) ? s.tech_stack.filter((t: any) => typeof t === "string") : [],
        color: colors[i % colors.length],
        image_url: s.image_url || ""
      }));
    }
  } catch (error) {
    console.error("Error fetching services:", error);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/images/ai-renders/saas-dev.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "screen",
            opacity: 0.1,
          }}
        />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/8 blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/50 border border-blue-800 text-blue-300 text-xs font-semibold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              What We Offer
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              Premium Services for
              <span className="block gradient-text-white">Ambitious Businesses.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Every service we offer is engineered to create measurable outcomes. We don&apos;t just ship features — we solve problems that matter.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-white min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {displayServices.length === 0 ? (
            <div className="text-center py-24 bg-slate-50/60 rounded-3xl border border-slate-200 border-dashed">
              <div className="w-16 h-16 bg-white rounded-full border border-slate-100 shadow-sm flex items-center justify-center mx-auto mb-5">
                <Package className="text-blue-500" size={24} />
              </div>
              <p className="text-slate-900 font-bold mb-1">Services are being updated</p>
              <p className="text-slate-500 text-sm">Check back soon — new offerings are on the way.</p>
            </div>
          ) : (
            <div className="space-y-24">
              {displayServices.map((service: any, idx: number) => {
                const Icon = service.icon;
                const config = colorConfig[service.color] || colorConfig.blue;
                const isEven = idx % 2 === 0;
                return (
                  <FadeIn key={service.id} direction={isEven ? "right" : "left"}>
                    <div id={service.anchor} className={`scroll-mt-28 grid lg:grid-cols-2 gap-12 items-center ${!isEven ? "lg:flex-row-reverse" : ""}`}>
                      <div className={!isEven ? "lg:order-2" : ""}>
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 ${config.badge}`}>
                          <Icon size={13} />
                          {service.title}
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2 leading-tight">{service.title}</h2>
                        {service.tagline && (
                          <p className="text-blue-600 font-semibold mb-4">{service.tagline}</p>
                        )}
                        <p className="text-slate-600 leading-relaxed mb-7">{service.description}</p>
                        {service.features.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
                            {service.features.map((f: string) => (
                              <div key={f} className="flex items-start gap-2">
                                <CheckCircle size={15} className="text-blue-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-slate-600">{f}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {service.tech.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-7">
                            {service.tech.map((t: string) => (
                              <span key={t} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-all active:scale-95"
                        >
                          Get Started <ArrowRight size={15} />
                        </Link>
                      </div>
                      <div className={`${!isEven ? "lg:order-1" : ""} relative`}>
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px] group border border-slate-200 bg-slate-50">
                          {service.image_url && (
                            <Image
                              src={service.image_url}
                              alt={service.title}
                              fill
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className="absolute inset-0 w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                            />
                          )}
                          <div className="absolute inset-0 grid-pattern opacity-10" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-50/95 via-slate-50/45 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-8">
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-md border border-slate-200/80 bg-white/95 text-slate-800">
                              <Icon size={24} className={
                                service.color === "blue" ? "text-blue-600" :
                                service.color === "indigo" ? "text-indigo-600" :
                                service.color === "violet" ? "text-violet-600" :
                                service.color === "cyan" ? "text-cyan-600" :
                                service.color === "slate" ? "text-slate-700" :
                                service.color === "pink" ? "text-pink-600" : "text-sky-600"
                              } />
                            </div>
                            {service.features.length > 0 && (
                            <div className="space-y-3">
                              {service.features.slice(0, 3).map((f: string, i: number) => (
                                <div 
                                  key={i} 
                                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/60 bg-white/85 backdrop-blur-md shadow-sm hover:bg-white/95 transition-all duration-300"
                                >
                                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                                    service.color === "blue" ? "bg-blue-500" :
                                    service.color === "indigo" ? "bg-indigo-500" :
                                    service.color === "violet" ? "bg-violet-500" :
                                    service.color === "cyan" ? "bg-cyan-500" :
                                    service.color === "slate" ? "bg-slate-600" :
                                    service.color === "pink" ? "bg-pink-500" : "bg-sky-500"
                                  }`} />
                                  <span className="text-sm text-slate-800 font-semibold">{f}</span>
                                </div>
                              ))}
                            </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
