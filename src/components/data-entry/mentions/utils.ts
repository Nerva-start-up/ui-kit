import type { MentionOption, MentionQuery } from "./types";

/**
 * Ищет активный запрос упоминания непосредственно перед `caretIndex` —
 * триггер должен стоять в начале строки или после пробела, а запрос не содержать пробелов.
 */
export function detectMentionQuery(
  text: string,
  caretIndex: number,
  trigger: string
): MentionQuery | null {
  const uptoCaret = text.slice(0, caretIndex);
  const triggerIndex = uptoCaret.lastIndexOf(trigger);
  if (triggerIndex === -1) return null;

  const charBefore = triggerIndex > 0 ? uptoCaret[triggerIndex - 1] : undefined;
  if (charBefore && !/\s/.test(charBefore)) return null;

  const query = uptoCaret.slice(triggerIndex + trigger.length);
  if (/\s/.test(query)) return null;

  return { start: triggerIndex, query };
}

export function filterMentionOptions(options: MentionOption[], query: string): MentionOption[] {
  const q = query.trim().toLowerCase();
  if (!q) return options;
  return options.filter(
    (o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q)
  );
}

/** Заменяет `trigger + query` на `trigger + value` и возвращает новый текст + позицию курсора после вставки. */
export function insertMention(
  text: string,
  start: number,
  caretIndex: number,
  option: MentionOption,
  trigger: string
): { text: string; caretIndex: number } {
  const before = text.slice(0, start);
  const after = text.slice(caretIndex);
  const inserted = `${trigger}${option.value} `;
  return { text: before + inserted + after, caretIndex: (before + inserted).length };
}
