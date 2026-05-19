"use client";

import { useEffect, useRef } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Native smooth scrolling enhancement — GPU-accelerated
    document.documentElement.style.scrollBehavior = "smooth";

    // Passive scroll optimization
    const handleWheel = (e: WheelEvent) => {
      // Allow native smooth scroll
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div ref={contentRef} style={{ willChange: "auto" }}>
      {children}
    </div>
  );
}
