/** JSON.stringify с отступом 2, если значение ещё не строка — иначе возвращает как есть. */
export function toDisplayJson(value: unknown): string {
  return typeof value === "string" ? value : JSON.stringify(value, null, 2);
}
