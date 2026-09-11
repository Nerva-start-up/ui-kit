import { motion } from "motion/react";
import type React from "react";
import { useState } from "react";
import { cn } from "../../../lib/cn";
import { SidebarContext } from "./context";

export type SidebarProps = {
  /** Controlled-режим */
  collapsed?: boolean;
  /** Callback для controlled */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Начальное состояние (uncontrolled) */
  defaultCollapsed?: boolean;
  /** Ширина в развёрнутом виде */
  width?: string;
  /** Ширина в свёрнутом виде */
  collapsedWidth?: string;
  className?: string;
  children: React.ReactNode;
};

/** Root — `<motion.aside>` с анимацией ширины, хранит контекст */
export function Sidebar({
  collapsed: controlledCollapsed,
  onCollapsedChange,
  defaultCollapsed = false,
  width = "240px",
  collapsedWidth = "64px",
  className,
  children,
}: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isControlled = controlledCollapsed !== undefined;
  const collapsed = isControlled ? (controlledCollapsed ?? false) : internalCollapsed;

  function onToggle() {
    const next = !collapsed;
    if (!isControlled) setInternalCollapsed(next);
    onCollapsedChange?.(next);
  }

  return (
    <SidebarContext.Provider value={{ collapsed, onToggle }}>
      <motion.aside
        animate={{ width: collapsed ? collapsedWidth : width }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        className={cn(
          "relative flex flex-col h-full shrink-0 overflow-hidden",
          "bg-[var(--surface)] border-r border-[var(--border)]",
          className
        )}
      >
        {children}
      </motion.aside>
    </SidebarContext.Provider>
  );
}
