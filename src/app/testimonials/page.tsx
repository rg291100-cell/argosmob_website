import type { Metadata } from "next";
import { Quote, Star, TrendingUp, Users, PlayCircle } from "lucide-react";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import CtaSection from "@/components/sections/CtaSection";
import InteractiveTile from "@/components/ui/InteractiveTile";
import { API_BASE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read what founders, CTOs, and business owners say about working with ArgosMob Tech & AI.",
};

const metrics = [
  { icon: Star, value: "4.9/5", label: "Average Client Rating" },
  { icon: Users, value: "50+", label: "Satisfied Clients" },
  { icon: TrendingUp, value: "98%", label: "Repeat / Referral Rate" },
];

export default async function TestimonialsPage() {
  let displayTestimonials: any[] = [];

  try {
    const res = await fetch(`${API_BASE_URL}/api/testimonials`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      displayTestimonials = data.map((t: any) => ({
        id: t.id,
        quote: t.content,
        author: t.client_name,
        role: t.designation,
        company: t.company,
        rating: t.rating,
        tags: [t.designation],
        result: t.company || "Project Success",
        image_url: t.image_url,
        initials: t.client_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
      }));
    }
  } catch (error) {
    console.error("Error fetching testimonials:", error);
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
              Client Stories
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              Don&apos;t Take Our Word.
              <span className="block gradient-text-white">Take Theirs.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Real words from real founders, CTOs, and operators who trusted us to build their products.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-14 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6">
            {metrics.map((m, i) => {
              const Icon = m.icon;
              return (
                <FadeIn key={m.label} delay={i * 0.1}>
                  <div className="text-center">
                    <div className="inline-flex w-12 h-12 rounded-xl bg-blue-50 items-center justify-center text-blue-600 mb-3">
                      <Icon size={20} />
                    </div>
                    <p className="text-3xl font-bold text-slate-900">{m.value}</p>
                    <p className="text-sm text-slate-500 mt-1">{m.label}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Written Testimonials Grid */}
      <section className="section-padding bg-white min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader
              eyebrow="Written Reviews"
              title="What Clients Say"
            />
          </FadeIn>
          
          {displayTestimonials.length === 0 ? (
            <div className="text-center py-20">
               <p className="text-slate-500">No testimonials found in the CMS. Add some in the Admin Panel!</p>
            </div>
          ) : (
            <StaggerContainer className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.07}>
              {displayTestimonials.map((t: any) => (
                <StaggerItem key={t.id}>
                  <InteractiveTile
                    image={t.image_url}
                    title={t.author}
                    subtitle={t.role}
                    description={t.quote}
                    objectFit="object-cover"
                    imageHeight="h-[300px]"
                    topRight={
                      <div className="flex gap-0.5 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg border border-white/30">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <span key={i} className="text-amber-400 text-[10px]">★</span>
                        ))}
                      </div>
                    }
                    footer={
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                           <span className="text-xs font-bold text-slate-400">@ {t.company}</span>
                        </div>
                        <div className="flex gap-2">
                          {t.tags.map((tag: string) => (
                            <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded-md font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
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
