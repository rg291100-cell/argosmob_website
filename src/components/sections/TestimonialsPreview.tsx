import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";

const testimonials = [
  {
    quote: "ArgosMob completely transformed how we operate. The AI automation they built reduced our manual workload by 70%. Their team is exceptional — they think like product owners, not just developers.",
    author: "Rahul Sharma",
    role: "CEO, FreshCart India",
    rating: 5,
  },
  {
    quote: "We came to them with a complex SaaS idea and they delivered something beyond what we imagined. The attention to detail, the quality of code, and the design — everything was world-class.",
    author: "Priya Mehta",
    role: "Founder, NexCRM",
    rating: 5,
  },
  {
    quote: "After working with 3 agencies before ArgosMob, I can confidently say — there's a difference between people who write code and people who build products. ArgosMob builds products.",
    author: "Vikram Nair",
    role: "CTO, MediBook Technologies",
    rating: 5,
  },
];

export default function TestimonialsPreview() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-14">
            <SectionHeader
              eyebrow="Client Stories"
              title="What Our Clients Say"
              align="left"
            />
            <Link
              href="/testimonials"
              className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Read all stories <ArrowRight size={15} />
            </Link>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {testimonials.map((t) => (
            <StaggerItem key={t.author}>
              <div className="relative group bg-slate-50 hover:bg-white rounded-2xl p-7 border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 h-full flex flex-col">
                <Quote size={24} className="text-blue-200 mb-5 flex-shrink-0" />
                <p className="text-slate-600 text-sm leading-relaxed flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 pt-5 border-t border-slate-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{t.author}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
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
  );
}
