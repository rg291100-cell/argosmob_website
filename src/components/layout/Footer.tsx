import Link from "next/link";
import { MapPin, Mail, Phone, X, Globe, Code, Camera } from "lucide-react";

const services = [
  { label: "Mobile App Development", href: "/services" },
  { label: "Web Development", href: "/services" },
  { label: "AI Automation", href: "/services" },
  { label: "SaaS Development", href: "/services" },
  { label: "UI/UX Design", href: "/services" },
  { label: "Cloud Solutions", href: "/services" },
];

const company = [
  { label: "About Us", href: "/about" },
  { label: "Our Work", href: "/portfolio" },
  { label: "Tech Stack", href: "/tech-stack" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { icon: X, href: "#", label: "Twitter / X" },
  { icon: Globe, href: "#", label: "LinkedIn" },
  { icon: Code, href: "#", label: "GitHub" },
  { icon: Camera, href: "#", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 bg-blue-500 rounded-lg rotate-6 group-hover:rotate-12 transition-transform" />
                <div className="absolute inset-0 bg-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
              </div>
              <div>
                <div className="font-bold text-white leading-none">ArgosMob</div>
                <div className="text-[10px] font-medium text-blue-400 tracking-widest uppercase">Tech & AI</div>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              We build premium digital products — mobile apps, web platforms, and AI solutions that help businesses scale.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Services</h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="text-slate-400 text-sm hover:text-blue-400 transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Company</h3>
            <ul className="space-y-3">
              {company.map((c) => (
                <li key={c.label}>
                  <Link href={c.href} className="text-slate-400 text-sm hover:text-blue-400 transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400 text-sm">
                  Greater Noida, Uttar Pradesh, India — 201308
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-blue-500 flex-shrink-0" />
                <a href="mailto:hello@argosmob.com" className="text-slate-400 text-sm hover:text-blue-400 transition-colors">
                  hello@argosmob.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-blue-500 flex-shrink-0" />
                <a href="tel:+919999999999" className="text-slate-400 text-sm hover:text-blue-400 transition-colors">
                  +91 99999 99999
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-800">
              <p className="text-xs text-slate-500 mb-1">WhatsApp</p>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-green-400 hover:text-green-300 transition-colors flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Chat with us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} ArgosMob Tech & AI Pvt Ltd. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Crafted with precision in Greater Noida, India
          </p>
        </div>
      </div>
    </footer>
  );
}
