/** Позиция значения на треке в процентах (0..100). */
export function valueToPercent(value: number, min: number, max: number): number {
  if (max === min) return 0;
  return ((value - min) / (max - min)) * 100;
}
