"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FolderGit2, 
  Mail, 
  BookOpen, 
  MessageSquareQuote, 
  TrendingUp, 
  ArrowUpRight,
  Plus,
  Image as ImageIcon,
  ChevronRight,
  Clock,
  Loader2
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { format } from "date-fns";
import { API_BASE_URL } from "@/lib/utils";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    enquiries: 0,
    stories: 0,
    testimonials: 0
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [projects, enquiries, stories, testimonials] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/projects`),
          axios.get(`${API_BASE_URL}/api/enquiries`),
          axios.get(`${API_BASE_URL}/api/stories`),
          axios.get(`${API_BASE_URL}/api/testimonials`)
        ]);

        setStats({
          projects: projects.data.length,
          enquiries: enquiries.data.filter((e: any) => e.status === 'new').length,
          stories: stories.data.filter((s: any) => s.status === 'published').length,
          testimonials: testimonials.data.length
        });

        setRecentEnquiries(enquiries.data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    { label: "Total Projects", value: stats.projects, icon: FolderGit2, color: "blue", href: "/dashboard/projects" },
    { label: "New Enquiries", value: stats.enquiries, icon: Mail, color: "emerald", href: "/dashboard/enquiries" },
    { label: "Published Stories", value: stats.stories, icon: BookOpen, color: "purple", href: "/dashboard/stories" },
    { label: "Testimonials", value: stats.testimonials, icon: MessageSquareQuote, color: "amber", href: "/dashboard/testimonials" },
  ];

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Welcome back, Admin</h1>
        <p className="text-sm text-slate-500 mt-1">Here&apos;s what&apos;s happening with your platform today.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <Link key={i} href={stat.href}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                  <stat.icon size={20} />
                </div>
                <ArrowUpRight size={18} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Enquiries */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recent Enquiries</h2>
            <Link href="/dashboard/enquiries" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            {recentEnquiries.length === 0 ? (
              <div className="p-12 text-center text-slate-400">No recent enquiries</div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentEnquiries.map((enquiry: any) => (
                  <div key={enquiry.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">
                        {enquiry.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{enquiry.name}</p>
                        <p className="text-xs text-slate-500">{enquiry.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        enquiry.status === 'new' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-500'
                      }`}>
                        {enquiry.status}
                      </span>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock size={10} />
                        {format(new Date(enquiry.created_at), "MMM d, HH:mm")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/dashboard/projects" className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all group">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
                <Plus size={18} />
              </div>
              <span className="text-sm font-bold text-slate-700">Add New Project</span>
            </Link>
            <Link href="/dashboard/stories" className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl hover:border-purple-200 hover:shadow-md transition-all group">
              <div className="p-2 rounded-lg bg-purple-50 text-purple-600 group-hover:scale-110 transition-transform">
                <BookOpen size={18} />
              </div>
              <span className="text-sm font-bold text-slate-700">Write a Story</span>
            </Link>
            <Link href="/dashboard/media" className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl hover:border-emerald-200 hover:shadow-md transition-all group">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
                <ImageIcon size={18} />
              </div>
              <span className="text-sm font-bold text-slate-700">Upload Media</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
