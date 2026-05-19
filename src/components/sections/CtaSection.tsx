"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

export default function CtaSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #05101f 0%, #0a1628 50%, #0d1f3c 100%)",
        padding: "7rem 0",
      }}
    >
      {/* Cinematic AI Image Background with Slow Parallax/Pan */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1.05, opacity: 0.12, x: ["-1%", "1%", "-1%"], y: ["1%", "-1%", "1%"] }}
        viewport={{ once: true }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear", opacity: { duration: 2 } }}
        style={{
          backgroundImage: "url('/images/ai-renders/cloud-infra.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "screen",
        }}
      />

      {/* Layered backgrounds */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, rgba(37,99,235,0.04) 50%, transparent 70%)" }}
      />
      <div
        className="absolute top-0 left-1/4 w-[400px] h-[300px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)" }}
      />
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none z-0" />

      {/* Animated glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <div className="eyebrow-dark mx-auto mb-7">
            <Sparkles size={10} />
            Ready to build?
          </div>

          {/* Headline */}
          <h2 className="font-display font-bold text-white mb-6 tracking-tight" style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", lineHeight: 1.05 }}>
            Your Next Product Deserves
            <span className="block gradient-text-premium">the Best Team.</span>
          </h2>

          {/* Subtext */}
          <p className="text-[1.0625rem] text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Tell us about your project. We&apos;ll get back within 24 hours
            with a clear, no-obligation proposal.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link href="/contact" className="btn-primary btn-magnetic group">
              Start a Conversation
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://wa.me/917042603342"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-magnetic"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              "Greater Noida, India",
              "Response within 24h",
              "Free consultation",
              "NDA on request",
            ].map((item, i) => (
              <div key={item} className="flex items-center gap-2 text-[12px] text-slate-500">
                {i > 0 && <span className="w-1 h-1 rounded-full bg-slate-700" />}
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(5,16,31,0.5))" }}
      />
    </section>
  );
}
