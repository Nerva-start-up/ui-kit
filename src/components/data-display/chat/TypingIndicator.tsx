import { motion } from "motion/react";
import { HStack } from "../../layout/HStack";
import { Stack } from "../../layout/Stack";

export type TypingIndicatorProps = {
  /** подпись над индикатором, например "Нора печатает..." */
  name?: string;
  className?: string;
};

/** Анимированные три точки «AI печатает», визуально совпадает со стилем ChatBubble role="ai". */
export function TypingIndicator({ name, className }: TypingIndicatorProps) {
  return (
    <Stack align="start" gap={0} className={className}>
      {name && <span className="text-[11px] text-[var(--text-muted)] mb-1 px-1">{name}</span>}
      <HStack
        gap={1.5}
        className="px-4 py-3 bg-[var(--surface-2)] rounded-[var(--radius-lg)] rounded-bl-[var(--radius-sm)]"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] shrink-0"
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 0.9,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.18,
              ease: "easeInOut",
            }}
          />
        ))}
      </HStack>
    </Stack>
  );
}
