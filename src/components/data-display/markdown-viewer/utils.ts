import type { MarkdownSource } from "./types";

/** Резолвит источник в текст: `File`/`Blob` читается напрямую, строка — URL, который нужно загрузить */
export async function resolveMarkdownText(src: MarkdownSource): Promise<string> {
  if (typeof src !== "string") return src.text();

  const response = await fetch(src);
  if (!response.ok) {
    throw new Error(`Не удалось загрузить файл: ${response.status}`);
  }
  return response.text();
}

export const MD_MIN_SCALE = 0.85;
export const MD_MAX_SCALE = 1.5;
const MD_SCALE_STEP = 0.1;

export function clampMdScale(scale: number): number {
  return Math.min(Math.max(scale, MD_MIN_SCALE), MD_MAX_SCALE);
}

export function zoomInMdScale(scale: number): number {
  return clampMdScale(scale + MD_SCALE_STEP);
}

export function zoomOutMdScale(scale: number): number {
  return clampMdScale(scale - MD_SCALE_STEP);
}
