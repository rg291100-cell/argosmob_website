import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

export default function CtaSection() {
  return (
    <section className="section-padding bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/50 border border-blue-800 text-blue-300 text-xs font-semibold uppercase tracking-widest mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Ready to build?
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            Your Next Product Deserves
            <span className="block gradient-text-white">the Best Team.</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Tell us about your project. We&apos;ll get back to you within 24 hours with a clear, no-obligation proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/40 hover:shadow-xl hover:shadow-blue-600/30 active:scale-95"
            >
              Start a Conversation
              <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-slate-700 hover:border-green-500 text-slate-300 hover:text-green-400 font-semibold rounded-xl transition-all duration-200 hover:bg-green-900/20 active:scale-95"
            >
              <MessageCircle size={17} />
              Chat on WhatsApp
            </a>
          </div>
          <p className="mt-8 text-xs text-slate-600">
            Greater Noida, India · Response within 24 hours · Free consultation
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
