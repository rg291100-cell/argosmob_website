import type { Metadata } from "next";
import { BookOpen, User, Tag, Calendar, ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import InteractiveTile from "@/components/ui/InteractiveTile";
import CtaSection from "@/components/sections/CtaSection";
import { API_BASE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Stories & Insights",
  description: "Read our latest case studies, technology insights, and company news.",
  alternates: { canonical: "/stories" },
};

export default async function StoriesPage() {
  let stories: any[] = [];

  try {
    const res = await fetch(`${API_BASE_URL}/api/stories`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      stories = Array.isArray(data) ? data.filter((s: any) => s.status === 'published') : [];
    }
  } catch (error) {
    console.error("Error fetching stories:", error);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/images/ai-renders/ai-integrations.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "screen",
            opacity: 0.1,
          }}
        />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/50 border border-blue-800 text-blue-300 text-xs font-semibold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Insights
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              Stories from the
              <span className="block gradient-text-white">Cutting Edge.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Case studies, technical deep-dives, and insights from the team building the future of AI and mobile.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="section-padding bg-white min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {stories.length === 0 ? (
            <div className="text-center py-20">
               <p className="text-slate-500">No stories published yet. Stay tuned!</p>
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
              {stories.map((story: any) => (
                <StaggerItem key={story.id}>
                  <InteractiveTile
                    image={story.cover_image}
                    title={story.title}
                    subtitle={story.category}
                    description={story.excerpt || story.content.substring(0, 150) + "..."}
                    objectFit="object-cover"
                    imageHeight="h-[400px]"
                    footer={
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(story.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span className="flex items-center gap-1"><User size={12}/> {story.author}</span>
                        </div>
                        <Link 
                          href={`/stories/${story.slug}`} 
                          className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors"
                        >
                          Read Full Story <ArrowRight size={14} />
                        </Link>
                      </div>
                    }
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
