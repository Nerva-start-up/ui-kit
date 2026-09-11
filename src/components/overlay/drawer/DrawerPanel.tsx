import { cn } from "@lib/cn";
import { motion } from "motion/react";
import type React from "react";

export type DrawerPanelProps = {
  /** Откуда выезжает панель */
  side?: "left" | "right" | "bottom";
  /** CSS width — только для left/right, default '340px' */
  width?: string;
  /** CSS max-height — только для bottom, default '85vh' */
  maxHeight?: string;
  className?: string;
  children: React.ReactNode;
};

/** Панель drawer'а, выезжающая с указанной стороны (`side="left"/"right"/"bottom"`) */
export function DrawerPanel({
  side = "right",
  width = "340px",
  maxHeight = "85vh",
  className,
  children,
}: DrawerPanelProps) {
  if (side === "bottom") {
    return (
      <motion.aside
        key="drawer-panel"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        style={{ maxHeight }}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 flex flex-col",
          "bg-[var(--surface)] border-t border-[var(--border)]",
          "rounded-t-[var(--radius-xl)] shadow-[var(--shadow)]",
          "pb-[env(safe-area-inset-bottom)]",
          // см. комментарий в Dialog.tsx — нейтрализует pointer-events:none, оставшийся
          // после hideOthers() немодального Radix Select (например Select в теле панели)
          "!pointer-events-auto",
          className
        )}
      >
        {children}
      </motion.aside>
    );
  }

  return (
    <motion.aside
      key="drawer-panel"
      initial={{ x: side === "right" ? "100%" : "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: side === "right" ? "100%" : "-100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 280 }}
      style={{ width }}
      className={cn(
        "fixed top-0 bottom-0 z-50 flex flex-col",
        "bg-[var(--surface)] border-[var(--border)] shadow-[var(--shadow)]",
        side === "right" ? "right-0 border-l" : "left-0 border-r",
        className
      )}
    >
      {children}
    </motion.aside>
  );
}
