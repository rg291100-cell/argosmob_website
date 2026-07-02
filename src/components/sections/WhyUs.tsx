"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Users, TrendingUp, Code2, HeartHandshake, CheckCircle2 } from "lucide-react";

const reasons = [
  { icon: Code2,          title: "Engineering-First",      description: "Clean architecture, scalable patterns. We build for the long-term, not just the demo.", color: "#2563eb" },
  { icon: Clock,          title: "On-Time, Every Time",    description: "Agile sprints with predictable delivery. No surprises — just consistent, quality output.", color: "#6366f1" },
  { icon: Shield,         title: "Security by Default",    description: "Data protection and compliance-ready architecture are standard from day one.", color: "#0ea5e9" },
  { icon: Users,          title: "Dedicated Team Model",   description: "PM, designer, and engineers fully embedded into your vision — not shared resources.", color: "#8b5cf6" },
  { icon: TrendingUp,     title: "Growth-Oriented Builds", description: "What works at 100 users scales confidently to 100,000. We architect for growth.", color: "#10b981" },
  { icon: HeartHandshake, title: "Long-Term Partnership",  description: "We become your technology partner — supporting, evolving, and owning your product's success.", color: "#f59e0b" },
];

const bullets = [
  "Full transparency throughout development",
  "Weekly progress demos & retrospectives",
  "Source code ownership — always yours",
];

export default function WhyUs() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8faff 100%)" }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }}
      />

      <div className="container-xl">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="eyebrow-light mb-6">Why ArgosMob</div>
            <h2 className="text-section-title font-display text-slate-900 leading-tight mb-6">
              Built Different.{" "}
              <br />
              <span className="gradient-text">Delivered Better.</span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed mb-9">
              We&apos;re not a body-shop or a template factory. We are product engineers
              who take ownership of every pixel and every function we ship.
            </p>
            <div className="space-y-4 mb-10">
              {bullets.map((point, i) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 size={17} className="text-blue-600 flex-shrink-0" />
                  <span className="text-slate-600 text-sm">{point}</span>
                </motion.div>
              ))}
            </div>

            {/* Trust bar */}
            <div className="flex items-center gap-4 flex-wrap">
              {[
                { label: "NDA Protected" },
                { label: "IP Ownership" },
                { label: "24h Support" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-blue-700 border border-blue-100"
                  style={{ background: "rgba(37,99,235,0.05)" }}
                >
                  {badge.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((reason, i) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                  className="group p-5 rounded-2xl border cursor-default overflow-hidden relative"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    borderColor: "rgba(226,232,240,0.7)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none"
                    style={{ background: `radial-gradient(circle at 20% 20%, ${reason.color}08 0%, transparent 60%)` }}
                  />

                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3.5 transition-all duration-300"
                    style={{
                      background: `${reason.color}12`,
                    }}
                  >
                    <Icon size={18} style={{ color: reason.color }} />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm mb-1.5">{reason.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{reason.description}</p>

                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: `linear-gradient(90deg, transparent, ${reason.color}, transparent)` }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
