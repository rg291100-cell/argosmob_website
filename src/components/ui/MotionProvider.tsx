"use client";

import { MotionConfig } from "framer-motion";

// Respects prefers-reduced-motion for every framer-motion animation in the app:
// transform/layout animations are disabled, opacity/color transitions remain.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
