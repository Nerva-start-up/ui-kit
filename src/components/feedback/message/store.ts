import type React from "react";
import type { MessageItem, MessageType } from "./types";

type Listener = () => void;

let messages: MessageItem[] = [];
const listeners = new Set<Listener>();

function emit() {
  for (const listener of listeners) listener();
}

/** Подписка на изменения списка сообщений (для `useSyncExternalStore`). */
export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getMessages(): MessageItem[] {
  return messages;
}

export function pushMessage(type: MessageType, content: React.ReactNode, duration: number): string {
  const id = crypto.randomUUID();
  messages = [...messages, { id, type, content, duration }];
  emit();
  return id;
}

export function dismissMessage(id: string) {
  messages = messages.filter((m) => m.id !== id);
  emit();
}
