import { cn } from "@lib/cn";
import type React from "react";

export type TourTitleProps = {
  children: React.ReactNode;
  className?: string;
};

/** Заголовок карточки шага — используется внутри `TourStep` */
export function TourTitle({ children, className }: TourTitleProps) {
  return <p className={cn("text-sm font-semibold", className)}>{children}</p>;
}
