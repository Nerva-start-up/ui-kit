export const PDF_MIN_SCALE = 0.5;
export const PDF_MAX_SCALE = 3;
const PDF_SCALE_STEP = 0.25;

/**
 * URL воркера pdf.js по умолчанию (jsdelivr), версия синхронизирована с установленным `pdfjs-dist`.
 * `version` передаётся вызывающей стороной (из динамического `import("pdfjs-dist")`), а не читается
 * здесь напрямую — статический импорт `pdfjs-dist` на уровне модуля обращается к браузерным глобалам
 * (`DOMMatrix`) как побочному эффекту и падает в SSR-окружении без DOM.
 */
export function getDefaultPdfWorkerSrc(version: string): string {
  return `https://cdn.jsdelivr.net/npm/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
}

/** Зажимает масштаб в допустимый диапазон */
export function clampPdfScale(scale: number): number {
  return Math.min(Math.max(scale, PDF_MIN_SCALE), PDF_MAX_SCALE);
}

export function zoomInPdfScale(scale: number): number {
  return clampPdfScale(scale + PDF_SCALE_STEP);
}

export function zoomOutPdfScale(scale: number): number {
  return clampPdfScale(scale - PDF_SCALE_STEP);
}

/** Зажимает номер страницы в границы `[1, numPages]` */
export function clampPdfPage(page: number, numPages: number): number {
  return Math.min(Math.max(page, 1), Math.max(numPages, 1));
}
