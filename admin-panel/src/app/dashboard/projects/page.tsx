"use client";
import { API_BASE_URL } from "@/lib/utils";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, LayoutGrid, List as ListIcon, Edit, Trash2, Globe, ExternalLink, Tag, Image as ImageIcon, Calendar, AlertCircle, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import SlideOver from "@/components/ui/SlideOver";
import ImageUpload from "@/components/ui/ImageUpload";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.array(z.string()).min(1, "At least one category is required"),
  short_description: z.string().min(1, "Short tagline is required"),
  full_description: z.string().min(5, "Description must be at least 5 characters"),
  client_name: z.string().optional(),
  live_url: z.string().optional().or(z.literal('')),
  github_url: z.string().optional().or(z.literal('')),
  thumbnail: z.string().optional().or(z.literal('')),
  completion_date: z.string().optional(),
  is_featured: z.boolean().default(false),
  tech_stack: z.array(z.string()).default([]),
});

type Project = any;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [techOptions, setTechOptions] = useState<{id: string, name: string}[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue, watch, control, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      category: [],
      short_description: "",
      full_description: "",
      is_featured: false,
      tech_stack: [],
      completion_date: format(new Date(), "yyyy-MM-dd"),
      thumbnail: "",
      live_url: "",
      github_url: "",
      client_name: ""
    }
  });

  const selectedTech = watch("tech_stack") || [];
  const selectedCategories = watch("category") || [];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projectsRes, techRes, servicesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/projects`),
        fetch(`${API_BASE_URL}/api/tech-stack`),
        fetch(`${API_BASE_URL}/api/services`)
      ]);

      const projectsData = await projectsRes.json();
      const techData = await techRes.json();
      const servicesData = await servicesRes.json();

      setProjects(Array.isArray(projectsData) ? projectsData : []);
      setTechOptions(Array.isArray(techData) ? techData : []);
      setCategoryOptions(Array.isArray(servicesData) ? servicesData.map((s: any) => s.title) : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const token = localStorage.getItem("admin_token");
      
      const payload = {
        ...data,
        category: data.category.join(', '), 
        slug: data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      };

      const method = editingId ? 'PATCH' : 'POST';
      const url = editingId 
        ? `${API_BASE_URL}/api/projects/${editingId}`
        : `${API_BASE_URL}/api/projects`;

      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to save project");
      }

      setIsSlideOverOpen(false);
      reset();
      setEditingId(null);
      fetchData();
    } catch (error: any) {
      console.error("Error saving project:", error);
      alert(`Failed to save: ${error.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This will permanently delete this project.")) return;
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchData();
      } else {
        const err = await response.json();
        alert(`Failed: ${err.error}`);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const openEdit = (p: Project) => {
    setEditingId(p.id);
    reset({
      title: p.title,
      category: p.category ? p.category.split(', ') : [],
      short_description: p.short_description || "",
      full_description: p.full_description || "",
      client_name: p.client_name || "",
      live_url: p.live_url || "",
      github_url: p.github_url || "",
      thumbnail: p.thumbnail || "",
      completion_date: p.completion_date ? format(new Date(p.completion_date), "yyyy-MM-dd") : "",
      is_featured: p.is_featured,
      tech_stack: p.tech_stack || []
    });
    setIsSlideOverOpen(true);
  };

  const toggleSelection = (field: "tech_stack" | "category", value: string) => {
    const current = watch(field) || [];
    const index = current.indexOf(value);
    const updated = [...current];
    if (index > -1) {
      updated.splice(index, 1);
    } else {
      updated.push(value);
    }
    setValue(field, updated);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your dynamic portfolio.</p>
        </div>
        <button 
          onClick={() => { 
            setEditingId(null); 
            reset({
              title: "",
              category: [],
              short_description: "",
              full_description: "",
              is_featured: false,
              tech_stack: [],
              completion_date: format(new Date(), "yyyy-MM-dd"),
              thumbnail: "",
              live_url: "",
              github_url: "",
              client_name: ""
            }); 
            setIsSlideOverOpen(true); 
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md transition-all active:scale-95"
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden min-h-[500px]">
        {loading ? (
          <div className="p-20 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-20 text-center">
            <ImageIcon size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-500">No projects found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-semibold text-slate-500">
                <tr>
                  <th className="px-6 py-4">Project</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Featured</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{p.title}</p>
                      <p className="text-[10px] text-slate-400">{format(new Date(p.completion_date || Date.now()), "MMM yyyy")}</p>
                    </td>
                    <td className="px-6 py-4 text-[11px] font-bold text-slate-500">{p.category}</td>
                    <td className="px-6 py-4">
                      {p.is_featured ? <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-bold border border-blue-100">YES</span> : <span className="text-slate-300">-</span>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => openEdit(p)} 
                          className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition-all"
                        >
                          <Edit size={14}/> Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(p.id)} 
                          className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-red-600 rounded-lg text-xs font-bold hover:bg-red-600 hover:text-white transition-all"
                        >
                          <Trash2 size={14}/> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <SlideOver isOpen={isSlideOverOpen} onClose={() => setIsSlideOverOpen(false)} title={editingId ? "Edit Project" : "New Project"}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-20">
          {Object.keys(errors).length > 0 && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
              <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" size={18} />
              <div className="text-xs text-red-600">
                <p className="font-bold">Please fix errors:</p>
                <ul className="list-disc list-inside mt-1">
                  {Object.entries(errors).map(([f, e]: any) => <li key={f}>{e.message}</li>)}
                </ul>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Project Title</label>
              <input {...register("title")} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Categories (Multi-select)</label>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl max-h-32 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {categoryOptions.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleSelection("category", cat)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                        selectedCategories.includes(cat)
                          ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                          : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tagline</label>
              <input {...register("short_description")} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Full Description</label>
              <textarea {...register("full_description")} rows={4} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tech Stack</label>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl max-h-40 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {techOptions.map((tech) => (
                    <button
                      key={tech.id}
                      type="button"
                      onClick={() => toggleSelection("tech_stack", tech.name)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                        selectedTech.includes(tech.name)
                          ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                          : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"
                      }`}
                    >
                      {tech.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Live URL</label>
                <input {...register("live_url")} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" placeholder="www.example.com" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Completion Date</label>
                <input type="date" {...register("completion_date")} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
            </div>

            <Controller
              name="thumbnail"
              control={control}
              render={({ field }) => (
                <ImageUpload label="Thumbnail" value={field.value || ""} onChange={field.onChange} />
              )}
            />

            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <input type="checkbox" {...register("is_featured")} id="feat" className="w-4 h-4 text-blue-600 rounded" />
              <label htmlFor="feat" className="text-sm font-medium text-slate-700 cursor-pointer">Featured Project</label>
            </div>
          </div>

          <div className="pt-6">
            <button disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 shadow-lg disabled:opacity-50">
              {isSubmitting ? "Saving..." : editingId ? "Update Project" : "Create Project"}
            </button>
          </div>
        </form>
      </SlideOver>
    </div>
  );
}
