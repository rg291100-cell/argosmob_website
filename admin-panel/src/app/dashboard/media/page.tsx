"use client";

import { useState, useEffect, useRef } from "react";
import { Upload, Image as ImageIcon, Search, Trash2, Copy, Grid, List as ListIcon, Loader2, FileVideo } from "lucide-react";
import axios from "axios";
import { format } from "date-fns";

export default function MediaLibraryPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/media");
      setMedia(res.data);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const token = localStorage.getItem("admin_token");
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        await axios.post("http://localhost:5000/api/media/upload", formData, {
          headers: { 
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          },
        });
      }
      fetchMedia();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Some uploads failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const token = localStorage.getItem("admin_token");
      await axios.delete(`http://localhost:5000/api/media/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMedia();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");
  };

  const filteredMedia = media.filter((m: any) => 
    m.alt_text?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Media Library</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and organize all your website assets in one place.</p>
        </div>
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all active:scale-95 disabled:opacity-50"
        >
          {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
          {uploading ? "Uploading..." : "Upload Files"}
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleUpload} 
          multiple 
          className="hidden" 
          accept="image/*,video/*"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto flex-1">
            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search assets..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none">
              <option>All Types</option>
              <option>Images</option>
              <option>Videos</option>
            </select>
          </div>
          <div className="flex bg-white border border-slate-200 rounded-lg p-1">
            <button 
              onClick={() => setView("grid")}
              className={`p-1.5 rounded-md transition-colors ${view === "grid" ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setView("list")}
              className={`p-1.5 rounded-md transition-colors ${view === "list" ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
            >
              <ListIcon size={18} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-square bg-slate-50 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="py-20 text-center">
              <ImageIcon size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-500">No assets found. Upload some files to get started.</p>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {filteredMedia.map((m: any) => (
                <div key={m.id} className="group relative aspect-square rounded-xl border border-slate-200 overflow-hidden bg-slate-50 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                  {m.file_type === 'image' ? (
                    <img src={m.file_url} alt={m.alt_text} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900">
                      <FileVideo className="text-white opacity-40" size={32} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                      onClick={() => copyToClipboard(m.file_url)}
                      className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
                      title="Copy URL"
                    >
                      <Copy size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(m.id)}
                      className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-red-500/80 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-slate-900/80 to-transparent">
                    <p className="text-[10px] text-white font-medium truncate">{m.alt_text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
               <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-500 font-medium">
                    <th className="pb-3 px-2">Asset</th>
                    <th className="pb-3 px-2">Name</th>
                    <th className="pb-3 px-2">Type</th>
                    <th className="pb-3 px-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredMedia.map((m: any) => (
                    <tr key={m.id} className="group hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-2">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                           {m.file_type === 'image' ? (
                            <img src={m.file_url} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-800 text-white"><FileVideo size={14}/></div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-2 font-medium text-slate-700">{m.alt_text}</td>
                      <td className="py-3 px-2 text-slate-500 uppercase text-[10px] font-bold">{m.file_type}</td>
                      <td className="py-3 px-2 text-right">
                         <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => copyToClipboard(m.file_url)} className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"><Copy size={16}/></button>
                          <button onClick={() => handleDelete(m.id)} className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={16}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
               </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
