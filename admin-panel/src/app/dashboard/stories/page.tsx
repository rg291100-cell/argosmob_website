"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, BookOpen, Edit, Trash2, User, AlertCircle } from "lucide-react";
import axios from "axios";
import { format } from "date-fns";
import SlideOver from "@/components/ui/SlideOver";
import ImageUpload from "@/components/ui/ImageUpload";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const storySchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().min(5, "Content must be at least 5 characters"),
  excerpt: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  cover_image: z.string().optional().or(z.literal('')),
  status: z.enum(['draft', 'published']),
  author: z.string().min(1, "Author is required"),
  youtube_url: z.string().optional().or(z.literal('')),
});

type Story = z.infer<typeof storySchema> & { id: string; created_at: string };

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue, watch, control, formState: { errors, isSubmitting } } = useForm<z.infer<typeof storySchema>>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      category: "",
      author: "Admin",
      status: "draft",
      youtube_url: ""
    }
  });

  const titleValue = watch("title");
  useEffect(() => {
    if (titleValue && !editingId) {
      const slug = titleValue.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setValue("slug", slug);
    }
  }, [titleValue, setValue, editingId]);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stories");
      setStories(res.data);
    } catch (error) {
      console.error("Error fetching stories:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof storySchema>) => {
    try {
      const token = localStorage.getItem("admin_token");
      if (editingId) {
        await axios.put(`http://localhost:5000/api/stories/${editingId}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post("http://localhost:5000/api/stories", data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsSlideOverOpen(false);
      reset();
      setEditingId(null);
      fetchStories();
    } catch (error: any) {
      console.error("Error saving story:", error);
      alert(`Failed to save: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This will permanently delete this story.")) return;
    try {
      const token = localStorage.getItem("admin_token");
      await axios.delete(`http://localhost:5000/api/stories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchStories();
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  const openEdit = (s: Story) => {
    setEditingId(s.id);
    reset({
      title: s.title,
      slug: s.slug,
      content: s.content,
      excerpt: s.excerpt || "",
      category: s.category,
      cover_image: s.cover_image || "",
      status: s.status,
      author: s.author,
      youtube_url: s.youtube_url || ""
    });
    setIsSlideOverOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Stories</h1>
          <p className="text-sm text-slate-500 mt-1">Manage articles and case studies.</p>
        </div>
        <button 
          onClick={() => { 
            setEditingId(null); 
            reset({
              title: "",
              slug: "",
              content: "",
              excerpt: "",
              category: "",
              cover_image: "",
              author: "Admin",
              status: "draft",
              youtube_url: ""
            }); 
            setIsSlideOverOpen(true); 
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md transition-all active:scale-95"
        >
          <Plus size={16} />
          New Story
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="p-8 flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : stories.length === 0 ? (
          <div className="p-20 text-center">
            <BookOpen size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-500">No stories found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-semibold text-slate-500">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stories.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{s.title}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-tighter">{format(new Date(s.created_at), "MMM d, yyyy")}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{s.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${s.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                        {s.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openEdit(s)} 
                          className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition-all"
                        >
                          <Edit size={14}/> Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(s.id)} 
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

      <SlideOver isOpen={isSlideOverOpen} onClose={() => setIsSlideOverOpen(false)} title={editingId ? "Edit Story" : "New Story"}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-12">
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
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Title</label>
              <input {...register("title")} className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm ${errors.title ? "border-red-200" : "border-slate-200"}`} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Slug</label>
              <input {...register("slug")} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                <input {...register("category")} className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm ${errors.category ? "border-red-200" : "border-slate-200"}`} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Author</label>
                <input {...register("author")} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
            </div>
            <Controller
              name="cover_image"
              control={control}
              render={({ field }) => (
                <ImageUpload label="Cover Image" value={field.value || ""} onChange={field.onChange} />
              )}
            />
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">YouTube Video URL (Optional)</label>
              <input {...register("youtube_url")} placeholder="e.g. https://www.youtube.com/watch?v=..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Content</label>
              <textarea {...register("content")} rows={8} className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm ${errors.content ? "border-red-200" : "border-slate-200"}`} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Status</label>
              <select {...register("status")} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <button disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 shadow-lg shadow-blue-100">
              {isSubmitting ? "Saving..." : editingId ? "Update Story" : "Create Story"}
            </button>
          </div>
        </form>
      </SlideOver>
    </div>
  );
}
