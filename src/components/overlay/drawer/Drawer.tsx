import { cn } from "@lib/cn";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { Fragment, useCallback, useEffect, useRef } from "react";
import { DrawerContext } from "./context";

export type DrawerProps = {
  open: boolean;
  onClose: () => void;
  /**
   * Вызывается один раз, когда анимации закрытия backdrop'а и панели
   * полностью завершены. Это единственный надёжный момент снять внешнюю
   * блокировку UI (например focus trap другого оверлея) — до вызова этого
   * колбэка часть drawer'а ещё может быть видна и анимироваться.
   */
  onExitComplete?: () => void;
  children: React.ReactNode;
};

const EXIT_LAYERS = 2;

/** Root drawer-компонент — управляет open/close и рендерит backdrop с закрытием по Escape и клику */
export function Drawer({ open, onClose, onExitComplete, children }: DrawerProps) {
  const completedExits = useRef(0);

  useEffect(() => {
    if (open) completedExits.current = 0;
  }, [open]);

  const handleLayerExitComplete = useCallback(() => {
    completedExits.current += 1;
    if (completedExits.current === EXIT_LAYERS) onExitComplete?.();
  }, [onExitComplete]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <DrawerContext.Provider value={{ onClose }}>
      <AnimatePresence onExitComplete={handleLayerExitComplete}>
        {open && (
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className={cn(
              "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm",
              // см. комментарий в Dialog.tsx — нейтрализует pointer-events:none, который
              // остаётся висеть на этом div после того, как немодальный Radix Select
              // (например Select внутри drawer'а) пометил его aria-hidden через hideOthers()
              "!pointer-events-auto"
            )}
          />
        )}
      </AnimatePresence>
      <AnimatePresence onExitComplete={handleLayerExitComplete}>
        {open && <Fragment key="drawer-content">{children}</Fragment>}
      </AnimatePresence>
    </DrawerContext.Provider>
  );
}
