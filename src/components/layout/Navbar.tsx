"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { X, ArrowUpRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Work" },
  { href: "/tech-stack", label: "Tech" },
  { href: "/stories", label: "Stories" },
  { href: "/testimonials", label: "Testimonials" },
];

type ScrollState = "top" | "scrolled" | "hidden";

export default function Navbar() {
  const [scrollState, setScrollState] = useState<ScrollState>("top");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastScrollY.current;
    if (latest < 20) {
      setScrollState("top");
    } else if (latest > prev && latest > 80) {
      setScrollState("hidden");
    } else {
      setScrollState("scrolled");
    }
    lastScrollY.current = latest;
  });

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isScrolledOrNotHome = scrollState !== "top" || !isHome;

  const handleDropdownEnter = (label: string) => {
    clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: scrollState === "hidden" ? -100 : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-500",
          isScrolledOrNotHome
            ? "top-4 max-w-5xl mx-4 lg:mx-auto rounded-2xl lg:rounded-full bg-white/75 backdrop-blur-xl border border-slate-200/40 shadow-lg shadow-slate-950/5 px-2"
            : "top-0 bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[60px] lg:h-[64px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-9 h-9">
              <img 
                src="/images/logo.png" 
                alt="ArgosMob Logo" 
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" 
              />
              <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="flex flex-col leading-none gap-0.5">
              <span
                className={cn(
                  "font-bold text-[14px] tracking-tight transition-colors duration-300",
                  isScrolledOrNotHome ? "text-slate-900" : "text-white"
                )}
              >
                ArgosMob
              </span>
              <span
                className={cn(
                  "text-[8px] font-bold tracking-[0.18em] uppercase transition-colors duration-300",
                  isScrolledOrNotHome ? "text-blue-600" : "text-blue-300"
                )}
              >
                Tech & AI
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && handleDropdownEnter(link.label)}
                onMouseLeave={() => link.children && handleDropdownLeave()}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "relative flex items-center gap-1 px-4 py-2 text-[13px] font-semibold rounded-full transition-all duration-300 group/link",
                    isActive(link.href)
                      ? isScrolledOrNotHome ? "text-blue-600 bg-blue-50/50" : "text-white bg-white/10"
                      : isScrolledOrNotHome
                      ? "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown
                      size={12}
                      className={cn(
                        "transition-transform duration-200",
                        activeDropdown === link.label ? "rotate-180" : ""
                      )}
                    />
                  )}
                  {/* Active indicator */}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className={cn(
                        "absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[3px] w-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {link.children && (
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-0 mt-2 w-52 rounded-2xl bg-white/98 backdrop-blur-xl shadow-xl shadow-slate-900/10 border border-slate-200/80 overflow-hidden"
                        onMouseEnter={() => handleDropdownEnter(link.label)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="p-2">
                          {link.children.map((child) => (
                            <Link
                              key={`${child.label}-${child.href}`}
                              href={child.href}
                              className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm text-slate-600 hover:text-blue-700 hover:bg-blue-50/80 font-medium transition-all duration-150 group/item"
                            >
                              {child.label}
                              <ArrowUpRight
                                size={13}
                                className="opacity-0 group-hover/item:opacity-100 -translate-x-1 group-hover/item:translate-x-0 transition-all duration-150"
                              />
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className={cn(
                "text-[13px] font-semibold transition-colors duration-200",
                isScrolledOrNotHome ? "text-slate-600 hover:text-slate-950" : "text-white/75 hover:text-white"
              )}
            >
              Contact
            </Link>
            <Link
              href="/contact"
              className="btn-primary !py-2 !px-4 !text-[12.5px] !rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 border-none shadow-[0_4px_15px_rgba(37,99,235,0.15)] hover:shadow-[0_4px_25px_rgba(37,99,235,0.35)]"
            >
              Start a Project
              <ArrowUpRight size={13} />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            id="mobile-menu-toggle"
            aria-label="Toggle mobile menu"
            className={cn(
              "lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl transition-all duration-200",
              isScrolledOrNotHome
                ? "text-slate-700 hover:bg-slate-100"
                : "text-white hover:bg-white/10"
            )}
          >
            <span
              className={cn(
                "block h-[1.5px] rounded-full transition-all duration-300 origin-center",
                isScrolledOrNotHome ? "bg-slate-800" : "bg-white",
                mobileOpen ? "w-5 rotate-45 translate-y-[6.5px]" : "w-5"
              )}
            />
            <span
              className={cn(
                "block h-[1.5px] rounded-full transition-all duration-300",
                isScrolledOrNotHome ? "bg-slate-800" : "bg-white",
                mobileOpen ? "w-0 opacity-0" : "w-4"
              )}
            />
            <span
              className={cn(
                "block h-[1.5px] rounded-full transition-all duration-300 origin-center",
                isScrolledOrNotHome ? "bg-slate-800" : "bg-white",
                mobileOpen ? "w-5 -rotate-45 -translate-y-[6.5px]" : "w-5"
              )}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 320 }}
              className="absolute right-0 top-0 bottom-0 w-[300px] bg-white flex flex-col shadow-2xl shadow-slate-900/20"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8">
                    <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <span className="font-bold text-slate-900 text-sm">ArgosMob</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 overflow-y-auto px-4 py-4">
                {[...navLinks, { href: "/contact", label: "Contact" }].map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 + 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center px-4 py-3 mb-1 rounded-xl text-sm font-medium transition-all",
                        isActive(link.href)
                          ? "bg-blue-600 text-white shadow-sm shadow-blue-700/30"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      )}
                    >
                      {link.label}
                      {isActive(link.href) && <ArrowUpRight size={14} className="ml-auto opacity-70" />}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer CTA */}
              <div className="p-5 border-t border-slate-100 space-y-3">
                <Link
                  href="/contact"
                  className="block w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-center shadow-md shadow-blue-700/25 hover:shadow-blue-600/35 transition-all active:scale-98"
                >
                  Start a Project
                </Link>
                <p className="text-center text-[11px] text-slate-400">
                  Greater Noida, India · Response within 24h
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
