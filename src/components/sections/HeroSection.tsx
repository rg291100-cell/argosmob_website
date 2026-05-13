"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";

const checks = ["Custom-built, not templated", "AI-powered solutions", "On-time delivery"];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
        {/* Grid */}
        <div className="absolute inset-0 grid-pattern opacity-40" />
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-3xl animate-pulse-slow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/50 border border-blue-800/60 text-blue-300 text-xs font-semibold uppercase tracking-widest mb-7"
            >
              <Sparkles size={12} className="text-blue-400" />
              Mobile · Web · AI Solutions
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-bold leading-[1.08] tracking-tight text-white mb-6"
            >
              We Build
              <span className="block gradient-text-white">Digital Products</span>
              <span className="block text-white">That Scale.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-lg text-slate-400 leading-relaxed max-w-lg mb-8"
            >
              ArgosMob Tech & AI crafts premium mobile apps, web platforms, and intelligent AI systems for startups and enterprises that demand excellence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {checks.map((c) => (
                <div key={c} className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle size={15} className="text-blue-400" />
                  {c}
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-7 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/40 hover:shadow-blue-600/40 hover:shadow-xl active:scale-95"
              >
                Start Your Project
                <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-7 py-4 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold rounded-xl transition-all duration-200 hover:bg-white/5 active:scale-95"
              >
                View Our Work
              </Link>
            </motion.div>
          </div>

          {/* Right — UI Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              {/* Main card */}
              <div className="glass rounded-2xl p-5 border border-white/10 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <div className="w-3 h-3 rounded-full bg-green-400/70" />
                  <div className="ml-2 flex-1 h-6 rounded-md bg-white/5 px-3 flex items-center">
                    <span className="text-[10px] text-slate-500">argosmob.com/dashboard</span>
                  </div>
                </div>
                {/* Dashboard mockup */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Revenue", value: "₹2.4M", color: "text-green-400" },
                    { label: "Users", value: "18.2K", color: "text-blue-400" },
                    { label: "Uptime", value: "99.9%", color: "text-purple-400" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/5 rounded-xl p-3">
                      <p className="text-[10px] text-slate-500 mb-1">{stat.label}</p>
                      <p className={`font-bold text-sm ${stat.color}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>
                {/* Chart bars */}
                <div className="bg-white/5 rounded-xl p-4 mb-3">
                  <p className="text-[10px] text-slate-500 mb-3">Monthly Growth</p>
                  <div className="flex items-end gap-2 h-20">
                    {[40, 60, 45, 70, 55, 85, 75, 90, 65, 80, 95, 88].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-blue-500/40 hover:bg-blue-500/70 transition-colors"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                {/* Activity list */}
                <div className="space-y-2">
                  {["AI automation deployed", "New user milestone", "Performance optimized"].map((item) => (
                    <div key={item} className="flex items-center gap-3 py-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      <span className="text-[11px] text-slate-400">{item}</span>
                      <span className="ml-auto text-[10px] text-slate-600">just now</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating cards */}
              <div className="animate-float absolute -top-8 -right-6 glass rounded-xl p-3 border border-white/10 shadow-xl w-44">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">AI</div>
                  <span className="text-[11px] text-white font-medium">AI Integration</span>
                </div>
                <p className="text-[10px] text-slate-400">Automation active</p>
                <div className="mt-2 h-1 bg-white/10 rounded-full">
                  <div className="h-1 w-3/4 bg-blue-500 rounded-full" />
                </div>
              </div>

              <div className="animate-float-delayed absolute -bottom-6 -left-6 glass rounded-xl p-3 border border-white/10 shadow-xl w-40">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-[11px] text-green-400 font-medium">Live</span>
                </div>
                <p className="text-[11px] text-white font-semibold">42 active sessions</p>
                <p className="text-[10px] text-slate-400 mt-0.5">↑ 18% this hour</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
