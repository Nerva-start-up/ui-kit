/** Доля закраски звезды с индексом `index` (0-based) при текущем значении рейтинга. */
export function getStarFill(index: number, value: number, allowHalf: boolean): 0 | 0.5 | 1 {
  const diff = value - index;
  if (diff >= 1) return 1;
  if (allowHalf && diff >= 0.5) return 0.5;
  return 0;
}

/** Вычисляет значение рейтинга по позиции курсора внутри звезды с индексом `index` (0-based). */
export function getValueFromPointer(
  index: number,
  offsetX: number,
  width: number,
  allowHalf: boolean
): number {
  const isHalf = allowHalf && offsetX < width / 2;
  return index + (isHalf ? 0.5 : 1);
}
