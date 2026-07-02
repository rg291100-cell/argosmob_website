"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { API_BASE_URL } from "@/lib/utils";

type Testimonial = {
  id: string;
  client_name: string;
  designation: string;
  company: string;
  content: string;
  rating: number;
  image_url: string;
  initials: string;
  color: string;
};

export default function TestimonialsPreview() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/testimonials`);
        if (!res.ok) throw new Error(`API responded ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Unexpected API response shape");
        const colors = ["#2563eb", "#6366f1", "#8b5cf6", "#ec4899", "#f59e0b"];
        const formatted = data.map((t: any, i: number) => ({
          ...t,
          initials: t.client_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2),
          color: colors[i % colors.length]
        }));
        setTestimonials(formatted);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    // Auto-advance pauses while the reader is hovering or focused inside (WCAG 2.2.2)
    if (testimonials.length > 0 && !paused) {
      const t = setInterval(() => {
        setDir(1);
        setCurrent((c) => (c + 1) % testimonials.length);
      }, 5500);
      return () => clearInterval(t);
    }
  }, [testimonials, paused]);

  if (!loading && !error && testimonials.length === 0) return null;

  const go = (next: number) => {
    setDir(next > current ? 1 : -1);
    setCurrent(next);
  };

  const t = testimonials[current];

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8faff 100%)" }}
    >
      {/* Background accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.03) 0%, transparent 70%)" }}
      />

      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="eyebrow-light mb-4">Client Stories</div>
            <h2 className="text-section-title font-display text-slate-900">
              What Our Clients{" "}
              <span className="gradient-text">Say</span>
            </h2>
          </div>
          <Link
            href="/testimonials"
            className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
          >
            Read all stories
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Featured testimonial — skeleton while loading, visible notice on failure */}
        {loading ? (
          <div className="grid lg:grid-cols-3 gap-6" aria-hidden="true">
            <div className="lg:col-span-2 h-[420px] rounded-2xl border border-slate-100 bg-slate-100 animate-pulse" />
            <div className="flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-[128px] rounded-xl border border-slate-100 bg-slate-100 animate-pulse" />
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto text-center rounded-2xl border border-slate-200 bg-white/80 px-8 py-12">
            <p className="font-semibold text-slate-900 mb-1">We couldn&apos;t load client stories right now.</p>
            <p className="text-sm text-slate-500">Please refresh the page to try again.</p>
          </div>
        ) : (
        <div
          className="grid lg:grid-cols-3 gap-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* Large feature card */}
          <div
            className="lg:col-span-2 relative rounded-2xl p-8 md:p-10 overflow-hidden border"
            style={{
              background: `linear-gradient(135deg, ${t.color}08 0%, rgba(255,255,255,0.9) 100%)`,
              borderColor: `${t.color}20`,
              boxShadow: `0 8px 40px ${t.color}10`,
            }}
          >
            {/* Large quote mark */}
            <div
              className="absolute top-6 right-8 text-[120px] font-bold leading-none opacity-[0.05] select-none font-display"
              style={{ color: t.color }}
            >
              &ldquo;
            </div>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={current}
                custom={dir}
                initial={{ opacity: 0, x: dir * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -30 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} fill={t.color} color={t.color} />
                  ))}
                </div>

                <p className="text-lg text-slate-700 leading-[1.8] mb-8 italic">
                  &ldquo;{t.content}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-base flex-shrink-0 overflow-hidden border-2 border-white"
                    style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)`, boxShadow: `0 4px 16px ${t.color}40` }}
                  >
                    {t.image_url ? <img src={t.image_url} alt={t.client_name} className="w-full h-full object-cover" /> : t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{t.client_name}</p>
                    <p className="text-sm text-slate-500">{t.designation} {t.company && `@ ${t.company}`}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-3 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
                  aria-current={i === current ? "true" : undefined}
                  className="transition-all duration-300"
                  style={{
                    width: i === current ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === current ? t.color : "#e2e8f0",
                  }}
                />
              ))}
              <div className="ml-auto flex gap-2">
                <button
                  onClick={() => go((current - 1 + testimonials.length) % testimonials.length)}
                  aria-label="Previous testimonial"
                  className="w-9 h-9 rounded-full border flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all"
                  style={{ borderColor: "rgba(226,232,240,0.8)" }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => go((current + 1) % testimonials.length)}
                  aria-label="Next testimonial"
                  className="w-9 h-9 rounded-full border flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all"
                  style={{ borderColor: "rgba(226,232,240,0.8)" }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar — other testimonials */}
          <div className="flex flex-col gap-4">
            {testimonials.map((tm, i) => (
              <motion.button
                key={tm.id}
                onClick={() => go(i)}
                whileHover={{ x: 4 }}
                className="text-left rounded-xl p-5 border transition-all duration-250"
                style={{
                  background: i === current ? `${tm.color}06` : "rgba(255,255,255,0.8)",
                  borderColor: i === current ? `${tm.color}25` : "rgba(226,232,240,0.7)",
                  boxShadow: i === current ? `0 4px 20px ${tm.color}10` : "none",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0 overflow-hidden border border-white shadow-sm"
                    style={{ background: `linear-gradient(135deg, ${tm.color}, ${tm.color}bb)` }}
                  >
                    {tm.image_url ? <img src={tm.image_url} alt={tm.client_name} className="w-full h-full object-cover" /> : tm.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{tm.client_name}</p>
                    <p className="text-xs text-slate-500 line-clamp-1">{tm.designation} {tm.company && `@ ${tm.company}`}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 italic">&ldquo;{tm.content}&rdquo;</p>
              </motion.button>
            ))}
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
