import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";
import { MapPin, Mail, Phone, Clock, MessageCircle } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with ArgosMob Tech & AI. Start your project, get a free consultation, or ask us anything.",
};

const contactInfo = [
  {
    icon: MapPin,
    label: "Location",
    value: "Greater Noida, Uttar Pradesh, India — 201308",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@argosmob.com",
    href: "mailto:hello@argosmob.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 99999 99999",
    href: "tel:+919999999999",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon–Sat, 9 AM – 7 PM IST",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/8 blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/50 border border-blue-800 text-blue-300 text-xs font-semibold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Let&apos;s Talk
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              Start a Conversation.
              <span className="block gradient-text-white">Build Something Great.</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              Tell us about your project. We&apos;ll respond within 24 hours with a clear, honest, no-obligation assessment.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left — Info */}
            <div className="lg:col-span-2 space-y-8">
              <FadeIn direction="right">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Get in Touch</h2>
                  <p className="text-slate-500 leading-relaxed">
                    Whether you have a fully formed idea or just a rough vision, we&apos;re happy to talk through it. No sales pressure — just a genuine conversation.
                  </p>
                </div>
              </FadeIn>

              <FadeIn direction="right" delay={0.1}>
                <div className="space-y-4">
                  {contactInfo.map((info) => {
                    const Icon = info.icon;
                    return (
                      <div key={info.label} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0">
                          <Icon size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">{info.label}</p>
                          {info.href ? (
                            <a href={info.href} className="text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors">
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-sm font-medium text-slate-900">{info.value}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </FadeIn>

              <FadeIn direction="right" delay={0.2}>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-xl bg-green-50 border border-green-200 hover:border-green-300 hover:bg-green-100 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <MessageCircle size={22} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-900">Chat on WhatsApp</p>
                    <p className="text-sm text-green-700">Usually replies within a few hours</p>
                  </div>
                  <div className="ml-auto w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                </a>
              </FadeIn>

              <FadeIn direction="right" delay={0.3}>
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-3 text-sm">What happens next?</h3>
                  <ol className="space-y-3">
                    {[
                      "We review your project details",
                      "Schedule a free 30-min discovery call",
                      "We send a clear, itemized proposal",
                      "Kick off — no lengthy contracts",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </FadeIn>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-3">
              <FadeIn direction="left">
                <ContactForm />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm" style={{ height: "360px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.06889754725782!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sGreater%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1713000000000!5m2!1sen!2sin"
                width="100%"
                height="360"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ArgosMob office location — Greater Noida"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
