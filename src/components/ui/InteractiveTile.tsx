"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveTileProps {
  image: string;
  title: string;
  subtitle?: string;
  description: string;
  footer?: React.ReactNode;
  config?: {
    card?: string;
    accent?: string;
    bar?: string;
  };
  aspectRatio?: string;
  objectFit?: "object-contain" | "object-cover";
  imageHeight?: string;
  topRight?: React.ReactNode;
  hideExpansion?: boolean;
}

export default function InteractiveTile({
  image,
  title,
  subtitle,
  description,
  footer,
  config,
  aspectRatio = "aspect-[4/5]",
  objectFit = "object-contain",
  imageHeight = "flex-grow",
  topRight,
  hideExpansion = false
}: InteractiveTileProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={cn(
        "group relative bg-white rounded-[32px] border border-slate-200 overflow-hidden transition-all duration-500 flex flex-col h-full",
        config?.card,
        isExpanded ? "shadow-2xl ring-1 ring-blue-500/10" : "hover:shadow-xl"
      )}
    >
      {/* 80% Image Area */}
      <div className={cn("relative w-full overflow-hidden bg-white flex items-center justify-center transition-all duration-500", isExpanded ? "h-48" : imageHeight)}>
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className={cn(
              "w-full h-full transition-transform duration-700 remove-checkerboard",
              isExpanded ? "object-contain p-4 scale-90" : cn(objectFit, objectFit === "object-contain" ? "p-8" : "p-0", "group-hover:scale-110")
            )}
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-slate-200 animate-pulse" />
        )}
        
        {/* Overlay removed */}

        {topRight && (
          <div className="absolute top-6 right-6 z-20">
            {topRight}
          </div>
        )}
      </div>

      {/* 20% Text Area & Expansion */}
      <div className="p-6 flex flex-col gap-2 bg-white relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 text-lg truncate group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
            {subtitle && (
              <p className={cn("text-xs font-bold uppercase tracking-wider", config?.accent || "text-blue-600")}>
                {subtitle}
              </p>
            )}
          </div>
          {!hideExpansion && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
                isExpanded ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              <span className="text-[11px] font-bold uppercase tracking-wider">
                {isExpanded ? "Close" : "Read More"}
              </span>
              <div className={cn("transition-transform duration-300", isExpanded ? "rotate-180" : "rotate-0")}>
                <ChevronDown size={14} />
              </div>
            </button>
          )}
        </div>

        <AnimatePresence>
          {!hideExpansion && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4 pb-2">
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  &ldquo;{description}&rdquo;
                </p>
                {footer && <div className="mt-6 pt-6 border-t border-slate-100">{footer}</div>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {(hideExpansion || !isExpanded) && footer && (
           <div className="mt-2 opacity-50 group-hover:opacity-100 transition-opacity">
              {footer}
           </div>
        )}
      </div>
    </div>
  );
}
