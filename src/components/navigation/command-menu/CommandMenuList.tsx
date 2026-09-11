import type React from "react";
import { cn } from "../../../lib/cn";

export type CommandMenuListProps = {
  className?: string;
  children: React.ReactNode;
};

/** Скроллируемый контейнер результатов. */
export function CommandMenuList({ className, children }: CommandMenuListProps) {
  return (
    // biome-ignore lint/a11y/useSemanticElements lint/a11y/useFocusableInteractive: listbox container, items manage their own focus
    <div role="listbox" className={cn("overflow-y-auto max-h-[360px] p-2", className)}>
      {children}
    </div>
  );
}
