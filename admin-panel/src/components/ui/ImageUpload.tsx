"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import axios from "axios";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        try {
          const base64 = reader.result as string;
          const token = localStorage.getItem("admin_token");
          
          const res = await axios.post("http://localhost:5000/api/media/upload", {
            file: base64,
            fileName: file.name,
            fileType: file.type
          }, {
            headers: { 
              Authorization: `Bearer ${token}`
            },
          });

          onChange(res.data.url);
          setUploading(false);
        } catch (error: any) {
          const serverError = error.response?.data?.error;
          const errorMessage = typeof serverError === 'object'
            ? (serverError.message || JSON.stringify(serverError))
            : (serverError || error.message);
            
          console.error("Upload failed details:", error);
          alert(`Upload failed: ${errorMessage}`);
          setUploading(false);
        }
      };
      reader.onerror = (error) => {
        console.error("FileReader error:", error);
        alert("Failed to read file");
        setUploading(false);
      };
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image. Please try again.");
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</label>
      
      <div 
        className={`relative h-32 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden ${
          value ? "border-blue-200 bg-blue-50/10" : "border-slate-200 bg-slate-50 hover:border-slate-300"
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
            <span className="text-xs text-blue-600 font-medium">Uploading...</span>
          </div>
        ) : value ? (
          <>
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-900/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30">Change Image</span>
            </div>
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(""); }}
              className="absolute top-2 right-2 p-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm text-slate-500 hover:text-red-500 transition-colors"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-400 group">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
              <Upload size={18} />
            </div>
            <span className="text-xs font-medium">Click to upload image</span>
          </div>
        )}
      </div>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleUpload} 
        className="hidden" 
        accept="image/*"
      />
    </div>
  );
}
