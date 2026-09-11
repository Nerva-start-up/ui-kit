import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { cn } from "../../../lib/cn";
import { useScrollVisibility } from "./useScrollVisibility";
import { type FloatButtonContainer, getScrollContainer, scrollToTop } from "./utils";

export type FloatButtonBackTopProps = {
  /** Порог прокрутки (px), после которого кнопка появляется */
  visibilityHeight?: number;
  /** Скролл-контейнер, если не `window` */
  container?: FloatButtonContainer;
  /** Иконка кнопки */
  icon?: React.ElementType;
  onClick?: () => void;
  className?: string;
};

/** Плавающая кнопка «наверх» — появляется после прокрутки на `visibilityHeight` и плавно скроллит к началу. */
export function FloatButtonBackTop({
  visibilityHeight = 400,
  container,
  icon: Icon = ArrowUp,
  onClick,
  className,
}: FloatButtonBackTopProps) {
  const visible = useScrollVisibility(visibilityHeight, container);

  function handleClick() {
    scrollToTop(getScrollContainer(container));
    onClick?.();
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
          onClick={handleClick}
          className={cn(
            "flex h-14 w-14 cursor-pointer items-center justify-center rounded-full shadow-lg",
            "bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--surface-2)]",
            className
          )}
        >
          <Icon size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
