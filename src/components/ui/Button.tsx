import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
  arrow?: boolean;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className,
  arrow = false,
  external = false,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md hover:shadow-blue-200 disabled:opacity-50",
    secondary:
      "bg-slate-900 text-white hover:bg-slate-800 shadow-sm",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent",
    ghost:
      "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
    white:
      "bg-white text-slate-900 hover:bg-slate-50 shadow-sm hover:shadow-md",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowRight size={size === "lg" ? 18 : 16} className="group-hover:translate-x-0.5 transition-transform" />
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(classes, "group")}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cn(classes, "group")} disabled={disabled}>
      {inner}
    </button>
  );
}
