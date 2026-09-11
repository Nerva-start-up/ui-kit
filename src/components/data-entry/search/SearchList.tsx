import type React from "react";
import { cn } from "../../../lib/cn";

export type SearchListProps = {
  className?: string;
  children: React.ReactNode;
};

/** Скроллируемый список. */
export function SearchList({ className, children }: SearchListProps) {
  return (
    // biome-ignore lint/a11y/useSemanticElements lint/a11y/useFocusableInteractive: listbox container, items manage their own focus
    <div role="listbox" className={cn("overflow-y-auto max-h-[400px] p-2", className)}>
      {children}
    </div>
  );
}
