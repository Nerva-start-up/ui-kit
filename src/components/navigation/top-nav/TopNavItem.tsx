import type React from "react";
import { cn } from "../../../lib/cn";

export type TopNavItemProps = {
  active?: boolean;
  icon?: React.ElementType;
  href?: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
};

/** Вкладка. Если задан href — рендерится как <a>, иначе <button>. */
export function TopNavItem({
  active = false,
  icon: Icon,
  href,
  onClick,
  className,
  children,
}: TopNavItemProps) {
  const Tag = href ? "a" : "button";

  return (
    <Tag
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 whitespace-nowrap rounded-[var(--radius-md)]",
        "px-3 py-2 text-sm font-medium cursor-pointer transition-colors duration-150",
        active
          ? "bg-[var(--primary-dim)] text-[var(--primary)]"
          : "text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]",
        className
      )}
    >
      {Icon && <Icon size={16} strokeWidth={active ? 2.5 : 1.75} />}
      {children}
    </Tag>
  );
}
