import { cn } from "../../../lib/cn";
import { Stack } from "../../layout/Stack";

export type ChatBubbleProps = {
  /** user=правый оранжевый, ai=левый серый */
  sender: "user" | "ai";
  /** текст сообщения */
  content: string;
  /** имя над пузырём */
  name?: string;
  /** время под пузырём */
  timestamp?: string;
  className?: string;
};

/** Сообщение в чате — пользователь или AI. Разные стили и выравнивание. */
export function ChatBubble({ sender, content, name, timestamp, className }: ChatBubbleProps) {
  const isUser = sender === "user";

  return (
    <Stack
      gap={0}
      align={isUser ? "end" : "start"}
      self={isUser ? "end" : "start"}
      className={cn("max-w-[82%]", className)}
    >
      {name && <span className="text-[11px] text-[var(--text-muted)] mb-1 px-1">{name}</span>}

      <div
        className={cn(
          "px-4 py-2.5 text-[15px] leading-relaxed whitespace-pre-wrap break-words",
          isUser
            ? "bg-[var(--primary)] text-white rounded-[var(--radius-lg)] rounded-br-[var(--radius-sm)]"
            : "bg-[var(--surface-2)] text-[var(--text)] rounded-[var(--radius-lg)] rounded-bl-[var(--radius-sm)]"
        )}
      >
        {content}
      </div>

      {timestamp && (
        <span className="text-[11px] text-[var(--text-muted)] mt-1 px-1">{timestamp}</span>
      )}
    </Stack>
  );
}
