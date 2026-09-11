import { cn } from "@lib/cn";
import type React from "react";
import { useTourContext } from "./context";

export type TourDescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

/** Пояснение под заголовком шага — используется внутри `TourStep` */
export function TourDescription({ children, className }: TourDescriptionProps) {
  const { type } = useTourContext();
  return (
    <p
      className={cn(
        "text-sm",
        type === "primary" ? "text-white/90" : "text-[var(--text-muted)]",
        className
      )}
    >
      {children}
    </p>
  );
}
