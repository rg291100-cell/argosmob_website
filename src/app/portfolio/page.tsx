"use client";

import { useState, useEffect } from "react";
import { ExternalLink, ArrowRight, Loader2, Filter } from "lucide-react";
import Link from "next/link";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import CtaSection from "@/components/sections/CtaSection";
import { cn } from "@/lib/utils";

const categories = ["All", "Mobile App", "SaaS Platform", "Web Platform", "AI System", "Healthcare App"];

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/projects");
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
          setFilteredProjects(data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((p: any) => p.category === activeCategory));
    }
  }, [activeCategory, projects]);
  
  const getExternalUrl = (url: string) => {
    if (!url) return "#";
    return url.startsWith('http') ? url : `https://${url}`;
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/8 blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/50 border border-blue-800 text-blue-300 text-xs font-semibold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Our Work
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              Products Built.
              <span className="block gradient-text-white">Results Delivered.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              A selection of digital products we&apos;ve engineered — each one built to solve a real problem, trusted by real users.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-[68px] z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            <div className="flex items-center gap-2 text-slate-400 mr-2 border-r border-slate-100 pr-4">
              <Filter size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Filter</span>
            </div>
            <div className="flex items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all duration-300",
                    activeCategory === cat 
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-slate-50/50 min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-2 border-blue-100" />
                <div className="absolute inset-0 rounded-full border-t-2 border-blue-600 animate-spin" />
              </div>
              <p className="text-slate-400 text-sm font-medium">Fetching portfolio...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-40 bg-white rounded-3xl border border-slate-200 border-dashed">
               <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Filter className="text-slate-300" size={24} />
               </div>
               <p className="text-slate-900 font-bold mb-1">No projects found</p>
               <p className="text-slate-500 text-sm">We couldn&apos;t find any projects matching your criteria.</p>
               <button 
                 onClick={() => setActiveCategory("All")}
                 className="mt-6 text-blue-600 text-sm font-bold hover:underline"
                >
                  Clear all filters
               </button>
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12" staggerDelay={0.1}>
              {filteredProjects.map((project: any, idx: number) => {
                const year = project.completion_date ? new Date(project.completion_date).getFullYear() : "2026";
                return (
                  <StaggerItem key={project.id}>
                    <div className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-3xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col h-full">
                      {/* Image Area */}
                      <div className="relative h-[300px] sm:h-[400px] overflow-hidden">
                        <img 
                          src={project.thumbnail} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                        
                        {/* Tags over image */}
                        <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg">
                            {project.category}
                          </span>
                        </div>

                        <div className="absolute bottom-8 left-8 right-8 text-white">
                          <h3 className="text-3xl font-bold mb-2 group-hover:translate-x-2 transition-transform duration-500">{project.title}</h3>
                          <p className="text-white/80 text-sm line-clamp-1 max-w-md">{project.short_description}</p>
                        </div>
                        
                          {project.live_url && (
                            <Link 
                              href={getExternalUrl(project.live_url)}
                              target="_blank"
                              className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-blue-600"
                            >
                              <ExternalLink size={20} />
                            </Link>
                          )}
                      </div>

                      {/* Info Area */}
                      <div className="p-8 flex flex-col flex-1">
                        <div className="grid grid-cols-2 gap-4 mb-8 border-b border-slate-100 pb-6">
                           <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                              <p className="text-slate-900 font-bold">Live</p>
                           </div>
                           <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Year</p>
                              <p className="text-slate-900 font-bold">{year}</p>
                           </div>
                        </div>

                        <p className="text-slate-600 leading-relaxed mb-8 text-sm line-clamp-3">
                          {project.full_description}
                        </p>

                        <div className="mt-auto">
                          <div className="flex flex-wrap gap-2 mb-8">
                            {project.tech_stack?.map((tech: string) => (
                              <span key={tech} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-[11px] font-bold border border-slate-100">
                                {tech}
                              </span>
                            ))}
                          </div>

                          {project.live_url && (
                            <Link 
                              href={getExternalUrl(project.live_url)}
                              target="_blank"
                              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:gap-4 transition-all duration-300"
                            >
                              Visit Project <ArrowRight size={16} />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
