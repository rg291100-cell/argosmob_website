"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";

const projects = [
  {
    title: "FreshCart — Grocery Delivery App",
    category: "Mobile App",
    description: "A full-stack React Native grocery delivery app with real-time tracking, slot-based delivery, and AI-powered product recommendations.",
    tags: ["React Native", "Node.js", "Firebase", "AI"],
    color: "from-emerald-600 to-teal-700",
    metric: "200K+ downloads",
  },
  {
    title: "NexCRM — AI Sales Dashboard",
    category: "SaaS Platform",
    description: "An intelligent CRM with GPT-powered lead scoring, automated follow-ups, and predictive revenue forecasting for B2B sales teams.",
    tags: ["Next.js", "PostgreSQL", "OpenAI", "AWS"],
    color: "from-blue-600 to-indigo-700",
    metric: "₹1.2Cr ARR",
  },
  {
    title: "MediBook — Healthcare Booking",
    category: "Healthcare App",
    description: "HIPAA-compliant telemedicine and appointment booking platform serving 40+ hospitals with integrated EMR and video consultation.",
    tags: ["React Native", "Supabase", "WebRTC", "Node.js"],
    color: "from-violet-600 to-purple-700",
    metric: "40+ hospitals",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-14">
            <SectionHeader
              eyebrow="Our Work"
              title="Products We're Proud Of"
              description="A selection of real-world products we&apos;ve shipped."
              align="left"
            />
            <Link
              href="/portfolio"
              className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              View all projects <ArrowRight size={15} />
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.12}>
              <div className="group rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-slate-100 hover:border-slate-300 transition-all duration-300 h-full flex flex-col">
                {/* Gradient header */}
                <div className={`relative h-44 bg-gradient-to-br ${project.color} p-6 overflow-hidden`}>
                  <div className="absolute inset-0 grid-pattern opacity-20" />
                  <span className="relative z-10 inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">
                    {project.category}
                  </span>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <ExternalLink size={14} className="text-white" />
                    </div>
                  </div>
                  {/* Metric badge */}
                  <div className="absolute bottom-4 left-6">
                    <span className="text-white/90 text-xs font-medium bg-white/10 px-2.5 py-1 rounded-full">
                      {project.metric}
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-slate-900 mb-3 leading-snug">{project.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
