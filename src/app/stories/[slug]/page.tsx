import type { Metadata } from "next";
import { Calendar, User, Tag, ArrowLeft, Play, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeIn from "@/components/animations/FadeIn";
import CtaSection from "@/components/sections/CtaSection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Helper to extract YouTube video ID
function getYouTubeId(url: string) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

async function getStory(slug: string) {
  try {
    const res = await fetch("http://localhost:5000/api/stories", { cache: 'no-store' });
    if (!res.ok) return null;
    const stories = await res.json();
    return stories.find((s: any) => s.slug === slug && s.status === 'published') || null;
  } catch (error) {
    console.error("Error fetching story detail:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) return { title: "Story Not Found" };
  return {
    title: `${story.title} | Case Studies`,
    description: story.excerpt || "Read our latest case study & success story.",
  };
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const story = await getStory(slug);

  if (!story) {
    notFound();
  }

  const ytId = getYouTubeId(story.youtube_url);
  const ytThumbnail = ytId 
    ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` 
    : null;

  return (
    <>
      {/* Header / Hero */}
      <section className="relative pt-36 pb-24 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] rounded-full bg-blue-600/10 blur-[120px]" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            {/* Back Button */}
            <Link 
              href="/stories" 
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              Back to Stories
            </Link>

            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-blue-400 mb-6">
              <span className="px-3 py-1 bg-blue-900/40 border border-blue-800/60 rounded-full font-bold uppercase tracking-wider">
                {story.category || "Case Study"}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-700" />
              <span className="flex items-center gap-1 text-slate-400">
                <Calendar size={13} /> 
                {new Date(story.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-700" />
              <span className="flex items-center gap-1 text-slate-400">
                <User size={13} /> 
                {story.author || "ArgosMob"}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] mb-6 max-w-4xl">
              {story.title}
            </h1>

            {/* Short Excerpt */}
            {story.excerpt && (
              <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-medium">
                {story.excerpt}
              </p>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-20 bg-slate-50 min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Full Content */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm shadow-slate-200/20">
              <FadeIn>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">
                  Project Description & Highlights
                </h2>
                
                {/* Content body with premium formatting */}
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
                  {story.content.split('\n').map((paragraph: string, index: number) => {
                    const text = paragraph.trim();
                    if (!text) return null;
                    return (
                      <p key={index} className="text-[16px] leading-[1.75] text-slate-600">
                        {text}
                      </p>
                    );
                  })}
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Sticky Media / Video Box */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-8">
              <FadeIn delay={0.15}>
                
                {/* Video Card */}
                {story.youtube_url ? (
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden p-5 group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-red-500 uppercase tracking-widest flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                        Project Showcase
                      </span>
                      <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Youtube Video</span>
                    </div>

                    {/* YouTube Video Link Thumbnail */}
                    <a 
                      href={story.youtube_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="relative block aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group/video"
                    >
                      {/* Video Thumbnail Background */}
                      {ytThumbnail ? (
                        <img 
                          src={ytThumbnail} 
                          alt="Video thumbnail" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/video:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-900 to-indigo-950 flex items-center justify-center p-6 text-center">
                          <p className="text-xs font-bold text-slate-400">Click to watch project showcase</p>
                        </div>
                      )}

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-slate-950/40 group-hover/video:bg-slate-950/50 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/30 border-4 border-white/95 scale-90 group-hover/video:scale-100 transition-all duration-300">
                          <Play size={24} className="fill-white translate-x-0.5" />
                        </div>
                      </div>

                      {/* Watch on YouTube tooltip */}
                      <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-white flex items-center gap-1 border border-white/10 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300">
                        Watch Video <ExternalLink size={10} />
                      </div>
                    </a>

                    <div className="mt-5 text-center">
                      <p className="text-xs font-semibold text-slate-400">
                        Click on the video above to redirect and watch the showcase directly on YouTube!
                      </p>
                      <a 
                        href={story.youtube_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Open YouTube Link <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                ) : (
                  /* Cover Image Display if no Video Link */
                  <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Project Banner</span>
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
                      {story.cover_image ? (
                        <img 
                          src={story.cover_image} 
                          alt={story.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-6 text-slate-400 text-xs">
                          No preview image available
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Back to list CTA */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm shadow-slate-100/50 space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Looking for your product?</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    ArgosMob Tech & AI builds award-winning mobile, web, and custom AI software platforms for startups and enterprise teams globally.
                  </p>
                  <Link 
                    href="/contact" 
                    className="block w-full py-3 bg-blue-600 text-white rounded-xl text-xs font-bold text-center hover:bg-blue-700 transition-colors shadow-md shadow-blue-100"
                  >
                    Discuss Your Project
                  </Link>
                </div>

              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
