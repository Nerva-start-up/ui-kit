function formatDate(date: Date): string {
  return date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
}

/** `от — до`; `от — …` пока вторая дата не выбрана; `''` для пустого диапазона. */
export function formatRangeLabel(start: Date | null, end: Date | null): string {
  if (!start) return "";
  if (!end) return `${formatDate(start)} — …`;
  return `${formatDate(start)} — ${formatDate(end)}`;
}
