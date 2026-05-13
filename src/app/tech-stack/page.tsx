import type { Metadata } from "next";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import CtaSection from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Tech Stack",
  description: "Explore the modern technologies ArgosMob uses to build premium mobile apps, web platforms, AI systems, and cloud infrastructure.",
};

const techCategories = [
  {
    id: "frontend",
    label: "Frontend",
    description: "We build pixel-perfect, high-performance user interfaces using the most productive and modern front-end tools.",
    color: "blue",
    technologies: [
      { name: "React", level: 98, description: "Our primary UI library for web applications" },
      { name: "Next.js", level: 96, description: "Full-stack React framework for production" },
      { name: "React Native", level: 94, description: "Cross-platform mobile development" },
      { name: "TypeScript", level: 97, description: "Type-safe development at every layer" },
      { name: "Tailwind CSS", level: 99, description: "Utility-first CSS for rapid UI development" },
      { name: "Framer Motion", level: 90, description: "Production-quality animations" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    description: "Scalable, secure APIs and server-side systems built on battle-tested technologies that handle real-world load.",
    color: "indigo",
    technologies: [
      { name: "Node.js", level: 97, description: "High-performance server-side JavaScript" },
      { name: "Express.js", level: 95, description: "Minimal, flexible Node.js web framework" },
      { name: "PostgreSQL", level: 93, description: "Relational database for complex queries" },
      { name: "Supabase", level: 91, description: "Open-source Firebase alternative" },
      { name: "Redis", level: 88, description: "In-memory caching and pub/sub" },
      { name: "GraphQL", level: 85, description: "Flexible API query language" },
    ],
  },
  {
    id: "ai",
    label: "AI & ML",
    description: "We integrate the world's most capable AI models and frameworks to build intelligent, context-aware applications.",
    color: "violet",
    technologies: [
      { name: "OpenAI GPT-4", level: 95, description: "Industry-leading language model" },
      { name: "Anthropic Claude", level: 92, description: "Safe, reliable AI assistant" },
      { name: "LangChain", level: 90, description: "LLM application development framework" },
      { name: "Pinecone", level: 87, description: "Vector database for AI search" },
      { name: "Hugging Face", level: 82, description: "Open-source ML models" },
      { name: "Python / FastAPI", level: 88, description: "AI microservices and model serving" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    description: "Reliable, scalable infrastructure with zero-downtime deployments and enterprise-grade monitoring.",
    color: "cyan",
    technologies: [
      { name: "AWS", level: 91, description: "Cloud infrastructure leader" },
      { name: "Docker", level: 93, description: "Container orchestration" },
      { name: "Vercel", level: 96, description: "Frontend deployment platform" },
      { name: "Firebase", level: 90, description: "Google's app development platform" },
      { name: "GitHub Actions", level: 92, description: "CI/CD automation" },
      { name: "Sentry", level: 88, description: "Error tracking and performance monitoring" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    description: "Building native-quality mobile experiences that users love across iOS and Android platforms.",
    color: "emerald",
    technologies: [
      { name: "React Native", level: 94, description: "Cross-platform mobile framework" },
      { name: "Expo", level: 92, description: "React Native toolchain" },
      { name: "Reanimated 3", level: 88, description: "Native-performance animations" },
      { name: "MMKV", level: 85, description: "Ultra-fast mobile storage" },
      { name: "React Navigation", level: 95, description: "Routing and navigation" },
      { name: "Fastlane", level: 83, description: "Automated app deployment" },
    ],
  },
  {
    id: "databases",
    label: "Data & Storage",
    description: "We choose the right data storage technology for each use case — relational, document, vector, or real-time.",
    color: "amber",
    technologies: [
      { name: "PostgreSQL", level: 93, description: "Primary relational database" },
      { name: "MongoDB", level: 88, description: "Document database for flexible schemas" },
      { name: "Redis", level: 88, description: "Caching and real-time data" },
      { name: "Supabase", level: 91, description: "Postgres-based backend-as-a-service" },
      { name: "Pinecone", level: 87, description: "Vector embeddings storage" },
      { name: "S3 / R2", level: 90, description: "Object storage for assets" },
    ],
  },
];

const colorConfig: Record<string, { accent: string; badge: string; bar: string; card: string }> = {
  blue: {
    accent: "text-blue-600",
    badge: "bg-blue-50 text-blue-700 border-blue-100",
    bar: "bg-blue-600",
    card: "hover:border-blue-200 hover:shadow-blue-50",
  },
  indigo: {
    accent: "text-indigo-600",
    badge: "bg-indigo-50 text-indigo-700 border-indigo-100",
    bar: "bg-indigo-600",
    card: "hover:border-indigo-200 hover:shadow-indigo-50",
  },
  violet: {
    accent: "text-violet-600",
    badge: "bg-violet-50 text-violet-700 border-violet-100",
    bar: "bg-violet-600",
    card: "hover:border-violet-200 hover:shadow-violet-50",
  },
  cyan: {
    accent: "text-cyan-600",
    badge: "bg-cyan-50 text-cyan-700 border-cyan-100",
    bar: "bg-cyan-600",
    card: "hover:border-cyan-200 hover:shadow-cyan-50",
  },
  emerald: {
    accent: "text-emerald-600",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
    bar: "bg-emerald-600",
    card: "hover:border-emerald-200 hover:shadow-emerald-50",
  },
  amber: {
    accent: "text-amber-600",
    badge: "bg-amber-50 text-amber-700 border-amber-100",
    bar: "bg-amber-500",
    card: "hover:border-amber-200 hover:shadow-amber-50",
  },
};

export default function TechStackPage() {
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
              Technology
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              Tools of the Trade.
              <span className="block gradient-text-white">Best in Class.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              We choose technologies that are production-proven, developer-loved, and built to scale. No fads — just tools that work.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "Battle-Tested", desc: "Every tool we use is proven in production at scale — no experimental tech in your critical path." },
              { title: "Actively Maintained", desc: "We stay current with ecosystem updates and security patches, never leaving you on stale dependencies." },
              { title: "Best-Fit Choice", desc: "We pick the right tool for the job, not the trendy one. Performance, reliability, and DX all factor in." },
            ].map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Categories */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {techCategories.map((category, catIdx) => {
            const config = colorConfig[category.color];
            return (
              <FadeIn key={category.id} delay={catIdx * 0.05}>
                <div>
                  <div className="mb-10">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-widest mb-4 ${config.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${config.bar}`} />
                      {category.label}
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">{category.label} Technologies</h2>
                    <p className="text-slate-500 max-w-2xl">{category.description}</p>
                  </div>

                  <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.06}>
                    {category.technologies.map((tech) => (
                      <StaggerItem key={tech.name}>
                        <div className={`group p-5 rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300 bg-white ${config.card}`}>
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-slate-900 text-sm">{tech.name}</h3>
                              <p className="text-xs text-slate-500 mt-0.5">{tech.description}</p>
                            </div>
                            <span className={`text-sm font-bold ${config.accent}`}>{tech.level}%</span>
                          </div>
                          {/* Skill bar */}
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${config.bar} transition-all duration-700`}
                              style={{ width: `${tech.level}%` }}
                            />
                          </div>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
