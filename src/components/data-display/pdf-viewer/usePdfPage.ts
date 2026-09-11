import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";
import { useEffect, useRef, useState } from "react";

export type UsePdfPageOptions = {
  pdf: PDFDocumentProxy | null;
  pageNumber: number;
  scale: number;
};

/** Рендерит одну страницу PDF на `canvas`. Отменяет предыдущий `RenderTask` при смене страницы/масштаба или размонтировании — pdf.js падает при параллельном рендере одного и того же canvas. */
export function usePdfPage({ pdf, pageNumber, scale }: UsePdfPageOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rendering, setRendering] = useState(false);

  useEffect(() => {
    if (!pdf) return;

    let cancelled = false;
    let task: RenderTask | null = null;

    async function renderPage() {
      setRendering(true);
      try {
        const page = await pdf?.getPage(pageNumber);
        if (cancelled || !page) return;

        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        task = page.render({ canvas, viewport });
        await task.promise;
      } catch {
        // отменённый рендер — ожидаемо при быстрой смене страницы/масштаба
      } finally {
        if (!cancelled) setRendering(false);
      }
    }

    renderPage();

    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [pdf, pageNumber, scale]);

  return { canvasRef, rendering };
}
