import type { Metadata } from "next";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import CtaSection from "@/components/sections/CtaSection";
import InteractiveTile from "@/components/ui/InteractiveTile";
import { API_BASE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tech Stack",
  description: "Explore the modern technologies ArgosMob uses to build premium mobile apps, web platforms, AI systems, and cloud infrastructure.",
};

const colorConfig: Record<string, { accent: string; badge: string; bar: string; card: string; color: string }> = {
  blue: { accent: "text-blue-600", badge: "bg-blue-50 text-blue-700 border-blue-100", bar: "bg-blue-600", card: "hover:border-blue-200 hover:shadow-blue-50", color: "blue" },
  indigo: { accent: "text-indigo-600", badge: "bg-indigo-50 text-indigo-700 border-indigo-100", bar: "bg-indigo-600", card: "hover:border-indigo-200 hover:shadow-indigo-50", color: "indigo" },
  violet: { accent: "text-violet-600", badge: "bg-violet-50 text-violet-700 border-violet-100", bar: "bg-violet-600", card: "hover:border-violet-200 hover:shadow-violet-50", color: "violet" },
  cyan: { accent: "text-cyan-600", badge: "bg-cyan-50 text-cyan-700 border-cyan-100", bar: "bg-cyan-600", card: "hover:border-cyan-200 hover:shadow-cyan-50", color: "cyan" },
  emerald: { accent: "text-emerald-600", badge: "bg-emerald-50 text-emerald-700 border-emerald-100", bar: "bg-emerald-600", card: "hover:border-emerald-200 hover:shadow-emerald-50", color: "emerald" },
  amber: { accent: "text-amber-600", badge: "bg-amber-50 text-amber-700 border-amber-100", bar: "bg-amber-500", card: "hover:border-amber-200 hover:shadow-amber-50", color: "amber" },
};

const colors = ["blue", "indigo", "violet", "cyan", "emerald", "amber"];

export default async function TechStackPage() {
  let displayCategories: any[] = [];

  try {
    const res = await fetch(`${API_BASE_URL}/api/tech-stack`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      const groups: Record<string, any[]> = {};
      data.forEach((t: any) => {
        if (!groups[t.category]) groups[t.category] = [];
        groups[t.category].push({
          name: t.name,
          icon_url: t.icon_url,
          level: 90 + Math.floor(Math.random() * 8),
          description: `Enterprise-grade ${t.name} development.`
        });
      });

      displayCategories = Object.entries(groups).map(([label, technologies], i) => ({
        id: label.toLowerCase().replace(/\s+/g, '-'),
        label,
        description: `We use the world's most capable ${label} tools to build products that scale.`,
        color: colors[i % colors.length],
        technologies
      }));
    }
  } catch (error) {
    console.error("Error fetching tech stack:", error);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-slate-950 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: "url('/images/ai-renders/cloud-infra.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "screen",
            opacity: 0.15,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-900/80 to-slate-950 z-0" />
        {/* Grid pattern removed */}
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

      {/* Tech Categories */}
      <section className="section-padding bg-white min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {displayCategories.length === 0 ? (
             <div className="text-center py-20">
               <p className="text-slate-500">No tech stack items found in the CMS. Add some in the Admin Panel!</p>
            </div>
          ) : (
            displayCategories.map((category: any, catIdx: number) => {
              const config = colorConfig[category.color] || colorConfig.blue;
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

                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.06}>
                      {category.technologies.map((tech: any) => (
                        <StaggerItem key={tech.name}>
                          <InteractiveTile
                            image={tech.icon_url}
                            title={tech.name}
                            subtitle={`${tech.level}% Proficiency`}
                            description={tech.description}
                            config={config}
                            hideExpansion={true}
                            footer={
                              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${config.bar} transition-all duration-700`}
                                  style={{ width: `${tech.level}%` }}
                                />
                              </div>
                            }
                          />
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                </FadeIn>
              );
            })
          )}
        </div>
      </section>
    </>
  );
}
