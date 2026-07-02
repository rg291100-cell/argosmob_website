"use client";

import { motion } from "framer-motion";

const steps = [
  { number: "01", title: "Discovery & Strategy",     description: "Deep understanding of your business, users, and goals. Every decision rooted in strategy, not assumption.", duration: "Week 1",    color: "#2563eb" },
  { number: "02", title: "Design & Prototyping",     description: "Pixel-perfect wireframes and interactive prototypes — validated with real users before a line of code is written.", duration: "Wk 2–3",   color: "#6366f1" },
  { number: "03", title: "Engineering & Build",      description: "Agile sprints with daily standups, weekly demos, and full transparency. You always know exactly where we are.", duration: "Wk 4–10",  color: "#8b5cf6" },
  { number: "04", title: "Testing & QA",             description: "Rigorous manual and automated testing across devices, browsers, and load scenarios ensures production readiness.", duration: "Wk 9–11",  color: "#0ea5e9" },
  { number: "05", title: "Launch & Deploy",          description: "Full deployment pipeline — CI/CD, cloud infrastructure, App Store submissions — and a flawless launch day.", duration: "Week 12",   color: "#10b981" },
  { number: "06", title: "Growth & Support",         description: "Post-launch: performance monitoring, feature iterations, and scaling. Your long-term technology partner.", duration: "Ongoing",   color: "#f59e0b" },
];

export default function ProcessSection() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #05101f 0%, #0a1628 60%, #0d1f3c 100%)" }}
    >
      {/* Cinematic AI Image Background with Slow Parallax/Pan */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1.05, opacity: 0.15, x: ["-1%", "1%", "-1%"], y: ["-1%", "1%", "-1%"] }}
        viewport={{ once: true }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear", opacity: { duration: 2 } }}
        style={{
          backgroundImage: "url('/images/ai-renders/ai-automation.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "screen",
        }}
      />

      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.1) 0%, transparent 70%)" }}
      />
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none z-0" />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow-dark mx-auto mb-5"
          >
            How We Work
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-section-title font-display text-white mb-5"
          >
            A Process Engineered{" "}
            <span className="gradient-text-white">for Results</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Transparency, precision, and accountability at every stage.
            No surprises — just exceptional output.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group relative p-7 rounded-2xl overflow-hidden cursor-default"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none"
                style={{ background: `radial-gradient(circle at 30% 30%, ${step.color}10 0%, transparent 65%)` }}
              />

              {/* Number + Duration row */}
              <div className="flex items-start justify-between mb-5">
                <span
                  className="text-[3.5rem] font-bold font-display leading-none select-none"
                  style={{ color: `${step.color}20` }}
                >
                  {step.number}
                </span>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full border"
                  style={{ color: step.color, background: `${step.color}12`, borderColor: `${step.color}25` }}
                >
                  {step.duration}
                </span>
              </div>

              {/* Left accent bar */}
              <div
                className="absolute left-0 top-8 bottom-8 w-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: `linear-gradient(to bottom, transparent, ${step.color}, transparent)` }}
              />

              <h3 className="text-base font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
