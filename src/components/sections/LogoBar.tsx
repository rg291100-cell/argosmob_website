"use client";

import { motion } from "framer-motion";

const industries = [
  "HealthTech", "FinTech", "E-Commerce", "EdTech", "Logistics",
  "Real Estate", "SaaS", "Retail", "Hospitality", "AgriTech",
];

export default function LogoBar() {
  return (
    <section className="py-10 border-y border-slate-100 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8">
          Trusted by businesses across industries
        </p>
        <div className="relative flex overflow-hidden">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
          {/* Scrolling track */}
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="flex gap-8 items-center flex-shrink-0"
          >
            {[...industries, ...industries].map((name, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-6 py-3 bg-white rounded-xl border border-slate-200 shadow-sm"
              >
                <span className="text-sm font-semibold text-slate-500">{name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
