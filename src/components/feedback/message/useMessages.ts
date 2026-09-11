import { useSyncExternalStore } from "react";
import { getMessages, subscribe } from "./store";

/** Реактивный снимок текущих сообщений из глобального стора. */
export function useMessages() {
  return useSyncExternalStore(subscribe, getMessages, getMessages);
}
