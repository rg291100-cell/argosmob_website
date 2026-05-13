"use client";

import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import FadeIn from "@/components/animations/FadeIn";

const stats = [
  { value: 80, suffix: "+", label: "Projects Delivered", description: "Across mobile, web & AI" },
  { value: 50, suffix: "+", label: "Happy Clients", description: "From startups to enterprises" },
  { value: 98, suffix: "%", label: "Client Satisfaction", description: "Average rating" },
  { value: 5, suffix: "+", label: "Years of Expertise", description: "Building digital products" },
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = to / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [isInView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div className="relative group text-center lg:text-left p-6 lg:p-8 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300">
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors" />
                <p className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-base font-semibold text-slate-900 mb-1">{stat.label}</p>
                <p className="text-sm text-slate-500">{stat.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
