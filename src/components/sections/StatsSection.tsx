"use client";

import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 80,  suffix: "+", label: "Projects Delivered", description: "Across mobile, web & AI", accent: "#2563eb" },
  { value: 50,  suffix: "+", label: "Happy Clients",      description: "Startups to enterprises", accent: "#6366f1" },
  { value: 98,  suffix: "%", label: "Client Satisfaction", description: "Avg. 5-star rating",    accent: "#0ea5e9" },
  { value: 5,   suffix: "+", label: "Years Expertise",    description: "Building digital products", accent: "#8b5cf6" },
];

function CountUp({ to, suffix, accent }: { to: number; suffix: string; accent: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = 16;
    const increment = to / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, step);
    return () => clearInterval(timer);
  }, [isInView, to]);

  return (
    <span ref={ref} className="tabular-nums" style={{ color: accent }}>
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8faff 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="relative group p-6 lg:p-8 rounded-2xl border overflow-hidden cursor-default"
              style={{
                background: "rgba(255,255,255,0.9)",
                borderColor: "rgba(226,232,240,0.8)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
              }}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 0%, ${stat.accent}10 0%, transparent 70%)` }}
              />
              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-5 group-hover:opacity-10 transition-opacity"
                style={{ background: stat.accent }}
              />

              <p className="text-4xl lg:text-5xl font-bold mb-2 font-display tracking-tight">
                <CountUp to={stat.value} suffix={stat.suffix} accent={stat.accent} />
              </p>
              <p className="text-sm font-semibold text-slate-800 mb-1">{stat.label}</p>
              <p className="text-xs text-slate-500">{stat.description}</p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${stat.accent}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
