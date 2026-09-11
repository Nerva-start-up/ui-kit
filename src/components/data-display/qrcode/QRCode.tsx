import type React from "react";
import { useId } from "react";
import { cn } from "../../../lib/cn";
import type { QRCodeLevel } from "./types";
import { useQrMatrix } from "./useQrMatrix";
import { buildQrPath } from "./utils";

const QUIET_ZONE = 4;

export type QRCodeProps = {
  /** Кодируемые данные — URL, текст, vCard и т.д. */
  value: string;
  /** Размер QR-кода в пикселях (квадрат) */
  size?: number;
  /** Уровень коррекции ошибок: L=7%, M=15%, Q=25%, H=30% восстанавливаемых данных */
  level?: QRCodeLevel;
  /** Цвет тёмных модулей */
  color?: string;
  /** Цвет фона */
  background?: string;
  /** Логотип по центру — под него автоматически резервируется область (см. `logoRatio`) */
  logo?: React.ReactNode;
  /** Доля от `size`, которую займёт логотип (default 0.22). При `level="H"` до ~0.3 код остаётся читаемым */
  logoRatio?: number;
  className?: string;
};

/** QR-код на SVG. Данные кодируются на клиенте, без обращения к внешним сервисам. */
export function QRCode({
  value,
  size = 200,
  level = "M",
  color = "var(--text)",
  background = "var(--surface)",
  logo,
  logoRatio = 0.22,
  className,
}: QRCodeProps) {
  const titleId = useId();
  const matrix = useQrMatrix(value, level);

  if (!matrix) {
    return (
      <div
        role="img"
        aria-label="QR-код: данные слишком длинные для кодирования"
        className={cn(
          "flex items-center justify-center rounded-[var(--radius-md)] border",
          "border-[var(--border)] p-2 text-center text-xs text-[var(--error)]",
          className
        )}
        style={{ width: size, height: size, background }}
      >
        Не удалось закодировать данные
      </div>
    );
  }

  const totalModules = matrix.length + QUIET_ZONE * 2;
  const cell = size / totalModules;
  const path = buildQrPath(matrix, cell, QUIET_ZONE * cell);

  const logoBox = logo ? size * logoRatio : 0;
  const logoOffset = (size - logoBox) / 2;

  return (
    <div
      className={cn("relative inline-flex overflow-hidden rounded-[var(--radius-md)]", className)}
    >
      <svg
        role="img"
        aria-labelledby={titleId}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <title id={titleId}>{value}</title>
        <rect width={size} height={size} fill={background} />
        <path d={path} fill={color} />
      </svg>

      {logo && (
        <div
          className="absolute flex items-center justify-center overflow-hidden rounded-[var(--radius-sm)]"
          style={{
            width: logoBox,
            height: logoBox,
            left: logoOffset,
            top: logoOffset,
            background,
          }}
        >
          {logo}
        </div>
      )}
    </div>
  );
}
