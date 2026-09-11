import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

export type FileCardNameProps = {
  className?: string;
  children: ReactNode;
};

/** Имя файла (truncate, меняет цвет при hover) */
export function FileCardName({ className, children }: FileCardNameProps) {
  return (
    <span
      className={cn(
        "text-sm font-medium text-[var(--text)] truncate leading-snug",
        "group-hover:text-[var(--primary)] transition-colors duration-150",
        className
      )}
    >
      {children}
    </span>
  );
}
