import FadeIn from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";

const steps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description: "We start by deeply understanding your business, users, and goals. Every decision we make is rooted in strategy, not assumption.",
    duration: "Week 1",
  },
  {
    number: "02",
    title: "Design & Prototyping",
    description: "Our designers craft pixel-perfect wireframes and interactive prototypes — validated before a single line of code is written.",
    duration: "Weeks 2–3",
  },
  {
    number: "03",
    title: "Engineering & Build",
    description: "We develop using agile sprints with daily standups, weekly demos, and complete transparency. You always know where we are.",
    duration: "Weeks 4–10",
  },
  {
    number: "04",
    title: "Testing & QA",
    description: "Rigorous manual and automated testing across devices, browsers, and load scenarios ensures your product is production-ready.",
    duration: "Weeks 9–11",
  },
  {
    number: "05",
    title: "Launch & Deploy",
    description: "We handle the full deployment pipeline — CI/CD, cloud setup, App Store submissions — and make your launch flawless.",
    duration: "Week 12",
  },
  {
    number: "06",
    title: "Growth & Support",
    description: "Post-launch, we stay with you. Performance monitoring, feature iterations, and scaling support — your long-term partner.",
    duration: "Ongoing",
  },
];

export default function ProcessSection() {
  return (
    <section className="section-padding bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            eyebrow="How We Work"
            title="A Process Engineered for Results"
            description="Transparency, precision, and accountability at every stage. No surprises — just exceptional output."
            dark
          />
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 0.08}>
              <div className="group relative p-7 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 hover:border-blue-500/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-5">
                  <span className="text-5xl font-bold text-blue-900 leading-none select-none">{step.number}</span>
                  <span className="text-xs font-semibold text-blue-400 bg-blue-900/50 px-3 py-1 rounded-full border border-blue-800/50">
                    {step.duration}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                {/* Connecting line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 w-6 h-px bg-blue-800/50" />
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
