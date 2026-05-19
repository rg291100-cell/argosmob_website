"use client";
import { API_BASE_URL } from "@/lib/utils";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Layers, Search, Trash2, Layout, Server, Database, Smartphone, Cpu, Cloud, AlertCircle, Edit2 } from "lucide-react";
import SlideOver from "@/components/ui/SlideOver";
import ImageUpload from "@/components/ui/ImageUpload";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const techStackSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  icon_url: z.string().optional().or(z.literal('')),
});

type TechItem = {
  id: string;
  name: string;
  category: string;
  icon_url?: string;
};

const categoryList = [
  { name: "Frontend", icon: Layout },
  { name: "Backend", icon: Server },
  { name: "Database", icon: Database },
  { name: "Mobile", icon: Smartphone },
  { name: "AI/ML", icon: Cpu },
  { name: "Cloud/DevOps", icon: Cloud },
];

export default function TechStackPage() {
  const [techItems, setTechItems] = useState<TechItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const { register, handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(techStackSchema),
    defaultValues: {
      name: "",
      category: "",
      icon_url: ""
    }
  });

  const fetchTechItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/tech-stack`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setTechItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechItems();
  }, []);

  const openEdit = (item: TechItem) => {
    setEditingId(item.id);
    reset({
      name: item.name,
      category: item.category,
      icon_url: item.icon_url || ""
    });
    setIsSlideOverOpen(true);
  };

  const onSubmit = async (data: any) => {
    try {
      const token = localStorage.getItem("admin_token");
      const url = editingId 
        ? `${API_BASE_URL}/api/tech-stack/${editingId}`
        : `${API_BASE_URL}/api/tech-stack`;
      
      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to save");
      }

      setIsSlideOverOpen(false);
      reset();
      setEditingId(null);
      fetchTechItems();
    } catch (error: any) {
      console.error("Submit error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This technology will be removed from your stack.")) return;
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`${API_BASE_URL}/api/tech-stack/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchTechItems();
      } else {
        const err = await response.json();
        alert(`Failed to delete: ${err.error}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const filteredItems = techItems.filter(item => 
    (item.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (item.category || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tech Stack</h1>
          <p className="text-sm text-slate-500 mt-1">Manage technologies used in projects.</p>
        </div>
        <button 
          onClick={() => {
            setEditingId(null);
            reset({ name: "", category: "", icon_url: "" });
            setIsSlideOverOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md transition-all active:scale-95"
        >
          <Plus size={16} />
          Add Technology
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 mb-8">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search technologies..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {loading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bg-white h-48 rounded-2xl border border-slate-100 animate-pulse"></div>
          ))
        ) : filteredItems.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400">
            No technologies found.
          </div>
        ) : (
          filteredItems.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col items-center hover:border-blue-300 transition-all shadow-sm">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100 overflow-hidden shadow-inner">
                {item.icon_url ? <img src={item.icon_url} alt={item.name} className="w-full h-full p-2 object-contain" /> : <Layers size={28} className="text-blue-500" />}
              </div>
              
              <h3 className="text-sm font-bold text-slate-900 truncate w-full text-center mb-1">{item.name}</h3>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-5">{item.category}</p>
              
              <div className="flex gap-2 w-full pt-4 border-t border-slate-50 mt-auto">
                <button 
                  onClick={() => openEdit(item)}
                  className="flex-1 flex items-center justify-center p-2 bg-slate-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                  title="Edit"
                >
                  <Edit2 size={14} />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 flex items-center justify-center p-2 bg-slate-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <SlideOver isOpen={isSlideOverOpen} onClose={() => setIsSlideOverOpen(false)} title={editingId ? "Edit Technology" : "Add New Technology"}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {Object.keys(errors).length > 0 && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-sm font-bold text-red-800 mb-1">Errors:</p>
              <ul className="list-disc list-inside text-xs text-red-600">
                {Object.entries(errors).map(([field, err]: any) => (
                  <li key={field}>{err.message}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Name</label>
              <input {...register("name")} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" placeholder="e.g. Next.js" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Category</label>
              <select {...register("category")} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                <option value="">Select Category</option>
                {categoryList.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <Controller
              name="icon_url"
              control={control}
              render={({ field }) => (
                <ImageUpload label="Icon / Logo" value={field.value || ""} onChange={field.onChange} />
              )}
            />
          </div>

          <div className="pt-6 border-t border-slate-100">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 shadow-lg disabled:opacity-50 transition-all active:scale-[0.98]"
            >
              {isSubmitting ? "Saving..." : editingId ? "Update Technology" : "Add to Stack"}
            </button>
          </div>
        </form>
      </SlideOver>
    </div>
  );
}
