import { Text } from "@components/typography/Text";
import { cn } from "@lib/cn";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";
import { BrandMark } from "./BrandMark";

export type BrandSplashProps = {
  /** Показать/скрыть сплэш — обычно флаг готовности приложения */
  open: boolean;
  /** Текст под глифом, например «Загрузка…» */
  label?: string;
  className?: string;
};

/** Полноэкранный брендированный splash — для загрузки приложения при старте. */
export function BrandSplash({ open, label, className }: BrandSplashProps) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-[var(--bg)]",
            className
          )}
        >
          <BrandMark size={72} animated />
          {label && (
            <Text as="span" size="sm" variant="muted">
              {label}
            </Text>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
