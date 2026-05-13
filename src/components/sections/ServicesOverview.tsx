import Link from "next/link";
import { Smartphone, Globe, Brain, Zap, Database, Palette, Cloud, Package } from "lucide-react";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";

const services = [
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native & cross-platform apps built with React Native. Pixel-perfect UI with buttery smooth performance.",
    color: "blue",
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Modern web applications powered by Next.js, React, and cutting-edge tech stacks that perform at scale.",
    color: "indigo",
  },
  {
    icon: Brain,
    title: "AI Automation",
    description: "Intelligent workflow automation that reduces manual work, cuts costs, and accelerates your business.",
    color: "violet",
  },
  {
    icon: Zap,
    title: "AI Integrations",
    description: "Seamlessly embed GPT, Claude, and custom AI models into your existing products and workflows.",
    color: "blue",
  },
  {
    icon: Package,
    title: "SaaS Development",
    description: "Full-stack SaaS products from architecture to deployment — billing, auth, dashboards, and more.",
    color: "cyan",
  },
  {
    icon: Database,
    title: "Backend & Cloud",
    description: "Scalable API architecture, database design, and cloud infrastructure built to handle millions of users.",
    color: "slate",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Thoughtful design systems and interfaces that delight users and drive meaningful engagement.",
    color: "pink",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "AWS, GCP, and Firebase deployments with CI/CD pipelines, monitoring, and enterprise-grade reliability.",
    color: "sky",
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700 group-hover:bg-blue-100",
  indigo: "bg-indigo-50 text-indigo-700 group-hover:bg-indigo-100",
  violet: "bg-violet-50 text-violet-700 group-hover:bg-violet-100",
  cyan: "bg-cyan-50 text-cyan-700 group-hover:bg-cyan-100",
  slate: "bg-slate-100 text-slate-700 group-hover:bg-slate-200",
  pink: "bg-pink-50 text-pink-700 group-hover:bg-pink-100",
  sky: "bg-sky-50 text-sky-700 group-hover:bg-sky-100",
};

export default function ServicesOverview() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            eyebrow="What We Build"
            title="Services Built for Real Business Outcomes"
            description="We don't just write code — we solve problems. Every service we offer is designed to create measurable impact for your business."
          />
        </FadeIn>

        <StaggerContainer className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.07}>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.title}>
                <div className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 cursor-pointer h-full">
                  <div className={`inline-flex p-3 rounded-xl mb-4 transition-colors ${colorMap[service.color]}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2 leading-tight">{service.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{service.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-blue-600 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeIn delay={0.3} className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200 active:scale-95"
          >
            Explore All Services
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
