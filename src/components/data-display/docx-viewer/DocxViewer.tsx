import { Skeleton } from "@components/feedback/skeleton/Skeleton";
import { Center } from "@components/layout/Center";
import { Stack } from "@components/layout/Stack";
import { cn } from "@lib/cn";
import { FileWarning } from "lucide-react";
import type React from "react";
import { useRef } from "react";
import { DocxViewerToolbar } from "./DocxViewerToolbar";
import type { DocxSource } from "./types";
import { useDocxDocument } from "./useDocxDocument";
import { useDocxPages } from "./useDocxPages";
import { useDocxZoom } from "./useDocxZoom";
import { zoomInDocxScale, zoomOutDocxScale } from "./utils";

export type DocxViewerProps = {
  /** Ссылка на DOCX или уже выбранный локальный файл (`File`/`Blob`) */
  src: DocxSource;
  /** Controlled номер видимой страницы (с 1) — обновляется и при скролле, и задаёт скролл при изменении снаружи */
  page?: number;
  /** Uncontrolled начальная страница, к которой проскроллит при открытии */
  defaultPage?: number;
  /** Callback смены страницы — при скролле, кнопках навигации или ручном вводе номера */
  onPageChange?: (page: number) => void;
  /** Controlled масштаб (1 = 100%) */
  scale?: number;
  /** Uncontrolled начальный масштаб */
  defaultScale?: number;
  /** Callback смены масштаба (кнопки зума) */
  onScaleChange?: (scale: number) => void;
  /** Показывать встроенную панель навигации/зума (default: `true`) */
  toolbar?: boolean;
  /** Высота видимой области — при зуме документ скроллится внутри неё, а не растягивает layout (default: `600`) */
  height?: number | string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  className?: string;
};

/** Просмотр `.docx` с сохранением вёрстки/пагинации Word — рендерит через `docx-preview` в скроллируемую область фиксированной высоты, с зумом и индикатором текущей страницы при скролле. */
export function DocxViewer({
  src,
  page,
  defaultPage = 1,
  onPageChange,
  scale,
  defaultScale = 1,
  onScaleChange,
  toolbar = true,
  height = 600,
  onLoad,
  onError,
  className,
}: DocxViewerProps) {
  const { containerRef, status, error } = useDocxDocument({ src, onLoad, onError });
  const viewportRef = useRef<HTMLDivElement>(null);

  const {
    scale: currentScale,
    setScale,
    naturalSize,
  } = useDocxZoom({
    containerRef,
    scale,
    defaultScale,
    onScaleChange,
  });

  const { currentPage, totalPages, setPage } = useDocxPages({
    containerRef,
    viewportRef,
    status,
    page,
    defaultPage,
    onPageChange,
  });

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
          <span className="text-sm">
            Не удалось открыть документ{error ? `: ${error.message}` : ""}
          </span>
        </Stack>
      </Center>
    );
  }

  const spacerStyle: React.CSSProperties | undefined = naturalSize
    ? {
        position: "relative",
        width: naturalSize.width * currentScale,
        height: naturalSize.height * currentScale,
      }
    : undefined;

  const contentStyle: React.CSSProperties = naturalSize
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        width: naturalSize.width,
        transform: `scale(${currentScale})`,
        transformOrigin: "top left",
      }
    : {};

  return (
    <div className={cn("relative", className)}>
      {status === "loading" && (
        <Stack
          gap={2}
          className="absolute inset-0 rounded-[var(--radius-md)] bg-[var(--surface-2)] p-4"
        >
          <Skeleton height={22} width="45%" />
          <Skeleton height={13} width="100%" />
          <Skeleton height={13} width="96%" />
          <Skeleton height={13} width="92%" />
          <Skeleton height={13} width="98%" />
          <Skeleton height={13} width="60%" />
        </Stack>
      )}
      <div
        ref={viewportRef}
        className={cn(
          "overflow-auto rounded-[var(--radius-md)] bg-[var(--surface-2)] p-4",
          status === "loading" && "invisible"
        )}
        style={{ height }}
      >
        <div style={spacerStyle}>
          <div ref={containerRef} style={contentStyle} />
        </div>
      </div>
      {toolbar && status === "loaded" && (
        <DocxViewerToolbar
          page={currentPage}
          numPages={totalPages}
          scale={currentScale}
          onPrev={() => setPage(currentPage - 1)}
          onNext={() => setPage(currentPage + 1)}
          onPageInput={setPage}
          onZoomIn={() => setScale(zoomInDocxScale(currentScale))}
          onZoomOut={() => setScale(zoomOutDocxScale(currentScale))}
        />
      )}
    </div>
  );
}
