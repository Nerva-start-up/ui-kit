export function clampProgress(value: number): number {
  return Math.min(100, Math.max(0, value));
}

export function getCircleCircumference(radius: number): number {
  return 2 * Math.PI * radius;
}
