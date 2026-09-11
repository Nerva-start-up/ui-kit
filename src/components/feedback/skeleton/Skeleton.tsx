import { cn } from "../../../lib/cn";

const roundedClasses = {
  sm: "rounded-[var(--radius-sm)]",
  md: "rounded-[var(--radius-md)]",
  lg: "rounded-[var(--radius-lg)]",
  full: "rounded-full",
};

export type SkeletonProps = {
  /** border-radius */
  rounded?: keyof typeof roundedClasses;
  /** CSS width */
  width?: string | number;
  /** CSS height */
  height?: string | number;
  className?: string;
};

/** Анимированный placeholder загрузки (pulse). */
export function Skeleton({ rounded = "md", width, height, className }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse bg-[var(--surface-2)]", roundedClasses[rounded], className)}
      style={{ width, height }}
    />
  );
}
