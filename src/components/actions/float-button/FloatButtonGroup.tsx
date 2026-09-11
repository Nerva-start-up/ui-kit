import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useState } from "react";
import { cn } from "../../../lib/cn";
import { FloatButton } from "./FloatButton";
import { FloatButtonGroupContext } from "./context";

export type FloatButtonGroupProps = {
  /** Форма кнопок группы, наследуется дочерними `FloatButton` */
  shape?: "circle" | "square";
  /** Способ раскрытия группы */
  trigger?: "click" | "hover";
  /** Controlled-режим открытия */
  open?: boolean;
  /** Начальное состояние (uncontrolled) */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Иконка кнопки-триггера в закрытом состоянии */
  icon?: React.ElementType;
  /** Иконка кнопки-триггера в открытом состоянии */
  closeIcon?: React.ElementType;
  className?: string;
  /** `FloatButton` — элементы группы */
  children: React.ReactNode;
};

/** Кластер `FloatButton`, раскрывающийся по клику/hover вверх от основной кнопки. */
export function FloatButtonGroup({
  shape = "circle",
  trigger = "click",
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  icon,
  closeIcon = X,
  className,
  children,
}: FloatButtonGroupProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? (controlledOpen ?? false) : internalOpen;

  function setOpen(next: boolean) {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }

  const hoverProps =
    trigger === "hover"
      ? { onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false) }
      : {};

  return (
    <FloatButtonGroupContext.Provider value={{ shape }}>
      <div className={cn("relative flex flex-col items-center gap-3", className)} {...hoverProps}>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col items-center gap-3"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>

        <FloatButton
          icon={open ? closeIcon : icon}
          shape={shape}
          onClick={trigger === "click" ? () => setOpen(!open) : undefined}
        />
      </div>
    </FloatButtonGroupContext.Provider>
  );
}
