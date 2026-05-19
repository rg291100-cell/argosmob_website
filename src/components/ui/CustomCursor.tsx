"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 400, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const dotRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible.current && dotRef.current) {
        dotRef.current.style.opacity = "1";
        isVisible.current = true;
      }
    };

    const handleMouseDown = () => {
      if (dotRef.current) dotRef.current.style.transform = "translate(-50%, -50%) scale(0.7)";
    };
    const handleMouseUp = () => {
      if (dotRef.current) dotRef.current.style.transform = "translate(-50%, -50%) scale(1)";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          left: 0,
          top: 0,
          opacity: 0,
          transition: "transform 0.1s ease",
          pointerEvents: "none",
          position: "fixed",
          zIndex: 9999,
        }}
      />
      {/* Ring */}
      <motion.div
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          left: 0,
          top: 0,
          pointerEvents: "none",
          position: "fixed",
          zIndex: 9998,
        }}
      />
    </>
  );
}
