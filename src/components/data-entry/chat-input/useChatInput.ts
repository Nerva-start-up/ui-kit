import type React from "react";
import { useLayoutEffect, useRef, useState } from "react";

export type UseChatInputOptions = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  disabled?: boolean;
  loading?: boolean;
};

/**
 * Controlled/uncontrolled текст композера: auto-grow textarea (высота подгоняется под
 * scrollHeight при каждом изменении текста) + Enter-сабмит, безопасный к IME-композиции.
 */
export function useChatInput({
  value,
  defaultValue = "",
  onChange,
  onSubmit,
  disabled = false,
  loading = false,
}: UseChatInputOptions) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const text = isControlled ? value : internal;

  // biome-ignore lint/correctness/useExhaustiveDependencies: text не читается в теле, но нужен как триггер — React уже применил его к textarea.value на этот момент рендера, эффект лишь перемеряет scrollHeight после этого
  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [text]);

  function setText(next: string) {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  function submit() {
    if (disabled || loading) return;
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit?.(text);
    if (!isControlled) setInternal("");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== "Enter" || event.shiftKey) return;
    // isComposing — IME (например ввод через 拼音/한글) ещё не зафиксировал символ,
    // keyCode 229 — фолбэк для браузеров, где isComposing на keydown не проставляется надёжно.
    if (event.nativeEvent.isComposing || event.keyCode === 229) return;
    event.preventDefault();
    submit();
  }

  const canSubmit = !disabled && !loading && text.trim().length > 0;

  return { text, textareaRef, setText, submit, handleKeyDown, canSubmit };
}
