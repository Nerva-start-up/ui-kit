import type React from "react";
import { cn } from "../../../lib/cn";
import { HStack } from "../../layout/HStack";
import { useDrawerContext } from "./context";

export type DrawerHeaderProps = {
  className?: string;
  children: React.ReactNode;
};

/** Шапка drawer'а с кнопкой закрытия × */
export function DrawerHeader({ className, children }: DrawerHeaderProps) {
  const { onClose } = useDrawerContext();

  return (
    <HStack
      justify="between"
      className={cn("px-5 py-4 flex-shrink-0 border-b border-[var(--border)]", className)}
    >
      <div className="flex-1 min-w-0">{children}</div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Закрыть"
        className="ml-3 flex-shrink-0 p-1 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </HStack>
  );
}
