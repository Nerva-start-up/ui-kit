import type React from "react";
import { cn } from "../../../lib/cn";

export type CarouselItemProps = {
  children: React.ReactNode;
  className?: string;
};

/** Один слайд `Carousel` — занимает всю ширину трека, точка привязки scroll-snap. */
export function CarouselItem({ children, className }: CarouselItemProps) {
  return <div className={cn("w-full shrink-0 snap-start", className)}>{children}</div>;
}
