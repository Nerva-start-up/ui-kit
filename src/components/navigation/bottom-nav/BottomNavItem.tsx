import type React from "react";
import { cn } from "../../../lib/cn";

export type BottomNavItemProps = {
  icon: React.ElementType;
  /** число в красном кружке, скрыт при 0 */
  badge?: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
};

/** Вкладка нижней навигации. */
export function BottomNavItem({
  icon: Icon,
  badge,
  active = false,
  onClick,
  className,
  children,
}: BottomNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 flex flex-col items-center gap-1 py-2 min-h-[56px]",
        "touch-manipulation select-none cursor-pointer transition-colors relative",
        active ? "text-[var(--primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-sub)]",
        className
      )}
    >
      <span className="relative">
        <Icon size={22} strokeWidth={active ? 2.5 : 1.75} />
        {badge !== undefined && badge > 0 && (
          <span
            className={cn(
              "absolute -top-1 -right-1.5 min-w-[16px] h-4 px-0.5",
              "rounded-full text-[10px] font-bold leading-4 text-center",
              "bg-[var(--primary)] text-white"
            )}
          >
            {badge > 99 ? "99+" : badge}
          </span>
        )}
      </span>
      <span className={cn("text-[10px] leading-none", active ? "font-semibold" : "font-medium")}>
        {children}
      </span>
    </button>
  );
}
