"use client";

import { motion } from "framer-motion";

const industries = [
  "HealthTech", "FinTech", "E-Commerce", "EdTech", "Logistics",
  "Real Estate", "SaaS", "Retail", "Hospitality", "AgriTech",
];

export default function LogoBar() {
  return (
    <section className="py-12 overflow-hidden" style={{ background: "linear-gradient(180deg, #f8faff 0%, #ffffff 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          Trusted by businesses across industries
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#f8faff] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#f8faff] to-transparent z-10 pointer-events-none" />

        {/* Track */}
        <motion.div
          animate={{ x: [0, -1400] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex gap-4 items-center flex-shrink-0"
        >
          {[...industries, ...industries, ...industries].map((name, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-6 py-2.5 rounded-full border transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.9)",
                borderColor: "rgba(226,232,240,0.8)",
                boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
              }}
            >
              <span className="text-[12.5px] font-semibold text-slate-500 whitespace-nowrap">{name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
