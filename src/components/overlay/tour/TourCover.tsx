import { cn } from "@lib/cn";
import type React from "react";

export type TourCoverProps = {
  children: React.ReactNode;
  className?: string;
};

/** Иллюстрация/обложка над заголовком шага — используется внутри `TourStep` */
export function TourCover({ children, className }: TourCoverProps) {
  return <div className={cn("mb-3", className)}>{children}</div>;
}
