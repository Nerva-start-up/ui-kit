import { useMemo } from "react";
import type { QRCodeLevel } from "./types";
import { type QrMatrix, buildQrMatrix } from "./utils";

/** Мемоизирует матрицу модулей; `null`, если `value` не удалось закодировать на уровне `level`. */
export function useQrMatrix(value: string, level: QRCodeLevel): QrMatrix | null {
  return useMemo(() => {
    try {
      return buildQrMatrix(value, level);
    } catch {
      return null;
    }
  }, [value, level]);
}
