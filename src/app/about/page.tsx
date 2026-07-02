import type { Metadata } from "next";
import { Target, Eye, Rocket, MapPin, Users, Award, Coffee } from "lucide-react";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import CtaSection from "@/components/sections/CtaSection";
import StatsSection from "@/components/sections/StatsSection";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn the story, mission, and team behind ArgosMob Tech & AI — premium digital product studio from Greater Noida, India.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Target,
    title: "Precision Over Speed",
    description: "We'd rather take a day longer and deliver something right than rush out mediocre work. Quality is non-negotiable.",
  },
  {
    icon: Users,
    title: "Client as Partner",
    description: "You're not a ticket number. We treat every client relationship as a genuine long-term partnership.",
  },
  {
    icon: Rocket,
    title: "Ownership Mentality",
    description: "We take ownership of outcomes, not just outputs. Your success is our success.",
  },
  {
    icon: Coffee,
    title: "Human-First Culture",
    description: "Behind every project is a team of real people who care — about the work, each other, and the craft.",
  },
];

const milestones = [
  { year: "2019", event: "ArgosMob Founded", description: "Started as a 2-person mobile development studio in Greater Noida." },
  { year: "2020", event: "First Enterprise Client", description: "Delivered our first large-scale enterprise mobile app for a logistics company." },
  { year: "2021", event: "Web & SaaS Expansion", description: "Expanded into full-stack web development and SaaS product engineering." },
  { year: "2022", event: "AI Division Launched", description: "Formed our dedicated AI team to build intelligent automation solutions." },
  { year: "2023", event: "50+ Projects Milestone", description: "Crossed 50 successfully delivered projects across 10+ industries." },
  { year: "2024", event: "Growing Globally", description: "Serving clients across India, Middle East, and Southeast Asia markets." },
];

const teamStats = [
  { icon: Users, value: "20+", label: "Team Members" },
  { icon: Award, value: "80+", label: "Projects" },
  { icon: MapPin, value: "1", label: "HQ — Greater Noida" },
  { icon: Coffee, value: "∞", label: "Cups of Coffee" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/images/ai-renders/ui-ux-design.webp')",
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
              Our Story
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              We Build Products
              <span className="block gradient-text-white">People Love Using.</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              ArgosMob Tech & AI Pvt Ltd is a premium digital product studio based in Greater Noida, India. We partner with ambitious founders and enterprises to build extraordinary software.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <StatsSection />

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <div>
                <SectionHeader
                  eyebrow="The ArgosMob Story"
                  title="Started Small. Built Big."
                  align="left"
                />
                <div className="mt-6 space-y-5 text-slate-600 leading-relaxed">
                  <p>
                    ArgosMob began in 2019 when our founders — a product designer and a backend engineer — grew frustrated with the gap between what clients were promised and what they actually received from typical software agencies.
                  </p>
                  <p>
                    We built ArgosMob on a simple belief: that great software is the result of caring deeply about the problem, the user, and the craft. Not just shipping features.
                  </p>
                  <p>
                    Today, we&apos;re a team of 20+ designers, engineers, and AI specialists who have shipped products across healthcare, fintech, e-commerce, logistics, and more — trusted by startups and enterprises across India and beyond.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <div className="grid grid-cols-2 gap-4">
                {teamStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                      <div className="inline-flex w-12 h-12 rounded-xl bg-blue-100 items-center justify-center text-blue-700 mb-3">
                        <Icon size={20} />
                      </div>
                      <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
                      <p className="text-sm text-slate-500">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader eyebrow="Direction" title="Mission & Vision" />
          </FadeIn>
          <div className="mt-14 grid md:grid-cols-2 gap-8">
            <FadeIn delay={0.1}>
              <div className="relative p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-blue-50 -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center mb-5">
                    <Target size={22} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
                  <p className="text-slate-600 leading-relaxed">
                    To be the most trusted software partner for ambitious businesses — delivering premium digital products that are built to perform, designed to delight, and engineered to last.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="relative p-8 rounded-2xl bg-blue-600 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-blue-500 -translate-y-1/2 translate-x-1/2 opacity-50" />
                <div className="absolute inset-0 grid-pattern opacity-20" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
                    <Eye size={22} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                  <p className="text-blue-100 leading-relaxed">
                    To make India a global hub for premium product engineering — proving that world-class software can be built right here, with the precision of Silicon Valley and the spirit of India.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader
              eyebrow="What We Stand For"
              title="Our Values"
              description="The principles that guide every decision, every line of code, and every client relationship."
            />
          </FadeIn>
          <StaggerContainer className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <StaggerItem key={value.title}>
                  <div className="group p-7 rounded-2xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 text-center h-full">
                    <div className="inline-flex w-14 h-14 rounded-2xl bg-blue-100 group-hover:bg-blue-200 items-center justify-center text-blue-700 mb-5 transition-colors">
                      <Icon size={24} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-3">{value.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{value.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader eyebrow="Our Journey" title="From Startup to Studio" dark />
          </FadeIn>
          <div className="mt-14 relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-900/10 via-blue-800/60 to-blue-900/10" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <FadeIn key={m.year} delay={i * 0.1}>
                  <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-blue-900/50 border border-blue-800 flex flex-col items-center justify-center text-center z-10">
                      <span className="text-xs font-bold text-blue-400">{m.year}</span>
                    </div>
                    <div className="flex-1 pb-8">
                      <h3 className="font-bold text-white mb-2">{m.event}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{m.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
