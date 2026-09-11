import type { DocxSource } from "./types";

/** Резолвит источник в `Blob`: `File` уже является `Blob` (проходит как есть), строка — URL, который нужно загрузить */
export async function resolveDocxBlob(src: DocxSource): Promise<Blob> {
  if (typeof src !== "string") return src;

  const response = await fetch(src);
  if (!response.ok) {
    throw new Error(`Не удалось загрузить файл: ${response.status}`);
  }
  return response.blob();
}

export const DOCX_MIN_SCALE = 0.5;
export const DOCX_MAX_SCALE = 2;
const DOCX_SCALE_STEP = 0.1;

export function clampDocxScale(scale: number): number {
  return Math.min(Math.max(scale, DOCX_MIN_SCALE), DOCX_MAX_SCALE);
}

export function zoomInDocxScale(scale: number): number {
  return clampDocxScale(scale + DOCX_SCALE_STEP);
}

export function zoomOutDocxScale(scale: number): number {
  return clampDocxScale(scale - DOCX_SCALE_STEP);
}

/** Зажимает номер страницы в границы `[1, totalPages]` */
export function clampDocxPage(page: number, totalPages: number): number {
  return Math.min(Math.max(page, 1), Math.max(totalPages, 1));
}
