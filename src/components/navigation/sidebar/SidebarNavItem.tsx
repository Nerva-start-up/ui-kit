import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { forwardRef } from "react";
import { cn } from "../../../lib/cn";
import { useSidebarContext } from "./context";

export type SidebarNavItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Иконка 16×16 */
  icon?: React.ReactNode;
  /** Бейдж (скрывается при collapse) */
  badge?: string | number;
  /** Активный пункт (оранжевый фон) */
  active?: boolean;
  /** Нативный `title` при collapse. `false` — если нужен `Tooltip` */
  tooltip?: boolean;
};

/** Кнопка-пункт: иконка + анимированный лейбл + badge */
export const SidebarNavItem = forwardRef<HTMLButtonElement, SidebarNavItemProps>(
  function SidebarNavItem(
    {
      icon,
      badge,
      active = false,
      disabled = false,
      className,
      children,
      onClick,
      tooltip = true,
      title,
      ...rest
    },
    ref
  ) {
    const { collapsed } = useSidebarContext();

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        onClick={onClick}
        title={title ?? (collapsed && tooltip ? String(children) : undefined)}
        className={cn(
          "group flex w-full items-center gap-3 rounded-[var(--radius-md)] py-2 text-sm transition-colors duration-150 cursor-pointer",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          collapsed ? "justify-center px-2" : "px-3",
          active
            ? "bg-[var(--primary-dim)] text-[var(--primary)] font-medium"
            : "text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]",
          className
        )}
        {...rest}
      >
        {icon && <span className="shrink-0 flex h-5 w-5 items-center justify-center">{icon}</span>}

        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.span
              key="label"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.15 }}
              className="flex-1 truncate overflow-hidden whitespace-nowrap text-left"
            >
              {children}
            </motion.span>
          )}
        </AnimatePresence>

        {!collapsed && badge !== undefined && (
          <span className="ml-auto shrink-0 rounded-full bg-[var(--primary)] px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white">
            {badge}
          </span>
        )}
      </button>
    );
  }
);
