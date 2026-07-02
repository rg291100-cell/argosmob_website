"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt variables
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180, mass: 0.5 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);

  // Glow position variables
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glowXSpring = useSpring(glowX, springConfig);
  const glowYSpring = useSpring(glowY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates to range [-0.5, 0.5]
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);

    // Glow position (in pixel terms)
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      className={cn(
        "group relative bg-white rounded-[32px] border border-slate-200/80 overflow-hidden transition-all duration-500 flex flex-col h-full",
        config?.card,
        isExpanded ? "shadow-2xl ring-1 ring-blue-500/10" : "hover:shadow-2xl hover:-translate-y-1 hover:border-blue-500/20"
      )}
    >
      {/* Interactive radial glow overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: useTransform(
            [glowXSpring, glowYSpring],
            ([cx, cy]) => `radial-gradient(circle 250px at ${cx}px ${cy}px, rgba(37,99,235,0.06), transparent 80%)`
          )
        }}
      />

      {/* 80% Image Area */}
      <div
        className={cn(
          "relative w-full overflow-hidden bg-slate-50/50 flex items-center justify-center transition-all duration-500 border-b border-slate-100",
          isExpanded ? "h-48" : imageHeight,
          // fill images don't give the box intrinsic height, so the default
          // flex-grow sizing needs the aspect ratio to stay visible
          !isExpanded && imageHeight === "flex-grow" && aspectRatio
        )}
        style={{ transform: "translateZ(20px)" }}
      >
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn(
              "w-full h-full transition-transform duration-700 remove-checkerboard select-none",
              isExpanded ? "object-contain p-4 scale-90" : cn(objectFit, objectFit === "object-contain" ? "p-8" : "p-0", "group-hover:scale-[1.06]")
            )}
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-slate-200 animate-pulse" />
        )}
        
        {topRight && (
          <div className="absolute top-6 right-6 z-20">
            {topRight}
          </div>
        )}
      </div>

      {/* 20% Text Area & Expansion */}
      <div 
        className="p-6 flex flex-col gap-2 bg-white relative z-10 flex-grow"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 text-lg truncate group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
            {subtitle && (
              <p className={cn("text-xs font-bold uppercase tracking-wider mt-0.5", config?.accent || "text-blue-600")}>
                {subtitle}
              </p>
            )}
          </div>
          {!hideExpansion && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 relative z-30 cursor-pointer active:scale-95",
                isExpanded ? "bg-slate-900 text-white shadow-md shadow-slate-900/10" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              <span className="text-xs font-bold uppercase tracking-wider">
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
           <div className="mt-2 opacity-60 group-hover:opacity-100 transition-opacity">
              {footer}
           </div>
        )}
      </div>

      {/* Decorative gradient border sweep */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
