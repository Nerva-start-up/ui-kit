import type React from "react";
import { dismissMessage, pushMessage } from "./store";
import type { MessageType } from "./types";

const DEFAULT_DURATION: Record<MessageType, number> = {
  success: 3000,
  error: 3000,
  warning: 3000,
  info: 3000,
  loading: 0,
};

function show(type: MessageType, content: React.ReactNode, duration?: number): string {
  return pushMessage(type, content, duration ?? DEFAULT_DURATION[type]);
}

/**
 * Императивный API компактных всплывающих сообщений (antd-style).
 * Требует смонтированного `<Message />` в корне приложения.
 *
 * @example
 * const id = message.loading('Сохранение…');
 * await save();
 * message.dismiss(id);
 * message.success('Сохранено');
 */
export const message = {
  success: (content: React.ReactNode, duration?: number) => show("success", content, duration),
  error: (content: React.ReactNode, duration?: number) => show("error", content, duration),
  warning: (content: React.ReactNode, duration?: number) => show("warning", content, duration),
  info: (content: React.ReactNode, duration?: number) => show("info", content, duration),
  loading: (content: React.ReactNode, duration?: number) => show("loading", content, duration),
  dismiss: (id: string) => dismissMessage(id),
};
