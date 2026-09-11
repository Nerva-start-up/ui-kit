import { Skeleton } from "@components/feedback/skeleton/Skeleton";
import { Spinner } from "@components/feedback/spinner/Spinner";
import { Center } from "@components/layout/Center";
import { Stack } from "@components/layout/Stack";
import { useKeyPress } from "@hooks/useKeyPress";
import { cn } from "@lib/cn";
import { FileWarning } from "lucide-react";
import { useRef, useState } from "react";
import { PdfViewerToolbar } from "./PdfViewerToolbar";
import type { PdfSource } from "./types";
import { usePdfDocument } from "./usePdfDocument";
import { usePdfPage } from "./usePdfPage";
import { clampPdfPage, clampPdfScale, zoomInPdfScale, zoomOutPdfScale } from "./utils";

export type PdfViewerProps = {
  /** Ссылка на PDF или уже выбранный локальный файл (`File`/`Blob`) */
  src: PdfSource;
  /** Controlled номер текущей страницы (с 1) */
  page?: number;
  /** Uncontrolled начальная страница */
  defaultPage?: number;
  /** Callback смены страницы (кнопки навигации, ввод номера, стрелки клавиатуры) */
  onPageChange?: (page: number) => void;
  /** Controlled масштаб (1 = 100%) */
  scale?: number;
  /** Uncontrolled начальный масштаб */
  defaultScale?: number;
  /** Callback смены масштаба (кнопки зума) */
  onScaleChange?: (scale: number) => void;
  /** URL воркера pdf.js. По умолчанию — CDN (jsdelivr), версия синхронизирована с установленным `pdfjs-dist` */
  workerSrc?: string;
  /** Показывать встроенную панель навигации/зума (default: `true`) */
  toolbar?: boolean;
  /** Высота видимой области — при зуме страница скроллится внутри неё, а не растягивает layout (default: `600`) */
  height?: number | string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  className?: string;
};

/** Постраничный просмотр PDF на базе `pdf.js`: страница рендерится в `<canvas>` внутри скроллируемой области фиксированной высоты, с навигацией по страницам (кнопки, ввод номера, стрелки клавиатуры при фокусе) и зумом. */
export function PdfViewer({
  src,
  page,
  defaultPage = 1,
  onPageChange,
  scale,
  defaultScale = 1,
  onScaleChange,
  workerSrc,
  toolbar = true,
  height = 600,
  onLoad,
  onError,
  className,
}: PdfViewerProps) {
  const { status, error, pdf, numPages } = usePdfDocument({ src, workerSrc, onLoad, onError });

  const [internalPage, setInternalPage] = useState(defaultPage);
  const isPageControlled = page !== undefined;
  const currentPage = clampPdfPage(isPageControlled ? page : internalPage, numPages || 1);

  const [internalScale, setInternalScale] = useState(defaultScale);
  const isScaleControlled = scale !== undefined;
  const currentScale = isScaleControlled ? scale : internalScale;

  function setPage(next: number) {
    const clamped = clampPdfPage(next, numPages || 1);
    if (!isPageControlled) setInternalPage(clamped);
    onPageChange?.(clamped);
  }

  function setScale(next: number) {
    const clamped = clampPdfScale(next);
    if (!isScaleControlled) setInternalScale(clamped);
    onScaleChange?.(clamped);
  }

  const { canvasRef, rendering } = usePdfPage({
    pdf,
    pageNumber: currentPage,
    scale: currentScale,
  });

  const viewportRef = useRef<HTMLDivElement>(null);
  useKeyPress(
    ["ArrowLeft", "ArrowRight"],
    (e) => {
      e.preventDefault();
      setPage(e.key === "ArrowLeft" ? currentPage - 1 : currentPage + 1);
    },
    { target: viewportRef, enabled: status === "loaded" }
  );

  if (status === "error") {
    return (
      <Center
        className={cn(
          "min-h-[200px] w-full rounded-[var(--radius-md)] bg-[var(--surface-2)] text-[var(--text-muted)]",
          className
        )}
      >
        <Stack gap={2} align="center">
          <FileWarning size={24} />
          <span className="text-sm">Не удалось открыть PDF{error ? `: ${error.message}` : ""}</span>
        </Stack>
      </Center>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {status === "loading" && (
        <Skeleton className="rounded-[var(--radius-md)]" width="100%" height={height} />
      )}
      <div
        ref={viewportRef}
        tabIndex={-1}
        aria-label="Область просмотра PDF, стрелки влево/вправо переключают страницу"
        className={cn(
          "relative overflow-auto rounded-[var(--radius-md)] bg-[var(--surface-2)] outline-none",
          "focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
          status === "loading" && "hidden"
        )}
        style={{ height }}
      >
        <canvas ref={canvasRef} className="mx-auto block" />
        {rendering && (
          // sticky-обёртка нулевой высоты — не добавляет скролл-высоты контейнеру,
          // но её видимый (overflow не обрезан) центрированный контент остаётся
          // прибитым к текущей видимой области при скролле
          <div className="sticky left-0 top-0 h-0">
            <div className="flex items-center justify-center" style={{ height }}>
              <Spinner size="lg" className="text-[var(--text-muted)]" />
            </div>
          </div>
        )}
      </div>
      {toolbar && status === "loaded" && (
        <PdfViewerToolbar
          page={currentPage}
          numPages={numPages}
          scale={currentScale}
          onPrev={() => setPage(currentPage - 1)}
          onNext={() => setPage(currentPage + 1)}
          onPageInput={setPage}
          onZoomIn={() => setScale(zoomInPdfScale(currentScale))}
          onZoomOut={() => setScale(zoomOutPdfScale(currentScale))}
        />
      )}
    </div>
  );
}
