import type React from "react";
import { cn } from "../../../lib/cn";

const paddingClasses = { none: "", sm: "p-3", md: "p-5", lg: "p-7" };

export type CardProps = {
  /** orange glow на hover */
  glow?: boolean;
  /** внутренний отступ */
  padding?: keyof typeof paddingClasses;
} & React.HTMLAttributes<HTMLDivElement>;

/** Карточка — surface bg + border + border-radius. */
export function Card({ glow = false, padding = "md", className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)]",
        "transition-shadow duration-200",
        glow && "hover:shadow-[var(--shadow-glow)]",
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
