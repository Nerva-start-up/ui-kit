import { AlertTriangle, CheckCircle2, Info, Loader2, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../../lib/cn";
import { HStack } from "../../layout/HStack";
import { Stack } from "../../layout/Stack";
import { dismissMessage } from "./store";
import type { MessageItem, MessageType } from "./types";
import { useMessages } from "./useMessages";

const icons: Record<MessageType, React.ElementType> = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
  loading: Loader2,
};

const iconColors: Record<MessageType, string> = {
  success: "text-[var(--success)]",
  error: "text-[var(--error)]",
  warning: "text-[#fbbf24]",
  info: "text-[var(--info)]",
  loading: "text-[var(--text-muted)]",
};

function MessageRow({ item }: { item: MessageItem }) {
  useEffect(() => {
    if (!item.duration) return;
    const timer = setTimeout(() => dismissMessage(item.id), item.duration);
    return () => clearTimeout(timer);
  }, [item.id, item.duration]);

  const Icon = icons[item.type];

  return (
    <HStack asChild gap={2}>
      <motion.div
        layout
        initial={{ opacity: 0, y: -12, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.15 }}
        className={cn(
          "pointer-events-auto rounded-full border border-[var(--border)]",
          "bg-[var(--surface)] px-4 py-2 text-sm text-[var(--text)] shadow-lg"
        )}
      >
        <Icon
          size={16}
          className={cn(iconColors[item.type], item.type === "loading" && "animate-spin")}
        />
        {item.content}
      </motion.div>
    </HStack>
  );
}

export type MessageProps = {
  /** Максимум одновременно видимых сообщений — старые скрываются первыми */
  max?: number;
};

/**
 * Контейнер компактных всплывающих сообщений (antd-style), по центру сверху экрана.
 * Монтируется один раз в корне приложения; управляется императивно через `message.*`.
 */
export function Message({ max = 5 }: MessageProps) {
  const messages = useMessages();
  const visible = messages.slice(-max);

  if (typeof document === "undefined") return null;

  return createPortal(
    <Stack align="center" gap={2} className="pointer-events-none fixed inset-x-0 top-4 z-50">
      <AnimatePresence initial={false}>
        {visible.map((item) => (
          <MessageRow key={item.id} item={item} />
        ))}
      </AnimatePresence>
    </Stack>,
    document.body
  );
}
