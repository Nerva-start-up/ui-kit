import { useLayoutEffect, useRef, useState } from "react";
import type { ImageStatus } from "./types";

/** Отслеживает статус загрузки `<img>`; учитывает уже закэшированные (`complete`) изображения. */
export function useImageStatus(src: string) {
  const ref = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<ImageStatus>("loading");

  useLayoutEffect(() => {
    const img = ref.current;
    const cached = img?.getAttribute("src") === src && img.complete && img.naturalWidth > 0;
    setStatus(cached ? "loaded" : "loading");
  }, [src]);

  return {
    ref,
    status,
    handleLoad: () => setStatus("loaded"),
    handleError: () => setStatus("error"),
  };
}
