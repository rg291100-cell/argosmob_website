"use client";
import { API_BASE_URL } from "@/lib/utils";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, AlertCircle, Smartphone, Globe, Brain, Zap, Package, Database, Palette, Cloud, Cpu, Code, Server, Layout, Shield, BarChart3, MessageSquare } from "lucide-react";
import axios from "axios";
import SlideOver from "@/components/ui/SlideOver";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ImageUpload from "@/components/ui/ImageUpload";

const serviceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  icon: z.string().min(1, "Icon is required"),
  is_active: z.boolean(),
  order_index: z.number().int(),
  image_url: z.string().optional().or(z.literal('')),
});

type Service = z.infer<typeof serviceSchema> & { id: string };

const availableIcons = [
  { name: "Smartphone", icon: Smartphone },
  { name: "Globe", icon: Globe },
  { name: "Brain", icon: Brain },
  { name: "Zap", icon: Zap },
  { name: "Package", icon: Package },
  { name: "Database", icon: Database },
  { name: "Palette", icon: Palette },
  { name: "Cloud", icon: Cloud },
  { name: "Cpu", icon: Cpu },
  { name: "Code", icon: Code },
  { name: "Server", icon: Server },
  { name: "Layout", icon: Layout },
  { name: "Shield", icon: Shield },
  { name: "BarChart3", icon: BarChart3 },
  { name: "MessageSquare", icon: MessageSquare },
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { register, handleSubmit, reset, watch, setValue, control, formState: { errors, isSubmitting } } = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      description: "",
      is_active: true,
      order_index: 0,
      icon: "Code",
      image_url: ""
    }
  });

  const selectedIcon = watch("icon");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/services`);
      setServices(res.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof serviceSchema>) => {
    try {
      const token = localStorage.getItem("admin_token");
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/services/${editingId}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_BASE_URL}/api/services`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsSlideOverOpen(false);
      reset();
      setEditingId(null);
      fetchServices();
    } catch (error: any) {
      console.error("Error saving service:", error);
      alert(`Failed to save: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This will remove this service from your website.")) return;
    try {
      const token = localStorage.getItem("admin_token");
      await axios.delete(`${API_BASE_URL}/api/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const openEdit = (s: Service) => {
    setEditingId(s.id);
    reset({
      title: s.title,
      description: s.description,
      icon: s.icon,
      is_active: s.is_active,
      order_index: s.order_index,
      image_url: s.image_url || ""
    });
    setIsSlideOverOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Services</h1>
          <p className="text-sm text-slate-500 mt-1">Manage the core service offerings.</p>
        </div>
        <button 
          onClick={() => { 
            setEditingId(null); 
            reset({
              title: "",
              description: "",
              is_active: true,
              order_index: 0,
              icon: "Code",
              image_url: ""
            }); 
            setIsSlideOverOpen(true); 
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all active:scale-95"
        >
          <Plus size={16} />
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 animate-pulse h-48"></div>
          ))
        ) : services.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white border border-slate-200 rounded-2xl">
            <Package size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-500">No services found.</p>
          </div>
        ) : (
          services.map((s) => {
            const IconComponent = availableIcons.find(i => i.name === s.icon)?.icon || Package;
            return (
              <motion.div 
                key={s.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col h-full group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm border border-blue-50">
                    <IconComponent size={24} />
                  </div>
                  <div className="flex flex-col items-end text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    <span>Order: {s.order_index}</span>
                    <span className={s.is_active ? "text-emerald-500" : "text-amber-500"}>{s.is_active ? "Active" : "Hidden"}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-3 flex-1 mb-6">{s.description}</p>
                
                <div className="flex gap-2 pt-4 border-t border-slate-50 mt-auto">
                  <button 
                    onClick={() => openEdit(s)} 
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <Edit size={14}/> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(s.id)} 
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={14}/> Delete
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      <SlideOver 
        isOpen={isSlideOverOpen} 
        onClose={() => setIsSlideOverOpen(false)} 
        title={editingId ? "Edit Service" : "Add New Service"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-10">
          {Object.keys(errors).length > 0 && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
              <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" size={18} />
              <div>
                <p className="text-sm font-bold text-red-800">Errors:</p>
                <ul className="mt-1 list-disc list-inside text-xs text-red-600">
                  {Object.entries(errors).map(([field, err]: any) => (
                    <li key={field}>{err.message}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Service Title</label>
              <input 
                {...register("title")}
                className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? "border-red-200" : "border-slate-200"}`}
                placeholder="e.g. AI Solutions"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Description</label>
              <textarea 
                {...register("description")}
                rows={4}
                className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? "border-red-200" : "border-slate-200"}`}
                placeholder="Describe this service..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Service Image (Shown in Dark Screen)</label>
              <Controller
                name="image_url"
                control={control}
                render={({ field }) => (
                  <ImageUpload 
                    label="Service Background Image" 
                    value={field.value || ""} 
                    onChange={field.onChange} 
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Icon</label>
              <div className="grid grid-cols-5 gap-2">
                {availableIcons.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setValue("icon", item.name)}
                    className={`p-3 rounded-lg border flex items-center justify-center transition-all ${
                      selectedIcon === item.name 
                        ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200" 
                        : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <item.icon size={20} />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Display Order</label>
                <input 
                  type="number"
                  {...register("order_index", { valueAsNumber: true })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col justify-end">
                <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100 h-[46px]">
                  <input 
                    type="checkbox"
                    {...register("is_active")}
                    id="is_active_service"
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <label htmlFor="is_active_service" className="text-sm font-medium text-slate-700 cursor-pointer">Active</label>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : editingId ? "Update Service" : "Create Service"}
            </button>
          </div>
        </form>
      </SlideOver>
    </div>
  );
}
