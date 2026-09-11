import type React from "react";
import { cn } from "../../../lib/cn";
import { AlertContext, type AlertVariant } from "./context";

export const alertVariantClasses: Record<AlertVariant, string> = {
  info: "bg-[rgba(96,165,250,0.08)]  border-[rgba(96,165,250,0.25)]  text-[#60a5fa]",
  success: "bg-[rgba(74,222,128,0.08)]  border-[rgba(74,222,128,0.25)]  text-[#4ade80]",
  warning: "bg-[rgba(251,191,36,0.08)]  border-[rgba(251,191,36,0.25)]  text-[#fbbf24]",
  error: "bg-[rgba(248,113,113,0.08)] border-[rgba(248,113,113,0.25)] text-[#f87171]",
};

export type AlertProps = {
  variant?: AlertVariant;
  /** если передан — AlertDismiss показывает кнопку × */
  onDismiss?: () => void;
  className?: string;
  children: React.ReactNode;
};

/** Root — вариант + role="alert" + опциональный onDismiss. */
export function Alert({ variant = "info", onDismiss, className, children }: AlertProps) {
  return (
    <AlertContext.Provider value={{ variant, onDismiss }}>
      <div
        role="alert"
        className={cn(
          "flex items-start gap-3 rounded-[var(--radius-lg)] border p-4",
          alertVariantClasses[variant],
          className
        )}
      >
        {children}
      </div>
    </AlertContext.Provider>
  );
}
