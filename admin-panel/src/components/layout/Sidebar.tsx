"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  FolderGit2, 
  MessageSquareQuote, 
  BookOpen, 
  Wrench, 
  Layers, 
  Mail, 
  Image as ImageIcon, 
  Settings, 
  LogOut 
} from "lucide-react";

const routes = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/dashboard/projects", icon: FolderGit2 },
  { name: "Enquiries", href: "/dashboard/enquiries", icon: Mail },
  { name: "Testimonials", href: "/dashboard/testimonials", icon: MessageSquareQuote },
  { name: "Stories", href: "/dashboard/stories", icon: BookOpen },
  { name: "Services", href: "/dashboard/services", icon: Wrench },
  { name: "Tech Stack", href: "/dashboard/tech-stack", icon: Layers },
  { name: "Media Library", href: "/dashboard/media", icon: ImageIcon },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    window.location.href = "/";
  };

  return (
    <aside className="w-64 h-screen bg-slate-950 text-slate-300 flex flex-col border-r border-slate-800 flex-shrink-0 sticky top-0">
      <div className="h-20 flex items-center px-6 border-b border-slate-800/60 bg-slate-900/20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9">
            <img src="/images/logo.png" alt="ArgosMob Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-sm leading-none">ArgosMob</span>
            <span className="text-[10px] text-blue-500 font-bold uppercase tracking-wider mt-1">Admin</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 no-scrollbar space-y-1">
        {routes.map((route) => {
          const isActive = pathname === route.href || pathname.startsWith(`${route.href}/`);
          const Icon = route.icon;

          return (
            <Link key={route.href} href={route.href} className="block relative group">
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 bg-blue-600/10 rounded-lg border border-blue-500/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <div
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "text-blue-400" : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                }`}
              >
                <Icon size={18} className={isActive ? "text-blue-500" : "text-slate-500 group-hover:text-slate-400 transition-colors"} />
                {route.name}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-800/60">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={18} className="text-slate-500 group-hover:text-red-400 transition-colors" />
          Logout
        </button>
      </div>
    </aside>
  );
}
