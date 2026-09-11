/** Источник PDF: ссылка (загружается через `fetch`/range-запросы pdf.js) или уже выбранный локальный файл */
export type PdfSource = string | File | Blob;

export type PdfViewerStatus = "loading" | "loaded" | "error";
