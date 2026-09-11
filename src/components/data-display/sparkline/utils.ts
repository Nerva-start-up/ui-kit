export type SparklinePoint = { x: number; y: number };

/** Нормализует значения в координаты SVG (y инвертирован, с отступом `padding` сверху/снизу). */
export function buildSparklinePoints(
  data: number[],
  width: number,
  height: number,
  padding: number
): SparklinePoint[] {
  if (data.length === 0) return [];
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const innerHeight = height - padding * 2;
  const stepX = data.length > 1 ? width / (data.length - 1) : 0;

  return data.map((value, i) => ({
    x: i * stepX,
    y: padding + innerHeight - ((value - min) / range) * innerHeight,
  }));
}

export function pointsToPath(points: SparklinePoint[]): string {
  if (points.length === 0) return "";
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
}

/** Замыкает линию до базовой линии `height` — для полупрозрачной заливки под графиком. */
export function pointsToAreaPath(points: SparklinePoint[], height: number): string {
  if (points.length === 0) return "";
  const line = pointsToPath(points);
  const last = points[points.length - 1];
  const first = points[0];
  return `${line} L${last.x},${height} L${first.x},${height} Z`;
}
