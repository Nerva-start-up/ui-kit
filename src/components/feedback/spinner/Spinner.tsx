import { cn } from "../../../lib/cn";

const sizeClasses = { sm: "w-3 h-3", md: "w-4 h-4", lg: "w-6 h-6" };

export type SpinnerProps = {
  /** sm=12px, md=16px, lg=24px */
  size?: keyof typeof sizeClasses;
  className?: string;
};

/** Анимированный индикатор загрузки. */
export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <svg
      className={cn("animate-spin text-current shrink-0", sizeClasses[size], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
