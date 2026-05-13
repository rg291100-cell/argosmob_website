import type { Metadata } from "next";
import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import CtaSection from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore ArgosMob's portfolio of premium mobile apps, SaaS platforms, AI systems, and web applications.",
};

const projects = [
  {
    title: "FreshCart",
    subtitle: "Grocery Delivery Platform",
    category: "Mobile App",
    description: "A full-stack React Native grocery delivery platform with real-time order tracking, slot-based scheduling, and AI-powered product discovery for 200K+ users.",
    tags: ["React Native", "Node.js", "Firebase", "OpenAI", "Google Maps"],
    gradient: "from-emerald-600 to-teal-700",
    metrics: [
      { label: "Downloads", value: "200K+" },
      { label: "Avg. Rating", value: "4.8★" },
      { label: "Uptime", value: "99.9%" },
    ],
    features: ["Real-time tracking", "AI recommendations", "Slot-based delivery", "Multi-vendor support"],
  },
  {
    title: "NexCRM",
    subtitle: "AI Sales Intelligence Dashboard",
    category: "SaaS Platform",
    description: "An intelligent CRM with GPT-4 powered lead scoring, automated email sequences, predictive churn analysis, and revenue forecasting for B2B SaaS companies.",
    tags: ["Next.js", "PostgreSQL", "OpenAI GPT-4", "AWS", "Stripe"],
    gradient: "from-blue-600 to-indigo-700",
    metrics: [
      { label: "ARR", value: "₹1.2Cr" },
      { label: "Users", value: "500+" },
      { label: "Leads Scored", value: "50K+" },
    ],
    features: ["AI lead scoring", "Email automation", "Revenue forecasting", "Pipeline analytics"],
  },
  {
    title: "MediBook",
    subtitle: "Healthcare Appointment Platform",
    category: "Healthcare App",
    description: "HIPAA-compliant telemedicine and appointment booking platform integrating with EMR systems, serving 40+ hospitals with HD video consultation and digital prescriptions.",
    tags: ["React Native", "Supabase", "WebRTC", "Node.js", "Twilio"],
    gradient: "from-violet-600 to-purple-700",
    metrics: [
      { label: "Hospitals", value: "40+" },
      { label: "Daily Bookings", value: "2K+" },
      { label: "Satisfaction", value: "96%" },
    ],
    features: ["HD Video consultation", "EMR integration", "Digital prescriptions", "Insurance handling"],
  },
  {
    title: "TablePOS",
    subtitle: "Restaurant Management SaaS",
    category: "SaaS Platform",
    description: "An end-to-end restaurant management SaaS with table management, kitchen display systems, inventory tracking, and multi-outlet analytics for restaurant chains.",
    tags: ["Next.js", "React Native", "PostgreSQL", "Stripe", "WebSocket"],
    gradient: "from-orange-600 to-amber-700",
    metrics: [
      { label: "Restaurants", value: "150+" },
      { label: "Orders/Day", value: "15K+" },
      { label: "Revenue Tracked", value: "₹5Cr+" },
    ],
    features: ["Table management", "Kitchen display", "Inventory tracking", "Multi-outlet analytics"],
  },
  {
    title: "ShopFlow",
    subtitle: "E-Commerce Platform",
    category: "Web Platform",
    description: "A high-performance headless e-commerce platform with AI-powered personalization, dynamic pricing, and a multi-vendor marketplace supporting 500+ sellers.",
    tags: ["Next.js", "Sanity CMS", "Stripe", "PostgreSQL", "Redis"],
    gradient: "from-pink-600 to-rose-700",
    metrics: [
      { label: "Sellers", value: "500+" },
      { label: "Monthly GMV", value: "₹2Cr+" },
      { label: "Conv. Rate", value: "4.2%" },
    ],
    features: ["Headless architecture", "AI personalization", "Dynamic pricing", "Multi-vendor marketplace"],
  },
  {
    title: "ArcBot",
    subtitle: "AI Customer Support Chatbot",
    category: "AI System",
    description: "An enterprise-grade AI chatbot built on Claude + LangChain with RAG capabilities, handling 80% of customer queries automatically with context-aware responses.",
    tags: ["Claude AI", "LangChain", "Pinecone", "Next.js", "Python"],
    gradient: "from-slate-600 to-slate-800",
    metrics: [
      { label: "Queries Automated", value: "80%" },
      { label: "Response Time", value: "<2s" },
      { label: "CSAT Score", value: "4.6★" },
    ],
    features: ["Context-aware responses", "Knowledge base RAG", "Multi-language support", "Handoff to human"],
  },
];

const categories = ["All", "Mobile App", "SaaS Platform", "Web Platform", "AI System", "Healthcare App"];

export default function PortfolioPage() {
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
              Our Work
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              Products Built.
              <span className="block gradient-text-white">Results Delivered.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              A selection of digital products we&apos;ve engineered — each one built to solve a real problem, trusted by real users.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Category Filter (visual only) */}
      <section className="bg-white border-b border-slate-100 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-3 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                i === 0
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8" staggerDelay={0.1}>
            {projects.map((project) => (
              <StaggerItem key={project.title}>
                <div className="group rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-slate-100 hover:border-slate-300 transition-all duration-400 flex flex-col h-full">
                  {/* Top gradient */}
                  <div className={`relative h-52 bg-gradient-to-br ${project.gradient} p-7 overflow-hidden`}>
                    <div className="absolute inset-0 grid-pattern opacity-20" />
                    <div className="relative z-10 flex items-start justify-between">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-3">
                          {project.category}
                        </span>
                        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                        <p className="text-white/70 text-sm mt-1">{project.subtitle}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink size={16} className="text-white" />
                      </div>
                    </div>
                    {/* Metrics */}
                    <div className="absolute bottom-5 left-7 right-7 flex gap-4">
                      {project.metrics.map((m) => (
                        <div key={m.label}>
                          <p className="text-white font-bold text-sm">{m.value}</p>
                          <p className="text-white/60 text-[10px]">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-7 flex flex-col flex-1">
                    <p className="text-slate-600 text-sm leading-relaxed mb-5">{project.description}</p>
                    <div className="grid grid-cols-2 gap-2 mb-5">
                      {project.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-xs text-slate-500">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-auto pt-5 border-t border-slate-100">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Build Something Great?</h2>
            <p className="text-slate-500 mb-8">
              Your project could be the next case study here. Let&apos;s discuss what you&apos;re building.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-100"
            >
              Start Your Project <ArrowRight size={17} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
