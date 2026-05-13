import type { Metadata } from "next";
import { Smartphone, Globe, Brain, Zap, Package, Database, Palette, Cloud, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import CtaSection from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Services",
  description: "Premium mobile app development, web development, AI automation, SaaS, UI/UX design and cloud solutions by ArgosMob Tech & AI.",
};

const services = [
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile App Development",
    tagline: "Apps that people actually want to use.",
    description: "We build native and cross-platform mobile applications with React Native that look incredible, perform flawlessly, and ship on time. From MVP to enterprise-grade apps.",
    features: [
      "iOS & Android from a single codebase",
      "Pixel-perfect, native-feel UI",
      "Offline-first architecture",
      "App Store & Play Store submission",
      "Push notifications & deep linking",
      "Real-time features with WebSockets",
    ],
    tech: ["React Native", "TypeScript", "Expo", "Firebase", "REST/GraphQL"],
    color: "blue",
  },
  {
    id: "web",
    icon: Globe,
    title: "Web Development",
    tagline: "Fast, scalable, beautiful web apps.",
    description: "From marketing websites to complex web platforms, we craft experiences that convert visitors into customers and deliver measurable business outcomes.",
    features: [
      "Next.js & React web applications",
      "Server-side rendering & SEO optimization",
      "CMS integration (Sanity, Contentful)",
      "E-commerce & payment integrations",
      "Progressive Web Apps (PWA)",
      "Performance optimization (Core Web Vitals)",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    color: "indigo",
  },
  {
    id: "ai-automation",
    icon: Brain,
    title: "AI Automation",
    tagline: "Let AI handle the repetitive work.",
    description: "We identify high-impact automation opportunities in your business and build intelligent systems that eliminate manual work, reduce costs, and let your team focus on what matters.",
    features: [
      "Business process automation (BPA)",
      "Document processing & extraction",
      "AI-powered workflows",
      "Custom AI agents & pipelines",
      "Data enrichment automation",
      "Reporting & analytics automation",
    ],
    tech: ["LangChain", "OpenAI API", "Python", "Make.com", "Node.js"],
    color: "violet",
  },
  {
    id: "ai-integrations",
    icon: Zap,
    title: "AI Integrations",
    tagline: "Embed intelligence into your product.",
    description: "We integrate cutting-edge AI capabilities — GPT, Claude, vision models, and more — directly into your existing products, making them smarter, faster, and more valuable.",
    features: [
      "ChatGPT & Claude integrations",
      "Custom fine-tuned models",
      "RAG (Retrieval Augmented Generation)",
      "AI-powered search & recommendations",
      "Conversational AI & chatbots",
      "Vector database setup",
    ],
    tech: ["OpenAI", "Anthropic Claude", "Pinecone", "LangChain", "Supabase Vector"],
    color: "blue",
  },
  {
    id: "saas",
    icon: Package,
    title: "SaaS Development",
    tagline: "From idea to recurring revenue.",
    description: "We architect and build complete SaaS products — multi-tenant systems, subscription billing, dashboards, admin panels — everything you need to launch and scale a software business.",
    features: [
      "Multi-tenant architecture",
      "Stripe subscription billing",
      "User auth & role-based access",
      "Admin & analytics dashboards",
      "API-first, webhook-ready",
      "Scalable deployment on AWS/Vercel",
    ],
    tech: ["Next.js", "Supabase", "Stripe", "PostgreSQL", "AWS"],
    color: "cyan",
  },
  {
    id: "backend",
    icon: Database,
    title: "Backend & Systems",
    tagline: "The engine under the hood.",
    description: "Robust, scalable APIs and backend systems designed to handle real-world load. We architect data models, build microservices, and ensure your backend can grow with your business.",
    features: [
      "RESTful & GraphQL APIs",
      "Microservices architecture",
      "Database design & optimization",
      "Third-party API integrations",
      "Real-time with WebSockets",
      "Background jobs & queues",
    ],
    tech: ["Node.js", "Express", "PostgreSQL", "Redis", "Docker"],
    color: "slate",
  },
  {
    id: "design",
    icon: Palette,
    title: "UI/UX Design",
    tagline: "Design that drives results.",
    description: "Great design isn't decoration — it's strategy. We create design systems, user flows, and interfaces that are intuitive, beautiful, and built to convert.",
    features: [
      "User research & persona mapping",
      "Information architecture",
      "Wireframes & interactive prototypes",
      "Design system creation",
      "Figma handoff-ready deliverables",
      "Usability testing & iteration",
    ],
    tech: ["Figma", "FigJam", "Maze", "Framer", "Lottie"],
    color: "pink",
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud & DevOps",
    tagline: "Infrastructure that never sleeps.",
    description: "From initial cloud setup to full CI/CD pipelines, we handle the infrastructure so you can focus on the product. Enterprise-grade reliability, without the enterprise complexity.",
    features: [
      "AWS, GCP & Firebase setup",
      "CI/CD pipeline configuration",
      "Docker & containerization",
      "Monitoring & alerting (Datadog, Sentry)",
      "SSL, domains & DNS management",
      "Disaster recovery planning",
    ],
    tech: ["AWS", "Docker", "GitHub Actions", "Vercel", "Firebase"],
    color: "sky",
  },
];

const colorConfig: Record<string, { badge: string; icon: string; border: string }> = {
  blue: { badge: "bg-blue-50 text-blue-700", icon: "bg-blue-100 text-blue-700", border: "hover:border-blue-200" },
  indigo: { badge: "bg-indigo-50 text-indigo-700", icon: "bg-indigo-100 text-indigo-700", border: "hover:border-indigo-200" },
  violet: { badge: "bg-violet-50 text-violet-700", icon: "bg-violet-100 text-violet-700", border: "hover:border-violet-200" },
  cyan: { badge: "bg-cyan-50 text-cyan-700", icon: "bg-cyan-100 text-cyan-700", border: "hover:border-cyan-200" },
  slate: { badge: "bg-slate-100 text-slate-700", icon: "bg-slate-100 text-slate-700", border: "hover:border-slate-300" },
  pink: { badge: "bg-pink-50 text-pink-700", icon: "bg-pink-100 text-pink-700", border: "hover:border-pink-200" },
  sky: { badge: "bg-sky-50 text-sky-700", icon: "bg-sky-100 text-sky-700", border: "hover:border-sky-200" },
};

export default function ServicesPage() {
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
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, idx) => {
              const Icon = service.icon;
              const config = colorConfig[service.color];
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
                        {service.features.map((f) => (
                          <div key={f} className="flex items-start gap-2">
                            <CheckCircle size={15} className="text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-600">{f}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-7">
                        {service.tech.map((t) => (
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
                      <div className={`rounded-2xl p-8 border ${config.border} bg-gradient-to-br from-slate-50 to-white border-slate-200 transition-all duration-300 hover:shadow-xl`}>
                        <div className={`w-16 h-16 rounded-2xl ${config.icon} flex items-center justify-center mb-6`}>
                          <Icon size={28} />
                        </div>
                        <div className="space-y-3">
                          {service.features.slice(0, 4).map((f, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100">
                              <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                              <span className="text-sm text-slate-700">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
