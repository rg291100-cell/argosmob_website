"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Shield, TrendingUp } from "lucide-react";

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 6 + 5,
}));

const METRICS = [
  { label: "Revenue", value: "₹2.4M", color: "#4ade80", bar: 78 },
  { label: "Users",   value: "18.2K", color: "#60a5fa", bar: 62 },
  { label: "Uptime",  value: "99.9%", color: "#a78bfa", bar: 95 },
];

const ACTIVITY = [
  { text: "AI pipeline deployed", time: "2s ago", dot: "#4ade80" },
  { text: "New enterprise client", time: "1m ago", dot: "#60a5fa" },
  { text: "Performance +42%",    time: "5m ago", dot: "#f59e0b" },
];

const BAR_DATA = [38, 55, 42, 68, 52, 80, 72, 90, 62, 78, 94, 88];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mounted, setMounted] = useState(false);
  const [particleCount, setParticleCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const springX = useSpring(mouseX, { damping: 35, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 35, stiffness: 120 });

  const glowX = useTransform(springX, [-0.5, 0.5], ["-10%", "10%"]);
  const glowY = useTransform(springY, [-0.5, 0.5], ["-10%", "10%"]);

  const cardRotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const cardRotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  useEffect(() => {
    setMounted(true);
    // Fewer animated particles on small screens — they're pure decoration
    setParticleCount(window.matchMedia("(max-width: 768px)").matches ? 10 : 28);
    const el = containerRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      mouseX.set((e.clientX - left) / width - 0.5);
      mouseY.set((e.clientY - top) / height - 0.5);
    };
    el.addEventListener("mousemove", handleMove, { passive: true });
    return () => el.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #05101f 0%, #0a1628 50%, #0d1f3c 100%)" }}
    >
      {/* ── LAYERED BACKGROUNDS ── */}

      {/* Cinematic AI Image Background with Slow Parallax/Pan */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 0.35, x: ["-1%", "1%", "-1%"], y: ["-1%", "1%", "-1%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear", opacity: { duration: 2 } }}
        style={{
          backgroundImage: "url('/images/ai-renders/hero-dashboard.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "contrast(1.1) saturate(1.2)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Deep radial glow (mouse-reactive) */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0.05) 40%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Secondary accent glow */}
      <div
        className="absolute top-[15%] right-[10%] w-[600px] h-[600px] rounded-full pointer-events-none animate-pulse-glow z-0"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }}
      />

      {/* Fine grid */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none z-0" />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Floating particles */}
      {mounted && !shouldReduceMotion && PARTICLES.slice(0, particleCount).map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `rgba(${p.id % 3 === 0 ? "96,165,250" : p.id % 3 === 1 ? "99,102,241" : "167,139,250"},${Math.random() * 0.4 + 0.2})`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* ── LEFT: COPY ── */}
          <div>
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 mb-8"
            >
              <div className="eyebrow-dark">
                <Sparkles size={10} className="text-blue-400" />
                Mobile · Web · AI Solutions
              </div>
              <div className="status-live text-xs">Live</div>
            </motion.div>

            {/* Headline */}
            <div className="mb-7 overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-bold leading-[1.02] tracking-[-0.035em]"
                style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
              >
                <span className="block text-white">We Engineer</span>
                <span className="block gradient-text-blue-silver">Digital Products</span>
                <span className="block text-white">That Scale.</span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg leading-[1.75] text-slate-400 max-w-lg mb-10"
            >
              ArgosMob Tech & AI crafts premium mobile apps, web platforms, and intelligent
              AI systems for startups and enterprises that demand{" "}
              <span className="text-blue-300 font-medium">excellence</span>.
            </motion.p>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.54 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              {[
                { icon: Zap, text: "AI-Powered" },
                { icon: Shield, text: "Enterprise Ready" },
                { icon: TrendingUp, text: "Results Driven" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-slate-400">
                  <div className="w-5 h-5 rounded-md bg-blue-500/15 flex items-center justify-center">
                    <Icon size={11} className="text-blue-400" />
                  </div>
                  {text}
                </div>
              ))}
            </motion.div>

            {/* CTAs — stats live in StatsSection directly below the hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/contact" className="btn-primary btn-magnetic group">
                Start Your Project
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link href="/portfolio" className="btn-secondary btn-magnetic">
                View Our Work
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT: 3D DASHBOARD ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block relative"
            style={{ perspective: "1200px" }}
          >
            {/* Main dashboard card */}
            <motion.div
              style={{ rotateX: cardRotateX, rotateY: cardRotateY, transformStyle: "preserve-3d" }}
              className="relative rounded-2xl overflow-hidden light-sweep"
              transition={{ type: "spring", damping: 40, stiffness: 200 }}
            >
              {/* Card surface */}
              <div
                className="rounded-2xl p-5 border"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  borderColor: "rgba(255,255,255,0.1)",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                {/* Browser bar */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                    <div className="w-3 h-3 rounded-full bg-green-400/70" />
                  </div>
                  <div className="flex-1 h-6 rounded-lg bg-white/5 px-3 flex items-center border border-white/5">
                    <span className="text-[10px] text-slate-500">argosmob.com/dashboard</span>
                  </div>
                </div>

                {/* Metric cards */}
                <div className="grid grid-cols-3 gap-2.5 mb-3">
                  {METRICS.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl p-3 border border-white/5"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                      <p className="text-[9px] text-slate-500 mb-1 uppercase tracking-wider">{m.label}</p>
                      <p className="font-bold text-sm" style={{ color: m.color }}>{m.value}</p>
                      <div className="mt-1.5 h-[2px] bg-white/8 rounded-full">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${m.bar}%`, background: m.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div className="rounded-xl p-4 mb-3 border border-white/5" style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[9px] text-slate-500 uppercase tracking-wider">Monthly Growth</p>
                    <span className="text-[9px] text-green-400 font-medium">↑ 24.3%</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-16">
                    {BAR_DATA.map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.8 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 rounded-sm"
                        style={{
                          background: `linear-gradient(to top, rgba(37,99,235,0.8), rgba(96,165,250,0.6))`,
                          minHeight: "2px",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Activity */}
                <div className="space-y-2">
                  {ACTIVITY.map((a, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
                      className="flex items-center gap-2.5 py-1"
                    >
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: a.dot }} />
                      <span className="text-xs text-slate-400 flex-1">{a.text}</span>
                      <span className="text-[10px] text-slate-600">{a.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating card — AI badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 w-48 rounded-xl p-3.5 border"
              style={{
                background: "rgba(10,22,40,0.85)",
                backdropFilter: "blur(20px)",
                borderColor: "rgba(37,99,235,0.3)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(37,99,235,0.1)",
              }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold shadow-lg shadow-blue-700/40">
                  AI
                </div>
                <div>
                  <p className="text-xs text-white font-semibold">AI Integration</p>
                  <p className="text-[9px] text-slate-400">Active pipeline</p>
                </div>
              </div>
              <div className="h-[2px] bg-white/8 rounded-full mb-1.5">
                <motion.div
                  className="h-full rounded-full bg-blue-500"
                  animate={{ width: ["60%", "85%", "60%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <p className="text-[9px] text-blue-400">Processing 1.2k req/s</p>
            </motion.div>

            {/* Floating card — Live sessions */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-8 w-44 rounded-xl p-3.5 border"
              style={{
                background: "rgba(10,22,40,0.85)",
                backdropFilter: "blur(20px)",
                borderColor: "rgba(74,222,128,0.2)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(74,222,128,0.08)",
              }}
            >
              <div className="status-live mb-1">Live</div>
              <p className="text-sm text-white font-bold">42 sessions</p>
              <p className="text-[10px] text-slate-400 mt-0.5">↑ 18% this hour</p>
            </motion.div>

            {/* Decorative glow ring */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.12) 0%, transparent 70%)",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-slate-700 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1 h-1.5 bg-blue-500 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Bottom fade to white */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.04))" }}
      />
    </section>
  );
}
