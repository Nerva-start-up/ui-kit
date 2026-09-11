import type { PDFDocumentLoadingTask, PDFDocumentProxy } from "pdfjs-dist";
import { useEffect, useRef, useState } from "react";
import type { PdfSource, PdfViewerStatus } from "./types";
import { getDefaultPdfWorkerSrc } from "./utils";

export type UsePdfDocumentOptions = {
  src: PdfSource;
  workerSrc?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
};

/** Загружает PDF-документ через pdf.js: строка резолвится как URL (range-запросы на стороне pdf.js), `File`/`Blob` — как бинарные данные */
export function usePdfDocument({ src, workerSrc, onLoad, onError }: UsePdfDocumentOptions) {
  const [status, setStatus] = useState<PdfViewerStatus>("loading");
  const [error, setError] = useState<Error | null>(null);
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);

  const onLoadRef = useRef(onLoad);
  const onErrorRef = useRef(onError);
  onLoadRef.current = onLoad;
  onErrorRef.current = onError;

  useEffect(() => {
    let cancelled = false;
    let loadingTask: PDFDocumentLoadingTask | null = null;

    setStatus("loading");
    setError(null);
    setPdf(null);

    async function load() {
      try {
        // pdfjs-dist обращается к DOMMatrix на уровне модуля — импортируем его лениво,
        // только когда PDF реально загружается в браузере, чтобы не ломать SSR без DOM
        const { GlobalWorkerOptions, getDocument, version } = await import("pdfjs-dist");
        if (cancelled) return;

        GlobalWorkerOptions.workerSrc = workerSrc ?? getDefaultPdfWorkerSrc(version);

        const params = typeof src === "string" ? { url: src } : { data: await src.arrayBuffer() };
        if (cancelled) return;

        loadingTask = getDocument(params);
        const doc = await loadingTask.promise;
        if (cancelled) return;

        setPdf(doc);
        setStatus("loaded");
        onLoadRef.current?.();
      } catch (err) {
        if (cancelled) return;
        const resolvedError = err instanceof Error ? err : new Error(String(err));
        setError(resolvedError);
        setStatus("error");
        onErrorRef.current?.(resolvedError);
      }
    }

    load();

    return () => {
      cancelled = true;
      loadingTask?.destroy();
    };
  }, [src, workerSrc]);

  return { status, error, pdf, numPages: pdf?.numPages ?? 0 };
}
