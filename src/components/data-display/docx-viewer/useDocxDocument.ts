import { renderAsync } from "docx-preview";
import { useEffect, useRef, useState } from "react";
import type { DocxSource, DocxViewerStatus } from "./types";
import { resolveDocxBlob } from "./utils";

export type UseDocxDocumentOptions = {
  src: DocxSource;
  onLoad?: () => void;
  onError?: (error: Error) => void;
};

/** Загружает `.docx` и рендерит его через `docx-preview` напрямую в DOM-контейнер — библиотека работает императивно (не возвращает React-дерево), поэтому это один из немногих компонентов кита без виртуального DOM для основного содержимого. */
export function useDocxDocument({ src, onLoad, onError }: UseDocxDocumentOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<DocxViewerStatus>("loading");
  const [error, setError] = useState<Error | null>(null);

  const onLoadRef = useRef(onLoad);
  const onErrorRef = useRef(onError);
  onLoadRef.current = onLoad;
  onErrorRef.current = onError;

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setError(null);

    async function load() {
      try {
        const blob = await resolveDocxBlob(src);
        if (cancelled) return;

        const container = containerRef.current;
        if (!container) return;
        container.innerHTML = "";

        await renderAsync(blob, container, undefined, {
          inWrapper: true,
          ignoreLastRenderedPageBreak: false,
        });
        if (cancelled) return;

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
    };
  }, [src]);

  return { containerRef, status, error };
}
