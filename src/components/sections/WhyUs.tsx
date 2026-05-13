import { Shield, Clock, Users, TrendingUp, Code2, HeartHandshake } from "lucide-react";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";

const reasons = [
  {
    icon: Code2,
    title: "Engineering-First Mindset",
    description: "Every line of code we write follows clean architecture principles. We build for scalability, not just delivery.",
  },
  {
    icon: Clock,
    title: "On-Time, Every Time",
    description: "We respect your timelines. Our agile process ensures predictable sprints with no surprises at the end.",
  },
  {
    icon: Shield,
    title: "Security by Default",
    description: "Data protection, secure APIs, and compliance-ready architectures are standard — not add-ons.",
  },
  {
    icon: Users,
    title: "Dedicated Team Model",
    description: "You get a dedicated pod — PM, designer, and engineers — fully embedded into your product vision.",
  },
  {
    icon: TrendingUp,
    title: "Growth-Oriented Builds",
    description: "We architect products to grow with you. What works at 100 users scales confidently to 100,000.",
  },
  {
    icon: HeartHandshake,
    title: "Long-Term Partnership",
    description: "We become your long-term technology partner — supporting, evolving, and owning your product's success.",
  },
];

export default function WhyUs() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <FadeIn direction="right">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-widest border border-blue-100 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Why ArgosMob
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-900 leading-tight tracking-tight mb-6">
                Built Different.
                <br />
                <span className="gradient-text">Delivered Better.</span>
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed mb-8">
                We&apos;re not a body-shop or a template factory. We are product engineers who take ownership of every pixel and every function we ship.
              </p>
              <div className="space-y-4">
                {["Full transparency throughout development", "Weekly progress demos", "Source code ownership — always yours"].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                    </div>
                    <span className="text-slate-600 text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right — Grid */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.08}>
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <StaggerItem key={reason.title}>
                  <div className="group p-5 rounded-2xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center text-blue-700 mb-3 transition-colors">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-1.5">{reason.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{reason.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
