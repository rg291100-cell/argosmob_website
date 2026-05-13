import type { Metadata } from "next";
import { Quote, PlayCircle, TrendingUp, Users, Star } from "lucide-react";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import CtaSection from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read what founders, CTOs, and business owners say about working with ArgosMob Tech & AI.",
};

const testimonials = [
  {
    quote: "ArgosMob completely transformed how we operate. The AI automation they built cut our manual workload by 70% and paid for itself within 3 months. Their team doesn't just write code — they think like product owners.",
    author: "Rahul Sharma",
    role: "CEO & Co-founder",
    company: "FreshCart India",
    rating: 5,
    tags: ["AI Automation", "Mobile App"],
    result: "70% workload reduction",
  },
  {
    quote: "We came with a complex SaaS vision and they delivered something beyond what we imagined. The architecture is elegant, the code is clean, and the product is fast. They hit every deadline without cutting corners.",
    author: "Priya Mehta",
    role: "Founder",
    company: "NexCRM",
    rating: 5,
    tags: ["SaaS Platform", "Next.js"],
    result: "₹1.2Cr ARR achieved",
  },
  {
    quote: "After working with 3 agencies before ArgosMob, I can confidently say — there's a real difference between people who write code and people who build products. ArgosMob builds products.",
    author: "Vikram Nair",
    role: "CTO",
    company: "MediBook Technologies",
    rating: 5,
    tags: ["Healthcare App", "React Native"],
    result: "40+ hospitals onboarded",
  },
  {
    quote: "The attention to detail was remarkable. Every pixel, every interaction — it all felt intentional and premium. Our customers constantly comment on how beautiful and smooth the app feels.",
    author: "Ananya Krishnan",
    role: "Product Lead",
    company: "ShopFlow Commerce",
    rating: 5,
    tags: ["E-Commerce", "Web Platform"],
    result: "4.2% conversion rate",
  },
  {
    quote: "Communication was always clear, delivery was always predictable. We had zero surprises. They flagged risks early, gave us honest estimates, and were always reachable. That's rare in this industry.",
    author: "Arjun Kapoor",
    role: "Co-founder",
    company: "TablePOS",
    rating: 5,
    tags: ["SaaS", "Restaurant Tech"],
    result: "150+ restaurants live",
  },
  {
    quote: "We asked them to integrate Claude AI into our customer support flow. Within 6 weeks, we had an intelligent chatbot handling 80% of queries automatically. The ROI was immediate and measurable.",
    author: "Deepa Nambiar",
    role: "Head of Operations",
    company: "Zenexa Solutions",
    rating: 5,
    tags: ["AI Integration", "Chatbot"],
    result: "80% queries automated",
  },
  {
    quote: "Their UI/UX team is genuinely talented. They redesigned our entire product design system in a way that both users and developers love. The design-to-code handoff was flawless.",
    author: "Nikhil Bose",
    role: "CPO",
    company: "DataSync Analytics",
    rating: 5,
    tags: ["UI/UX Design", "Design System"],
    result: "32% increase in retention",
  },
  {
    quote: "What I appreciate most is their honesty. When I had an unrealistic timeline, they told me directly and proposed a smarter approach. That integrity is what builds trust.",
    author: "Riya Singh",
    role: "CEO",
    company: "EdPath Learning",
    rating: 5,
    tags: ["EdTech", "Web App"],
    result: "10K+ active learners",
  },
  {
    quote: "We were building our first mobile app and didn't know where to start. ArgosMob walked us through everything — from architecture to App Store submission. They were genuinely invested in our success.",
    author: "Saurabh Tiwari",
    role: "Founder",
    company: "QuickServ",
    rating: 5,
    tags: ["Mobile App", "Startup"],
    result: "MVP in 10 weeks",
  },
];

const metrics = [
  { icon: Star, value: "4.9/5", label: "Average Client Rating" },
  { icon: Users, value: "50+", label: "Satisfied Clients" },
  { icon: TrendingUp, value: "98%", label: "Repeat / Referral Rate" },
];

const videoTestimonials = [
  { name: "Rahul Sharma", company: "FreshCart India", role: "CEO" },
  { name: "Priya Mehta", company: "NexCRM", role: "Founder" },
  { name: "Vikram Nair", company: "MediBook Technologies", role: "CTO" },
];

export default function TestimonialsPage() {
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

      {/* Video testimonials placeholder */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader
              eyebrow="Video Stories"
              title="Hear It Directly"
              description="Video testimonials from founders and CTOs sharing their experience building with ArgosMob."
            />
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {videoTestimonials.map((v, i) => (
              <FadeIn key={v.name} delay={i * 0.1}>
                <div className="group relative rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 cursor-pointer">
                  <div className="h-44 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                      <PlayCircle size={28} className="text-white" />
                    </div>
                  </div>
                  <div className="p-5 bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {v.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{v.name}</p>
                        <p className="text-xs text-slate-500">{v.role}, {v.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Written Testimonials Grid */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader
              eyebrow="Written Reviews"
              title="What Clients Say"
            />
          </FadeIn>
          <StaggerContainer className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.07}>
            {testimonials.map((t) => (
              <StaggerItem key={t.author}>
                <div className="group relative bg-white rounded-2xl p-7 border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 flex flex-col h-full">
                  {/* Result badge */}
                  <div className="absolute top-5 right-5">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-semibold rounded-full">
                      {t.result}
                    </span>
                  </div>
                  <Quote size={24} className="text-blue-200 mb-4 flex-shrink-0" />
                  <p className="text-slate-600 text-sm leading-relaxed flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
                  {/* Tags */}
                  <div className="flex gap-1.5 flex-wrap mt-4">
                    {t.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 pt-5 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {t.author.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm">{t.author}</p>
                      <p className="text-xs text-slate-500 truncate">{t.role}, {t.company}</p>
                    </div>
                    <div className="flex gap-0.5 flex-shrink-0">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <span key={i} className="text-amber-400 text-xs">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
