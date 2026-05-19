"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import InteractiveTile from "@/components/ui/InteractiveTile";

type Project = {
  id: string;
  title: string;
  category: string;
  short_description: string;
  tech_stack: string[];
  thumbnail: string;
  is_featured: boolean;
  live_url?: string;
  accent?: string;
  gradient?: string;
};

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/projects");
        const data = await res.json();
        // Filter featured projects and add visual properties
        const featured = data
          .filter((p: any) => p.is_featured)
          .slice(0, 3)
          .map((p: any, i: number) => ({
            ...p,
            accent: i === 0 ? "#60a5fa" : i === 1 ? "#4ade80" : "#a78bfa",
            gradient: i === 0 
              ? "linear-gradient(135deg, #1e3a5f 0%, #1e40af 50%, #1d4ed8 100%)" 
              : i === 1 
                ? "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)" 
                : "linear-gradient(135deg, #3b0764 0%, #4c1d95 50%, #5b21b6 100%)"
          }));
        setProjects(featured);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getExternalUrl = (url: string) => {
    if (!url) return "#";
    return url.startsWith('http') ? url : `https://${url}`;
  };

  if (loading) return (
    <div className="section-padding flex justify-center items-center h-64">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <section className="section-padding" style={{ background: "#ffffff" }}>
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="eyebrow-light mb-4">Our Work</div>
            <h2 className="text-section-title font-display text-slate-900">
              Products We&apos;re{" "}
              <span className="gradient-text">Proud Of</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="flex-shrink-0 inline-flex items-center gap-2 text-[13.5px] font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
          >
            View all projects
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              className="relative"
            >
                    <InteractiveTile
                      image={project.thumbnail}
                      title={project.title}
                      subtitle={project.category}
                      description={project.short_description}
                      objectFit="object-cover"
                      imageHeight="h-[400px]"
                      topRight={
                        project.live_url && (
                          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                             <ExternalLink size={16} />
                          </div>
                        )
                      }
                      footer={
                        <div className="flex flex-wrap gap-2">
                          {project.tech_stack?.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-bold"
                              style={{
                                color: project.accent,
                                background: `${project.accent}12`,
                                border: `1px solid ${project.accent}20`,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      }
                    />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
