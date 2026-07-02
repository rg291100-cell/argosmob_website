"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { API_BASE_URL } from "@/lib/utils";

type TechItem = {
  id: string;
  name: string;
  category: string;
  icon_url: string;
  is_active: boolean;
};

type TechItemSummary = { name: string; icon_url: string };

type TechGroup = {
  label: string;
  color: string;
  items: TechItemSummary[];
};

const categoryColors: Record<string, string> = {
  Frontend: "#2563eb",
  Backend: "#6366f1",
  "AI & ML": "#8b5cf6",
  "Cloud & DevOps": "#0ea5e9",
  Database: "#10b981",
  Mobile: "#ec4899",
};

export default function TechPreview() {
  const [techGroups, setTechGroups] = useState<TechGroup[]>([]);
  const [active, setActive] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTech = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/tech-stack`);
        if (!res.ok) throw new Error(`API responded ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Unexpected API response shape");
        
        // Group by category
        const groups: Record<string, TechItemSummary[]> = {};
        data.forEach((t: any) => {
          if (!groups[t.category]) groups[t.category] = [];
          groups[t.category].push({ name: t.name, icon_url: t.icon_url });
        });

        const formatted = Object.entries(groups).map(([label, items]) => ({
          label,
          color: categoryColors[label] || "#64748b",
          items: items.slice(0, 9)
        }));

        setTechGroups(formatted);
      } catch (error) {
        console.error("Error fetching tech stack:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTech();
  }, []);

  if (!loading && !error && techGroups.length === 0) return null;

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f8faff 0%, #ffffff 100%)" }}
    >
      <div className="container-xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow-light mx-auto mb-5"
          >
            Tech Stack
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-section-title font-display text-slate-900 mb-5"
          >
            Modern Tools.{" "}
            <span className="gradient-text">Enterprise Grade.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            Battle-tested technologies that power the world&apos;s best products —
            chosen for performance, reliability, and developer experience.
          </motion.p>
        </div>

        {loading ? (
          <div className="grid lg:grid-cols-5 gap-8 items-start" aria-hidden="true">
            <div className="lg:col-span-2 flex flex-row lg:flex-col gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-full h-[52px] rounded-xl bg-slate-100 animate-pulse" />
              ))}
            </div>
            <div className="lg:col-span-3 h-[440px] rounded-2xl border border-slate-100 bg-slate-100 animate-pulse" />
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto text-center rounded-2xl border border-slate-200 bg-white/80 px-8 py-12">
            <p className="font-semibold text-slate-900 mb-1">We couldn&apos;t load our tech stack right now.</p>
            <p className="text-sm text-slate-500">Please refresh the page to try again.</p>
          </div>
        ) : (
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Tab selector */}
          <div className="lg:col-span-2 flex flex-row lg:flex-col gap-2">
            {techGroups.map((group, i) => (
              <motion.button
                key={group.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setActive(i)}
                className="relative w-full flex items-center gap-3 px-5 py-4 rounded-xl text-left transition-all duration-250"
                style={{
                  background: active === i ? `${group.color}08` : "transparent",
                  border: active === i ? `1px solid ${group.color}25` : "1px solid transparent",
                  boxShadow: active === i ? `0 4px 20px ${group.color}12` : "none",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-250"
                  style={{
                    background: active === i ? group.color : "#cbd5e1",
                    boxShadow: active === i ? `0 0 8px ${group.color}60` : "none",
                  }}
                />
                <span
                  className="font-semibold text-sm transition-colors duration-250"
                  style={{ color: active === i ? group.color : "#64748b" }}
                >
                  {group.label}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Tech items panel */}
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 rounded-2xl p-6 border"
            style={{
              background: "rgba(255,255,255,0.9)",
              borderColor: `${techGroups[active].color}20`,
              boxShadow: `0 4px 24px ${techGroups[active].color}08`,
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider"
                style={{ color: techGroups[active].color, background: `${techGroups[active].color}12` }}
              >
                {techGroups[active].label}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {techGroups[active].items.map((item, j) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: j * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col items-center justify-center h-48 rounded-2xl border transition-all duration-300 cursor-default bg-white overflow-hidden shadow-sm hover:shadow-md"
                  style={{
                    borderColor: "rgba(226,232,240,0.8)",
                  }}
                  whileHover={{
                    borderColor: `${techGroups[active].color}40`,
                    scale: 1.02,
                  }}
                >
                  <div className="w-full h-[75%] flex items-center justify-center p-6 bg-white transition-colors">
                    {item.icon_url ? (
                      <Image src={item.icon_url} alt={item.name} width={160} height={160} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 remove-checkerboard" />
                    ) : (
                      <div
                        className="w-12 h-12 rounded-full opacity-20"
                        style={{ background: techGroups[active].color }}
                      />
                    )}
                  </div>
                  <div className="w-full h-[25%] flex items-center justify-center px-4 border-t border-slate-100">
                    <span className="text-sm font-bold text-slate-700 text-center line-clamp-1">{item.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
            <Link
              href="/tech-stack"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
            >
              See the full tech stack
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
