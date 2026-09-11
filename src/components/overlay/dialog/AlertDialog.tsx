import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../../../lib/cn";
import { defaultTransition, dialogContent, overlayBg } from "../../../motion/variants";
import { Button } from "../../actions/button/Button";
import { HStack } from "../../layout/HStack";

export type AlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  /** красная кнопка confirm */
  destructive?: boolean;
  loading?: boolean;
};

/** Диалог подтверждения (деструктивные действия). */
export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Подтвердить",
  cancelLabel = "Отмена",
  onConfirm,
  destructive = false,
  loading = false,
}: AlertDialogProps) {
  return (
    <AlertDialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <AlertDialogPrimitive.Portal forceMount>
            <AlertDialogPrimitive.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/60 z-50"
                {...overlayBg}
                transition={defaultTransition}
              />
            </AlertDialogPrimitive.Overlay>
            <AlertDialogPrimitive.Content asChild>
              <motion.div
                className={cn(
                  "fixed left-1/2 top-1/2 z-50 w-full max-w-sm",
                  "bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)]",
                  "p-6 mx-4",
                  // см. комментарий в Dialog.tsx — нейтрализует pointer-events:none от Motion
                  "!pointer-events-auto"
                )}
                {...dialogContent}
                transition={defaultTransition}
              >
                <AlertDialogPrimitive.Title className="text-base font-bold text-[var(--text)] mb-2">
                  {title}
                </AlertDialogPrimitive.Title>
                <AlertDialogPrimitive.Description className="text-sm text-[var(--text-muted)] mb-5">
                  {description}
                </AlertDialogPrimitive.Description>
                <HStack justify="end" gap={2}>
                  <AlertDialogPrimitive.Cancel asChild>
                    <Button variant="outline" size="sm" disabled={loading}>
                      {cancelLabel}
                    </Button>
                  </AlertDialogPrimitive.Cancel>
                  <AlertDialogPrimitive.Action asChild>
                    <Button
                      variant={destructive ? "danger" : "primary"}
                      size="sm"
                      loading={loading}
                      onClick={onConfirm}
                    >
                      {confirmLabel}
                    </Button>
                  </AlertDialogPrimitive.Action>
                </HStack>
              </motion.div>
            </AlertDialogPrimitive.Content>
          </AlertDialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </AlertDialogPrimitive.Root>
  );
}
