import type { Metadata } from "next";
import { Smartphone, Globe, Brain, Zap, Package, Database, Palette, Cloud, Cpu, Code, Server, Layout, Shield, BarChart3, MessageSquare, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import CtaSection from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Services",
  description: "Premium mobile app development, web development, AI automation, SaaS, UI/UX design and cloud solutions by ArgosMob Tech & AI.",
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

function generateFeatures(title: string, description: string): string[] {
  const features: string[] = [];
  const descLower = description.toLowerCase();
  const titleLower = title.toLowerCase();

  if (titleLower.includes("web") || titleLower.includes("saas") || titleLower.includes("platform") || descLower.includes("frontend") || descLower.includes("full-stack") || descLower.includes("dashboard")) {
    features.push("SEO-optimized Next.js pages");
    features.push("Secure multi-tenant SaaS layout");
    features.push("Scalable database & state APIs");
  }
  else if (titleLower.includes("mobile") || (titleLower.includes("app") && !titleLower.includes("web")) || descLower.includes("native") || descLower.includes("ios") || descLower.includes("android")) {
    features.push("Cross-Platform iOS & Android");
    features.push("Sleek native-feel UI/UX");
    features.push("App Store & Play Store ready");
  }
  else if (titleLower.includes("ai") || titleLower.includes("artificial") || titleLower.includes("intelligence") || descLower.includes("llm") || descLower.includes("openai") || descLower.includes("automation") || descLower.includes("model")) {
    features.push("Advanced LLM & AI integrations");
    features.push("Automated intelligent workflows");
    features.push("Predictive analysis & model tuning");
  }
  else if (titleLower.includes("cloud") || titleLower.includes("infra") || titleLower.includes("database") || descLower.includes("server") || descLower.includes("aws") || descLower.includes("supabase")) {
    features.push("Highly available cloud infra");
    features.push("Automated backup & auto-scaling");
    features.push("Sub-millisecond query optimization");
  }
  else if (titleLower.includes("design") || titleLower.includes("ui") || titleLower.includes("ux") || descLower.includes("wireframe") || descLower.includes("figma") || descLower.includes("prototype")) {
    features.push("High-fidelity Figma wireframes");
    features.push("User-centric journey mapping");
    features.push("Interactive premium micro-interactions");
  }

  if (features.length < 3) {
    const sentences = description.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 10 && s.length < 50);
    for (const s of sentences) {
      if (features.length < 3 && !features.includes(s)) {
        features.push(s);
      }
    }
  }

  const fallbacks = [
    "Enterprise-grade Security",
    "High-performance Scalability",
    "Premium Modern Design System",
    "Production-ready Deployment",
    "24/7 Dedicated Support Integration"
  ];

  while (features.length < 3) {
    const nextFallback = fallbacks.find(f => !features.includes(f));
    if (nextFallback) {
      features.push(nextFallback);
    } else {
      features.push("Custom Business Logic integration");
    }
  }

  return features.slice(0, 3);
}

function generateTagline(title: string, description: string): string {
  const descLower = description.toLowerCase();
  const titleLower = title.toLowerCase();

  if (titleLower.includes("web") || titleLower.includes("saas") || titleLower.includes("platform")) {
    return "Modern Responsive Web Systems";
  }
  if (titleLower.includes("mobile") || (titleLower.includes("app") && !titleLower.includes("web")) || descLower.includes("native") || descLower.includes("ios")) {
    return "Premium Native & Hybrid Applications";
  }
  if (titleLower.includes("ai") || titleLower.includes("artificial") || titleLower.includes("intelligence") || descLower.includes("llm")) {
    return "Artificial Intelligence & Automation";
  }
  if (titleLower.includes("cloud") || titleLower.includes("infra") || titleLower.includes("database")) {
    return "Scalable Serverless Infrastructure";
  }
  if (titleLower.includes("design") || titleLower.includes("ui") || titleLower.includes("ux")) {
    return "Human-Centered Interactive Designs";
  }
  return "Custom Enterprise Solutions";
}

function generateTech(title: string, description: string): string[] {
  const descLower = description.toLowerCase();
  const titleLower = title.toLowerCase();

  if (titleLower.includes("web") || titleLower.includes("saas") || titleLower.includes("platform")) {
    return ["Next.js", "React", "TypeScript", "TailwindCSS", "Node.js", "PostgreSQL"];
  }
  if (titleLower.includes("mobile") || (titleLower.includes("app") && !titleLower.includes("web")) || descLower.includes("native") || descLower.includes("ios")) {
    return ["React Native", "Swift/Kotlin", "Expo", "Fastlane", "TailwindCSS"];
  }
  if (titleLower.includes("ai") || titleLower.includes("artificial") || titleLower.includes("intelligence") || descLower.includes("llm")) {
    return ["Python", "OpenAI API", "LangChain", "FastAPI", "Pinecone", "Claude 3"];
  }
  if (titleLower.includes("cloud") || titleLower.includes("infra") || titleLower.includes("database")) {
    return ["AWS", "Docker", "Terraform", "GitHub Actions", "Nginx", "PostgreSQL"];
  }
  if (titleLower.includes("design") || titleLower.includes("ui") || titleLower.includes("ux")) {
    return ["Figma", "Framer", "Prototyping", "User Research", "Design Tokens"];
  }
  return ["Next.js", "TypeScript", "TailwindCSS", "PostgreSQL", "Node.js"];
}

export default async function ServicesPage() {
  let displayServices: any[] = [];

  try {
    const res = await fetch("http://localhost:5000/api/services", { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      displayServices = data.filter((s: any) => s.is_active).map((s: any, i: number) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        icon: iconMap[s.icon] || Zap,
        tagline: generateTagline(s.title, s.description),
        features: generateFeatures(s.title, s.description),
        tech: generateTech(s.title, s.description),
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
            <div className="text-center py-20">
               <p className="text-slate-500">No services found in the CMS. Add some in the Admin Panel!</p>
            </div>
          ) : (
            <div className="space-y-24">
              {displayServices.map((service: any, idx: number) => {
                const Icon = service.icon;
                const config = colorConfig[service.color] || colorConfig.blue;
                const isEven = idx % 2 === 0;
                return (
                  <FadeIn key={service.id} direction={isEven ? "right" : "left"}>
                    <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? "lg:flex-row-reverse" : ""}`}>
                      <div className={!isEven ? "lg:order-2" : ""}>
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 ${config.badge}`}>
                          <Icon size={13} />
                          {service.title}
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2 leading-tight">{service.title}</h2>
                        <p className="text-blue-600 font-semibold mb-4">{service.tagline}</p>
                        <p className="text-slate-600 leading-relaxed mb-7">{service.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
                          {service.features.map((f: string) => (
                            <div key={f} className="flex items-start gap-2">
                              <CheckCircle size={15} className="text-blue-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-slate-600">{f}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-7">
                          {service.tech.map((t: string) => (
                            <span key={t} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                              {t}
                            </span>
                          ))}
                        </div>
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
                            <img 
                              src={service.image_url} 
                              alt={service.title} 
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
