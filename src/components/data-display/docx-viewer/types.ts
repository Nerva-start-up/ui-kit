/** Источник DOCX: ссылка (загружается через `fetch`) или уже выбранный локальный файл */
export type DocxSource = string | File | Blob;

export type DocxViewerStatus = "loading" | "loaded" | "error";
