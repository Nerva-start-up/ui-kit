import type React from "react";
import { useRef, useState } from "react";
import type { MentionOption, MentionQuery } from "./types";
import { detectMentionQuery, filterMentionOptions, insertMention } from "./utils";

export type UseMentionsOptions = {
  options: MentionOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onMention?: (option: MentionOption) => void;
  trigger: string;
};

/** Controlled/uncontrolled текст + обнаружение активного `@query`, фильтрация и вставка упоминания. */
export function useMentions({
  options,
  value,
  defaultValue = "",
  onChange,
  onMention,
  trigger,
}: UseMentionsOptions) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const text = isControlled ? value : internal;

  const [query, setQuery] = useState<MentionQuery | null>(null);
  const [highlighted, setHighlighted] = useState(0);

  const suggestions = query ? filterMentionOptions(options, query.query) : [];

  function commitText(next: string) {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  function handleChange(nextText: string, caretIndex: number) {
    commitText(nextText);
    setQuery(detectMentionQuery(nextText, caretIndex, trigger));
    setHighlighted(0);
  }

  function selectOption(option: MentionOption) {
    if (!query) return;
    const caretIndex = textareaRef.current?.selectionStart ?? text.length;
    const { text: nextText, caretIndex: nextCaret } = insertMention(
      text,
      query.start,
      caretIndex,
      option,
      trigger
    );
    commitText(nextText);
    onMention?.(option);
    setQuery(null);

    requestAnimationFrame(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(nextCaret, nextCaret);
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!query || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((i) => (i - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      selectOption(suggestions[highlighted]);
    } else if (e.key === "Escape") {
      setQuery(null);
    }
  }

  return {
    textareaRef,
    text,
    query,
    suggestions,
    highlighted,
    handleChange,
    handleKeyDown,
    selectOption,
  };
}
