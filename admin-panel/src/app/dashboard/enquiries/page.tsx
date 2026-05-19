"use client";
import { API_BASE_URL } from "@/lib/utils";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, MoreHorizontal, Mail, Phone, Building, Calendar, DollarSign, ChevronRight, Trash2, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";

type Enquiry = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company: string;
  project_type: string;
  budget: string;
  message: string;
  status: "new" | "contacted" | "in_discussion" | "converted" | "closed";
  created_at: string;
};

const statusColors = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  contacted: "bg-amber-100 text-amber-700 border-amber-200",
  in_discussion: "bg-purple-100 text-purple-700 border-purple-200",
  converted: "bg-emerald-100 text-emerald-700 border-emerald-200",
  closed: "bg-slate-100 text-slate-700 border-slate-200",
};

const statusLabels = {
  new: "New Lead",
  contacted: "Contacted",
  in_discussion: "In Discussion",
  converted: "Converted",
  closed: "Closed",
};

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const res = await axios.get(`${API_BASE_URL}/api/enquiries`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEnquiries(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("admin_token");
      await axios.put(`${API_BASE_URL}/api/enquiries/${id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEnquiries();
      setSelectedEnquiry(null);
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This will permanently delete this enquiry lead.")) return;
    try {
      const token = localStorage.getItem("admin_token");
      await axios.delete(`${API_BASE_URL}/api/enquiries/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEnquiries();
      setSelectedEnquiry(null);
    } catch (error) {
      console.error("Error deleting enquiry:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Enquiries</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and track your incoming leads.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search leads..."
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden min-h-[500px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-semibold text-slate-500 sticky top-0">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Project Type</th>
                <th className="px-6 py-4">Budget</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-10 bg-slate-100 rounded-lg w-48"></div></td>
                    <td className="px-6 py-4"><div className="h-5 bg-slate-100 rounded w-32"></div></td>
                    <td className="px-6 py-4"><div className="h-5 bg-slate-100 rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-slate-100 rounded-full w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-8 bg-slate-100 rounded ml-auto w-8"></div></td>
                  </tr>
                ))
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center">
                      <Mail size={32} className="text-slate-300 mb-3" />
                      <p className="text-base font-medium text-slate-900">No enquiries yet</p>
                    </div>
                  </td>
                </tr>
              ) : (
                enquiries.map((enq) => (
                  <motion.tr 
                    key={enq.id} 
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => setSelectedEnquiry(enq)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-semibold border border-slate-200">
                          {enq.full_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 text-xs">{enq.full_name}</p>
                          <p className="text-[10px] text-slate-400">{format(new Date(enq.created_at), "MMM d, yyyy")}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-500">
                      {enq.project_type}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700 text-xs">
                      {enq.budget}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[enq.status]}`}>
                        {statusLabels[enq.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-slate-300 hover:text-blue-600 transition-colors">
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Panel for Details */}
      <AnimatePresence>
        {selectedEnquiry && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEnquiry(null)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40" 
            />
            <motion.div
              initial={{ x: "100%", boxShadow: "0 0 0 rgba(0,0,0,0)" }}
              animate={{ x: 0, boxShadow: "-10px 0 40px rgba(0,0,0,0.1)" }}
              exit={{ x: "100%", boxShadow: "0 0 0 rgba(0,0,0,0)" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 border-l border-slate-200 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-lg font-semibold text-slate-900">Lead Details</h2>
                <button 
                  onClick={() => setSelectedEnquiry(null)}
                  className="p-2 text-slate-400 hover:bg-slate-200 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 text-xl font-bold border border-blue-200">
                      {selectedEnquiry.full_name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{selectedEnquiry.full_name}</h3>
                      <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5"><Building size={14}/> {selectedEnquiry.company || "No Company"}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(selectedEnquiry.id)}
                    className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                    title="Delete Enquiry"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Lead Status</label>
                  <select 
                    value={selectedEnquiry.status}
                    onChange={(e) => setSelectedEnquiry({...selectedEnquiry, status: e.target.value as any})}
                    className={`w-full px-4 py-2.5 rounded-xl border appearance-none font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${statusColors[selectedEnquiry.status]}`}
                  >
                    <option value="new">New Lead</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_discussion">In Discussion</option>
                    <option value="converted">Converted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm"><Mail size={14} className="text-slate-500"/></div>
                    <div>
                      <p className="text-xs text-slate-500">Email Address</p>
                      <a href={`mailto:${selectedEnquiry.email}`} className="font-medium text-blue-600 hover:underline">{selectedEnquiry.email}</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm"><Phone size={14} className="text-slate-500"/></div>
                    <div>
                      <p className="text-xs text-slate-500">Phone Number</p>
                      <a href={`tel:${selectedEnquiry.phone}`} className="font-medium text-slate-900">{selectedEnquiry.phone || "Not provided"}</a>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3 border-b border-slate-100 pb-2">Project Details</h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <p className="text-xs text-slate-500 mb-1">Service Type</p>
                      <p className="text-sm font-medium text-slate-900">{selectedEnquiry.project_type}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <p className="text-xs text-slate-500 mb-1">Budget Range</p>
                      <p className="text-sm font-medium text-slate-900">{selectedEnquiry.budget}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-2">Message</p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap italic">
                      &ldquo;{selectedEnquiry.message}&rdquo;
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-white">
                <button 
                  onClick={() => updateStatus(selectedEnquiry.id, selectedEnquiry.status)}
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-slate-200 disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Status Changes"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
