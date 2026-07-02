import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow && (
        <div className={cn(
          "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4",
          dark
            ? "bg-blue-900/50 text-blue-300 border border-blue-800"
            : "bg-blue-50 text-blue-700 border border-blue-100"
        )}>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          {eyebrow}
        </div>
      )}
      <h2 className={cn(
        "text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-tight",
        dark ? "text-white" : "text-slate-900"
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          "mt-4 text-lg leading-relaxed",
          align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl",
          dark ? "text-slate-400" : "text-slate-500"
        )}>
          {description}
        </p>
      )}
    </div>
  );
}
