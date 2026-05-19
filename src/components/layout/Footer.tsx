"use client";

import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

const services = [
  { label: "Mobile App Development", href: "/services" },
  { label: "Web Development",        href: "/services" },
  { label: "AI Automation",          href: "/services" },
  { label: "SaaS Development",       href: "/services" },
  { label: "UI/UX Design",           href: "/services" },
  { label: "Cloud Solutions",        href: "/services" },
];

const company = [
  { label: "About Us",     href: "/about" },
  { label: "Our Work",     href: "/portfolio" },
  { label: "Tech Stack",   href: "/tech-stack" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact",      href: "/contact" },
];

const socialLinks = [
  { label: "X (Twitter)", href: "#", icon: "𝕏" },
  { label: "LinkedIn",    href: "#", icon: "in" },
  { label: "GitHub",      href: "#", icon: "GH" },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #05101f 0%, #0a1628 100%)" }}
    >
      {/* Top border accent */}
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.3) 30%, rgba(96,165,250,0.5) 50%, rgba(37,99,235,0.3) 70%, transparent)" }}
      />

      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />

      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-12 h-12">
                <img 
                  src="/images/logo.png" 
                  alt="ArgosMob Logo" 
                  className="w-full h-full object-contain brightness-110 drop-shadow-lg" 
                />
              </div>
              <div>
                <div className="font-bold text-white leading-none text-[15px]">ArgosMob</div>
                <div className="text-[9px] font-bold text-blue-400 tracking-[0.18em] uppercase mt-0.5">Tech & AI</div>
              </div>
            </Link>

            <p className="text-slate-400 text-[13.5px] leading-[1.75] mb-6 max-w-xs">
              We build premium digital products — mobile apps, web platforms,
              and AI solutions that help businesses scale.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-bold text-slate-400 transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(37,99,235,0.25)";
                    el.style.borderColor = "rgba(37,99,235,0.4)";
                    el.style.color = "#60a5fa";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(255,255,255,0.05)";
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.color = "#94a3b8";
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-5">Services</h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-slate-400 text-[13.5px] hover:text-blue-400 transition-colors duration-200 animated-underline"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-5">Company</h3>
            <ul className="space-y-3">
              {company.map((c) => (
                <li key={c.label}>
                  <Link
                    href={c.href}
                    className="text-slate-400 text-[13.5px] hover:text-blue-400 transition-colors duration-200 animated-underline"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-5">Contact</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                <a 
                  href="https://maps.app.goo.gl/6gU1nVvJSqY8ji4m6" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 text-[13.5px] leading-snug hover:text-blue-400 transition-colors"
                >
                  618, Hope Tower, Galaxy Blue Sapphire Plaza,<br />Greater Noida, Uttar Pradesh, 201018
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-blue-500 flex-shrink-0" />
                <a href="mailto:hello@argosmob.onmicrosoft.com" className="text-slate-400 text-[13.5px] hover:text-blue-400 transition-colors">
                  hello@argosmob.onmicrosoft.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-blue-500 flex-shrink-0" />
                <a href="tel:+917042603342" className="text-slate-400 text-[13.5px] hover:text-blue-400 transition-colors">
                  +917042603342
                </a>
              </li>
            </ul>

            {/* WhatsApp card */}
            <div
              className="p-4 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(74,222,128,0.15)",
              }}
            >
              <p className="text-[10px] text-slate-600 mb-1.5 uppercase tracking-wider font-semibold">WhatsApp</p>
              <a
                href="https://wa.me/917042603342"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13.5px] font-semibold text-green-400 hover:text-green-300 transition-colors flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-glow" />
                Chat with us
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-600 text-[12.5px]">
              © {new Date().getFullYear()} ArgosMob Tech & AI Pvt Ltd. All rights reserved.
            </p>
            <p className="text-slate-700 text-[12px] flex items-center gap-1.5">
              Crafted with precision in{" "}
              <span className="text-slate-500">Greater Noida, India</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
