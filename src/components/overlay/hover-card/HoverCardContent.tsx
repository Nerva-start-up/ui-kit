import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../../lib/cn";
import { defaultTransition } from "../../../motion/variants";
import { Card } from "../../data-display/card/Card";
import { useHoverCardContext } from "./context";

export type HoverCardContentProps = {
  children: React.ReactNode;
  /** Сторона появления относительно триггера */
  side?: "top" | "bottom";
  /** Отступ от триггера, px */
  sideOffset?: number;
  className?: string;
};

/** Содержимое всплывающей карточки — портал, позиционируется у триггера, рендерится в `Card`. */
export function HoverCardContent({
  children,
  side = "bottom",
  sideOffset = 8,
  className,
}: HoverCardContentProps) {
  const { open, triggerRef, onContentEnter, onContentLeave } = useHoverCardContext();
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    if (!open) return;
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition({
      top: side === "bottom" ? rect.bottom + sideOffset : rect.top - sideOffset,
      left: rect.left,
    });
  }, [open, triggerRef, side, sideOffset]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && position && (
        <motion.div
          onMouseEnter={onContentEnter}
          onMouseLeave={onContentLeave}
          initial={{ opacity: 0, y: side === "bottom" ? -6 : 6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={defaultTransition}
          className="fixed z-50"
          style={{
            top: position.top,
            left: position.left,
            transform: side === "top" ? "translateY(-100%)" : undefined,
          }}
        >
          <Card padding="md" className={cn("w-72 shadow-xl", className)}>
            {children}
          </Card>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
