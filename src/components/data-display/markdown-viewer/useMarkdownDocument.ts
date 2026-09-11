import { useEffect, useRef, useState } from "react";
import type { MarkdownSource, MarkdownViewerStatus } from "./types";
import { resolveMarkdownText } from "./utils";

export type UseMarkdownDocumentOptions = {
  src: MarkdownSource;
  onLoad?: () => void;
  onError?: (error: Error) => void;
};

/** Загружает содержимое `.md`-файла в текст — дальнейший рендер отдаётся существующему `Markdown` */
export function useMarkdownDocument({ src, onLoad, onError }: UseMarkdownDocumentOptions) {
  const [status, setStatus] = useState<MarkdownViewerStatus>("loading");
  const [error, setError] = useState<Error | null>(null);
  const [content, setContent] = useState("");

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
        const text = await resolveMarkdownText(src);
        if (cancelled) return;

        setContent(text);
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

  return { status, error, content };
}
