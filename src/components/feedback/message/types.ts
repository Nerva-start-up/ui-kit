import type React from "react";

export type MessageType = "success" | "error" | "warning" | "info" | "loading";

export type MessageItem = {
  id: string;
  type: MessageType;
  content: React.ReactNode;
  /** ms до автоскрытия; `0` — не скрывается автоматически (используется для `loading`) */
  duration: number;
};
