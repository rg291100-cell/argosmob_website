import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";

const techGroups = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "React Native", "Tailwind CSS", "TypeScript"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "PostgreSQL", "Supabase", "GraphQL"],
  },
  {
    label: "AI & ML",
    items: ["OpenAI GPT", "Claude AI", "LangChain", "Pinecone", "TensorFlow"],
  },
  {
    label: "Cloud & DevOps",
    items: ["AWS", "Docker", "Vercel", "Firebase", "GitHub CI/CD"],
  },
];

export default function TechPreview() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            eyebrow="Tech Stack"
            title="Modern Tools. Enterprise Grade."
            description="We use battle-tested technologies that power the world's best products — chosen for performance, reliability, and developer experience."
          />
        </FadeIn>

        <StaggerContainer className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.1}>
          {techGroups.map((group) => (
            <StaggerItem key={group.label}>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:border-blue-200 transition-all duration-300">
                <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg mb-5">
                  {group.label}
                </div>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3} className="mt-10 text-center">
          <Link
            href="/tech-stack"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            See the full tech stack <ArrowRight size={15} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
