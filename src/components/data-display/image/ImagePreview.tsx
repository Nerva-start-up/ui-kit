import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../../lib/cn";
import { defaultTransition, overlayBg } from "../../../motion/variants";

export type ImagePreviewProps = {
  src: string;
  alt: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/** Полноэкранный просмотр изображения — затемнение фона, закрытие по Esc/клику на фон. */
export function ImagePreview({ src, alt, open, onOpenChange }: ImagePreviewProps) {
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onOpenChange(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.dialog
          open
          aria-modal="true"
          aria-label={alt}
          className={cn(
            "fixed inset-0 z-50 m-0 flex h-full max-h-none w-full max-w-none",
            "items-center justify-center border-0 bg-black/80 p-6"
          )}
          onClick={() => onOpenChange(false)}
          {...overlayBg}
          transition={defaultTransition}
        >
          <motion.img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={defaultTransition}
            className="max-h-full max-w-full rounded-[var(--radius-md)] object-contain"
          />
          <button
            type="button"
            aria-label="Закрыть"
            onClick={() => onOpenChange(false)}
            className={cn(
              "fixed right-4 top-4 z-50 rounded-full bg-black/40 p-2 text-white/80",
              "transition-colors hover:bg-black/60 hover:text-white"
            )}
          >
            <X size={20} />
          </button>
        </motion.dialog>
      )}
    </AnimatePresence>,
    document.body
  );
}
