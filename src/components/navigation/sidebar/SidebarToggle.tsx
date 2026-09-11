import { cn } from "../../../lib/cn";
import { useSidebarContext } from "./context";

export type SidebarToggleProps = {
  className?: string;
};

/** Кнопка свернуть/развернуть (читает useSidebarContext) */
export function SidebarToggle({ className }: SidebarToggleProps) {
  const { collapsed, onToggle } = useSidebarContext();

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)]",
        "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]",
        "transition-colors",
        className
      )}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {collapsed ? <path d="M6 3l5 5-5 5" /> : <path d="M10 3l-5 5 5 5" />}
      </svg>
    </button>
  );
}
