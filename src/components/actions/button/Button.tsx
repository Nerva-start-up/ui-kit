import type React from "react";
import { cn } from "../../../lib/cn";
import { Spinner } from "../../feedback/spinner/Spinner";

const variantClasses = {
  primary: "bg-[var(--primary)] text-[#0d1117] hover:bg-[var(--primary-h)] font-semibold",
  ghost:
    "bg-transparent text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]",
  danger: "bg-transparent text-[var(--error)] hover:bg-[rgba(248,113,113,0.12)]",
  outline:
    "bg-transparent text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--text-muted)] hover:text-[var(--text)]",
};

const sizeClasses = {
  sm: "h-7 px-3 text-xs rounded-[var(--radius-sm)]",
  md: "h-9 px-4 text-sm rounded-[var(--radius-md)]",
  lg: "h-[50px] px-6 text-[15px] rounded-[var(--radius-md)]",
  icon: "h-9 w-9 p-0 rounded-[var(--radius-md)]",
};

export type ButtonProps = {
  /** визуальный стиль */
  variant?: keyof typeof variantClasses;
  /** размер */
  size?: keyof typeof sizeClasses;
  /** показывает спиннер, блокирует */
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-all duration-150",
        "font-medium cursor-pointer select-none",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
}
