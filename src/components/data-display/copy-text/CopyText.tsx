import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useCallback, useState } from "react";
import { cn } from "../../../lib/cn";
import { CopyTextContext } from "./context";

export type CopyTextProps = {
  text: string;
  /** Текст оверлея при копировании (default: 'Скопировано!') */
  copiedText?: string;
  /** колбэк после копирования */
  onCopied?: () => void;
  className?: string;
  children: React.ReactNode;
};

/** Root — кликабельный контейнер, анимированный оверлей. */
export function CopyText({
  text,
  copiedText = "Скопировано!",
  onCopied,
  className,
  children,
}: CopyTextProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      onCopied?.();
      setTimeout(() => setCopied(false), 1500);
    });
  }, [text, onCopied]);

  return (
    <CopyTextContext.Provider value={{ text, copied, onCopy }}>
      <button
        type="button"
        onClick={onCopy}
        aria-label={`Скопировать: ${text}`}
        className={cn(
          "relative flex items-center max-w-full cursor-pointer select-none text-left",
          "rounded-[var(--radius-md)] border px-3 py-1.5 overflow-hidden",
          "bg-[var(--surface-2)] transition-colors duration-150",
          copied
            ? "border-[var(--primary)]"
            : "border-[var(--border)] hover:border-[var(--primary)]/50",
          className
        )}
      >
        {children}

        {/* Overlay при копировании */}
        <AnimatePresence>
          {copied && (
            <motion.div
              key="copy-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-[var(--primary)]/10 rounded-[inherit]"
            >
              <motion.span
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-sm font-semibold text-[var(--primary)]"
              >
                {copiedText}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </CopyTextContext.Provider>
  );
}
