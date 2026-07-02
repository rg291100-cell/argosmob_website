"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Globe, Brain, Zap, Database, Palette, Cloud, Package, Cpu, Code, Server, Layout, Shield, BarChart3, MessageSquare } from "lucide-react";
import { API_BASE_URL } from "@/lib/utils";
import Button from "@/components/ui/Button";

const iconMap: Record<string, any> = {
  Smartphone, Globe, Brain, Zap, Database, Palette, Cloud, Package, Cpu, Code, Server, Layout, Shield, BarChart3, MessageSquare
};

type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  is_active: boolean;
  order_index: number;
  color?: string;
  tag?: string;
};

export default function ServicesOverview() {
  const [services, setServices] = useState<Service[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/services`);
        if (!res.ok) throw new Error(`API responded ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Unexpected API response shape");
        const colors = ["#2563eb", "#6366f1", "#8b5cf6", "#0ea5e9", "#10b981", "#f59e0b", "#ec4899", "#06b6d4"];
        const formatted = data
          .filter((s: any) => s.is_active)
          .map((s: any, i: number) => ({
            ...s,
            color: colors[i % colors.length],
            tag: s.title.split(' ')[0]
          }));
        setServices(formatted);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Nothing published — hide the section rather than showing a heading over nothing
  if (!loading && !error && services.length === 0) return null;

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "linear-gradient(180deg, #f8faff 0%, #ffffff 100%)" }}>
      {/* Cinematic AI Image Background with Slow Parallax/Pan */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1.05, opacity: 0.04, x: ["1%", "-1%", "1%"], y: ["-1%", "1%", "-1%"] }}
        viewport={{ once: true }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear", opacity: { duration: 2 } }}
        style={{
          backgroundImage: "url('/images/ai-renders/app-dev.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "multiply",
        }}
      />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow-light mx-auto mb-5"
          >
            What We Build
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-section-title font-display text-slate-900 mb-5"
          >
            Services Built for{" "}
            <span className="gradient-text">Real Business Outcomes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            We don't just write code — we solve problems. Every service we offer is
            designed to create measurable impact for your business.
          </motion.p>
        </div>

        {/* Grid — skeleton while loading, visible notice on failure */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 rounded-2xl border border-slate-100 bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto text-center rounded-2xl border border-slate-200 bg-white/80 px-8 py-12">
            <p className="font-semibold text-slate-900 mb-1">We couldn&apos;t load our services right now.</p>
            <p className="text-sm text-slate-500">Please refresh the page to try again.</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Zap;
            const isHovered = hovered === i;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                className="group relative rounded-2xl border p-6 cursor-default overflow-hidden transition-all duration-400"
                style={{
                  background: isHovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.85)",
                  borderColor: isHovered ? `${service.color}30` : "rgba(226,232,240,0.8)",
                  transform: isHovered ? "translateY(-5px)" : "translateY(0px)",
                  boxShadow: isHovered
                    ? `0 24px 48px ${service.color}15, 0 4px 12px rgba(0,0,0,0.06), 0 0 0 1px ${service.color}20`
                    : "0 2px 12px rgba(0,0,0,0.04)",
                  transition: "all 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
                }}
              >
                {/* BG glow */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 pointer-events-none rounded-2xl"
                      style={{ background: `radial-gradient(circle at 30% 20%, ${service.color}08 0%, transparent 60%)` }}
                    />
                  )}
                </AnimatePresence>

                {/* Tag */}
                <div
                  className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ color: service.color, background: `${service.color}12` }}
                >
                  {service.tag}
                </div>

                {/* Icon */}
                <div
                  className="relative inline-flex p-5 rounded-2xl mb-5 transition-all duration-300 shadow-sm"
                  style={{
                    background: isHovered
                      ? `linear-gradient(135deg, ${service.color}, ${service.color}cc)`
                      : `${service.color}12`,
                    boxShadow: isHovered ? `0 8px 24px ${service.color}35` : "none",
                  }}
                >
                  <Icon
                    size={28}
                    style={{ color: isHovered ? "white" : service.color }}
                    className="transition-colors duration-300"
                  />
                </div>

                <h3 className="font-semibold text-slate-900 mb-2 leading-tight text-sm">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">{service.description}</p>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
                    opacity: isHovered ? 1 : 0,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
        )}

        {/* CTA */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Button href="/services" variant="outline" size="lg" arrow>
              Explore All Services
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
