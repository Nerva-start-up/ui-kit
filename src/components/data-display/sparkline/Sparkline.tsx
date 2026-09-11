import { useMemo } from "react";
import { cn } from "../../../lib/cn";
import { buildSparklinePoints, pointsToAreaPath, pointsToPath } from "./utils";

export type SparklineProps = {
  /** Числовые значения тренда, слева направо */
  data: number[];
  /** Ширина SVG, px */
  width?: number;
  /** Высота SVG, px */
  height?: number;
  /** Цвет линии — по умолчанию приглушённый (de-emphasis); акцент несёт точка на последнем значении */
  color?: string;
  /** Показывать акцентную точку на последнем значении */
  showEndpoint?: boolean;
  /** Цвет акцентной точки */
  endpointColor?: string;
  /** Полупрозрачная заливка (~10%) под линией */
  fill?: boolean;
  className?: string;
};

/** Компактный inline-график тренда без осей/легенды — для `StatCard` и подобных метрик. */
export function Sparkline({
  data,
  width = 120,
  height = 32,
  color = "var(--text-muted)",
  showEndpoint = true,
  endpointColor = "var(--primary)",
  fill = false,
  className,
}: SparklineProps) {
  const padding = 3;

  const points = useMemo(
    () => buildSparklinePoints(data, width, height, padding),
    [data, width, height]
  );
  const linePath = useMemo(() => pointsToPath(points), [points]);
  const areaPath = useMemo(() => pointsToAreaPath(points, height), [points, height]);
  const last = points[points.length - 1];

  if (points.length === 0) return null;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("overflow-visible", className)}
      role="img"
      aria-label={`Тренд: ${data.join(", ")}`}
    >
      {fill && <path d={areaPath} fill={color} opacity={0.1} />}
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {showEndpoint && last && (
        <circle
          cx={last.x}
          cy={last.y}
          r={2.5}
          fill={endpointColor}
          stroke="var(--surface)"
          strokeWidth={1.5}
        />
      )}
    </svg>
  );
}
