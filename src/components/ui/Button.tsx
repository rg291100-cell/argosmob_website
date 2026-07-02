"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
  arrow?: boolean;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className,
  arrow = false,
  external = false,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  
  // Magnetic coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate relative distance from center of the button
    const rx = e.clientX - rect.left - width / 2;
    const ry = e.clientY - rect.top - height / 2;
    
    // Divide by 3.5 to create a gentle pull effect
    x.set(rx / 3.5);
    y.set(ry / 3.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 select-none relative overflow-hidden";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_4px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.4)] disabled:opacity-50 border border-blue-500/20",
    secondary:
      "bg-slate-950 text-white hover:bg-slate-900 border border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent shadow-[0_0_15px_rgba(37,99,235,0.05)] hover:shadow-[0_8px_25px_rgba(37,99,235,0.25)]",
    ghost:
      "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80",
    white:
      "bg-white text-slate-950 hover:bg-slate-50 border border-slate-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  const inner = (
    <>
      {/* Light sweep sweep effect */}
      <span className="absolute inset-0 w-full h-full block bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-beam-sweep pointer-events-none" />
      
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {arrow && (
          <ArrowRight size={size === "lg" ? 18 : 16} className="group-hover:translate-x-1 transition-transform duration-300" />
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.span
        style={{ x: springX, y: springY }}
        className="inline-block"
      >
        <Link
          ref={buttonRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(classes, "group active:scale-[0.97]")}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {inner}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.span
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <button
        ref={buttonRef as React.RefObject<HTMLButtonElement>}
        type={type}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(classes, "group active:scale-[0.97]")}
        disabled={disabled}
      >
        {inner}
      </button>
    </motion.span>
  );
}
