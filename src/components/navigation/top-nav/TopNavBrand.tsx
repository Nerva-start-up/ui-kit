import type React from "react";
import { cn } from "../../../lib/cn";

export type TopNavBrandProps = {
  className?: string;
  children: React.ReactNode;
};

/** Левый слот верхней навигации (логотип/бренд). */
export function TopNavBrand({ className, children }: TopNavBrandProps) {
  return <div className={cn("flex flex-1 items-center justify-start", className)}>{children}</div>;
}
