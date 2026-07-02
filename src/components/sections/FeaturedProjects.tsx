"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import InteractiveTile from "@/components/ui/InteractiveTile";
import { API_BASE_URL } from "@/lib/utils";

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
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/projects`);
        if (!res.ok) throw new Error(`API responded ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Unexpected API response shape");
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
        setError(true);
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

  // Nothing featured — hide the section rather than showing a heading over nothing
  if (!loading && !error && projects.length === 0) return null;

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
            className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
          >
            View all projects
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Cards — skeleton while loading, visible notice on failure */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5" aria-hidden="true">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-[480px] rounded-[32px] border border-slate-100 bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto text-center rounded-2xl border border-slate-200 bg-white/80 px-8 py-12">
            <p className="font-semibold text-slate-900 mb-1">We couldn&apos;t load our featured projects right now.</p>
            <p className="text-sm text-slate-500">Please refresh the page to try again.</p>
          </div>
        ) : (
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
                          <a
                            href={getExternalUrl(project.live_url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${project.title} live site`}
                            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-blue-600"
                          >
                             <ExternalLink size={16} />
                          </a>
                        )
                      }
                      footer={
                        <div className="flex flex-wrap gap-2">
                          {project.tech_stack?.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-lg text-xs font-bold"
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
        )}
      </div>
    </section>
  );
}
