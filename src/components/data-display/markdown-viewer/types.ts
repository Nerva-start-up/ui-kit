/** Источник `.md`-файла: ссылка (загружается через `fetch`) или уже выбранный локальный файл */
export type MarkdownSource = string | File | Blob;

export type MarkdownViewerStatus = "loading" | "loaded" | "error";
