import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { cn } from "../../../lib/cn";
import { defaultTransition, dialogContent, overlayBg } from "../../../motion/variants";
import { HStack } from "../../layout/HStack";
import { ignoreNestedPopperInteraction } from "./preventNestedPopperClose";

export type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** заголовок */
  title: string;
  /** подзаголовок */
  description?: string;
  /** тело диалога */
  children: React.ReactNode;
  /** кнопки внизу */
  footer?: React.ReactNode;
  className?: string;
};

/** Модальное окно с Motion-анимацией (scale + fade). */
export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
}: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay forceMount asChild>
              <motion.div
                key="dialog-backdrop"
                className="fixed inset-0 bg-black/60 z-50"
                {...overlayBg}
                transition={defaultTransition}
              />
            </DialogPrimitive.Overlay>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Content
              forceMount
              asChild
              onInteractOutside={ignoreNestedPopperInteraction}
            >
              <motion.div
                key="dialog-content"
                className={cn(
                  "fixed left-1/2 top-1/2 z-50 w-full max-w-md max-h-[90vh] overflow-y-auto",
                  "bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)]",
                  "p-6 mx-4",
                  // нейтрализует pointer-events:none, который Motion выставляет инлайн-стилем в ответ
                  // на aria-hidden, вешаемый на этот div чужим hideOthers() (например, немодальным
                  // Radix Select без opt-out — см. preventNestedPopperClose.ts)
                  "!pointer-events-auto",
                  className
                )}
                {...dialogContent}
                transition={defaultTransition}
              >
                <HStack justify="between" className="mb-5">
                  <DialogPrimitive.Title className="text-lg font-bold text-[var(--text)]">
                    {title}
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Close asChild>
                    <button
                      type="button"
                      className="text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] rounded-[var(--radius-sm)] p-1 transition-colors"
                      aria-label="Закрыть"
                    >
                      <X size={18} />
                    </button>
                  </DialogPrimitive.Close>
                </HStack>
                {description && (
                  <DialogPrimitive.Description className="text-sm text-[var(--text-muted)] mb-4">
                    {description}
                  </DialogPrimitive.Description>
                )}
                <div>{children}</div>
                {footer && (
                  <HStack justify="end" gap={2} className="mt-5">
                    {footer}
                  </HStack>
                )}
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
