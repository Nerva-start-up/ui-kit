import type React from "react";
import { cn } from "../../../lib/cn";
import { useSidebarContext } from "./context";

export type SidebarNavProps = {
  /** Заголовок группы (скрывается при collapse) */
  label?: string;
  className?: string;
  children: React.ReactNode;
};

/** Группа пунктов с опциональным label (скрывается при collapse) */
export function SidebarNav({ label, className, children }: SidebarNavProps) {
  const { collapsed } = useSidebarContext();

  return (
    <nav className={cn("flex flex-col gap-0.5", className)}>
      {label && !collapsed && (
        <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] first:pt-1">
          {label}
        </p>
      )}
      {children}
    </nav>
  );
}
