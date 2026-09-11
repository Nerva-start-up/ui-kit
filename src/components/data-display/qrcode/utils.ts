import qrcodegen from "qrcode-generator";
import type { QRCodeLevel } from "./types";

export type QrMatrix = boolean[][];

/** Строит булеву матрицу модулей QR-кода (type number подбирается автоматически). */
export function buildQrMatrix(value: string, level: QRCodeLevel): QrMatrix {
  const qr = qrcodegen(0, level);
  qr.addData(value);
  qr.make();

  const count = qr.getModuleCount();
  const matrix: QrMatrix = [];
  for (let row = 0; row < count; row++) {
    const line: boolean[] = [];
    for (let col = 0; col < count; col++) {
      line.push(qr.isDark(row, col));
    }
    matrix.push(line);
  }
  return matrix;
}

/** Объединяет тёмные модули в один SVG path — чётче и быстрее, чем `rect` на каждый модуль. */
export function buildQrPath(matrix: QrMatrix, cellSize: number, offset = 0): string {
  let d = "";
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col]) {
        const x = offset + col * cellSize;
        const y = offset + row * cellSize;
        d += `M${x},${y}h${cellSize}v${cellSize}h${-cellSize}z`;
      }
    }
  }
  return d;
}
