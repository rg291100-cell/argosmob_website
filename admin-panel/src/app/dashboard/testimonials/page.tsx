"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, MessageSquareQuote, Edit, Trash2, User, AlertCircle } from "lucide-react";
import axios from "axios";
import { format } from "date-fns";
import SlideOver from "@/components/ui/SlideOver";
import ImageUpload from "@/components/ui/ImageUpload";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const testimonialSchema = z.object({
  client_name: z.string().min(1, "Name is required"),
  designation: z.string().optional(),
  company: z.string().optional(),
  content: z.string().min(5, "Content must be at least 5 characters"),
  rating: z.number().min(1).max(5),
  image_url: z.string().optional().or(z.literal('')),
  is_featured: z.boolean(),
});

type Testimonial = z.infer<typeof testimonialSchema> & { id: string; created_at: string };

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSlideOverOpen, setIsSlideOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { register, handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm<z.infer<typeof testimonialSchema>>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      client_name: "",
      content: "",
      rating: 5,
      is_featured: false,
      image_url: ""
    }
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/testimonials");
      setTestimonials(res.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof testimonialSchema>) => {
    try {
      const token = localStorage.getItem("admin_token");
      if (editingId) {
        await axios.put(`http://localhost:5000/api/testimonials/${editingId}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post("http://localhost:5000/api/testimonials", data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsSlideOpen(false);
      reset();
      setEditingId(null);
      fetchTestimonials();
    } catch (error: any) {
      console.error("Error saving testimonial:", error);
      alert(`Failed to save: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This will permanently delete this testimonial.")) return;
    try {
      const token = localStorage.getItem("admin_token");
      await axios.delete(`http://localhost:5000/api/testimonials/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  const openEdit = (t: Testimonial) => {
    setEditingId(t.id);
    reset({
      client_name: t.client_name,
      designation: t.designation || "",
      company: t.company || "",
      content: t.content,
      rating: t.rating,
      image_url: t.image_url || "",
      is_featured: t.is_featured
    });
    setIsSlideOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
          <p className="text-sm text-slate-500 mt-1">Manage client reviews.</p>
        </div>
        <button 
          onClick={() => { 
            setEditingId(null); 
            reset({
              client_name: "",
              designation: "",
              company: "",
              content: "",
              rating: 5,
              is_featured: false,
              image_url: ""
            }); 
            setIsSlideOpen(true); 
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all active:scale-95"
        >
          <Plus size={16} />
          Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 animate-pulse h-48"></div>
          ))
        ) : testimonials.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white border border-slate-200 rounded-2xl">
            <MessageSquareQuote size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-500">No testimonials found.</p>
          </div>
        ) : (
          testimonials.map((t) => (
            <motion.div 
              key={t.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden text-slate-400">
                    {t.image_url ? <img src={t.image_url} alt={t.client_name} className="w-full h-full object-cover" /> : <User size={18} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-[13px]">{t.client_name}</h3>
                    <p className="text-[10px] text-slate-500">{t.designation} {t.company && `@ ${t.company}`}</p>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-slate-600 italic line-clamp-4 flex-1 mb-6">&ldquo;{t.content}&rdquo;</p>
              
              <div className="flex gap-2 pt-4 border-t border-slate-50 mt-auto">
                <button 
                  onClick={() => openEdit(t)} 
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <Edit size={14}/> Edit
                </button>
                <button 
                  onClick={() => handleDelete(t.id)} 
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={14}/> Delete
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <SlideOver isOpen={isSlideOverOpen} onClose={() => setIsSlideOpen(false)} title={editingId ? "Edit Testimonial" : "New Testimonial"}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Client Name</label>
              <input {...register("client_name")} className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm ${errors.client_name ? "border-red-200" : "border-slate-200"}`} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Designation</label>
                <input {...register("designation")} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Company</label>
                <input {...register("company")} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Content</label>
              <textarea {...register("content")} rows={4} className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm ${errors.content ? "border-red-200" : "border-slate-200"}`} />
            </div>
            <Controller
              name="image_url"
              control={control}
              render={({ field }) => (
                <ImageUpload label="Client Photo" value={field.value || ""} onChange={field.onChange} />
              )}
            />
          </div>

          <div className="pt-6">
            <button disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 shadow-lg shadow-blue-200">
              {isSubmitting ? "Saving..." : editingId ? "Update Testimonial" : "Create Testimonial"}
            </button>
          </div>
        </form>
      </SlideOver>
    </div>
  );
}
