import type React from "react";
import { cn } from "../../../lib/cn";

const variantClasses = {
  default: "bg-[var(--surface-2)] text-[var(--text-muted)]",
  success: "bg-[rgba(74,222,128,0.12)] text-[var(--success)]",
  error: "bg-[rgba(248,113,113,0.12)] text-[var(--error)]",
  info: "bg-[rgba(96,165,250,0.12)] text-[var(--info)]",
  warning: "bg-[rgba(251,191,36,0.12)] text-[#fbbf24]",
  orange: "bg-[rgba(249,115,22,0.12)] text-[var(--primary)]",
};

export type BadgeProps = {
  variant?: keyof typeof variantClasses;
  className?: string;
  children: React.ReactNode;
};

/** Цветной бейдж для статусов и меток. */
export function Badge({ variant = "default", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-[var(--radius-sm)] text-xs font-medium",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
