import { Markdown, type MarkdownHeading } from "@components/data-display/markdown/Markdown";
import { Skeleton } from "@components/feedback/skeleton/Skeleton";
import { Center } from "@components/layout/Center";
import { Stack } from "@components/layout/Stack";
import { cn } from "@lib/cn";
import { FileWarning } from "lucide-react";
import { useRef, useState } from "react";
import { MarkdownViewerToolbar } from "./MarkdownViewerToolbar";
import type { MarkdownSource } from "./types";
import { useMarkdownDocument } from "./useMarkdownDocument";
import { useReadingProgress } from "./useReadingProgress";
import { clampMdScale, zoomInMdScale, zoomOutMdScale } from "./utils";

export type MarkdownViewerProps = {
  /** Ссылка на `.md`-файл или уже выбранный локальный файл (`File`/`Blob`) */
  src: MarkdownSource;
  /** Controlled размер текста (1 = 100%) */
  scale?: number;
  /** Uncontrolled начальный размер текста */
  defaultScale?: number;
  /** Callback смены размера текста (кнопки в тулбаре) */
  onScaleChange?: (scale: number) => void;
  /** Показывать встроенную панель (оглавление + размер текста) (default: `true`) */
  toolbar?: boolean;
  /** Высота видимой области — документ скроллится внутри неё, а не растягивает layout (default: `600`) */
  height?: number | string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  className?: string;
};

/** Просмотр `.md`-файла: загружает текст по `src` и рендерит через существующий `Markdown`. В отличие от `Markdown` (принимает готовую строку), сама загружает содержимое — с URL или локального `File`/`Blob`. Добавляет скроллируемый viewport фиксированной высоты, индикатор прогресса чтения, оглавление по заголовкам и регулировку размера текста. */
export function MarkdownViewer({
  src,
  scale,
  defaultScale = 1,
  onScaleChange,
  toolbar = true,
  height = 600,
  onLoad,
  onError,
  className,
}: MarkdownViewerProps) {
  const { status, error, content } = useMarkdownDocument({ src, onLoad, onError });

  const [headings, setHeadings] = useState<MarkdownHeading[]>([]);
  const [internalScale, setInternalScale] = useState(defaultScale);
  const isScaleControlled = scale !== undefined;
  const currentScale = isScaleControlled ? scale : internalScale;

  function setScale(next: number) {
    const clamped = clampMdScale(next);
    if (!isScaleControlled) setInternalScale(clamped);
    onScaleChange?.(clamped);
  }

  const viewportRef = useRef<HTMLDivElement>(null);
  const progress = useReadingProgress(viewportRef);

  function scrollToHeading(id: string) {
    viewportRef.current?.querySelector(`#${CSS.escape(id)}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

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
            Не удалось открыть файл{error ? `: ${error.message}` : ""}
          </span>
        </Stack>
      </Center>
    );
  }

  if (status === "loading") {
    return (
      <Stack gap={2} className={className}>
        <Skeleton height={20} width="60%" />
        <Skeleton height={14} width="100%" />
        <Skeleton height={14} width="90%" />
        <Skeleton height={14} width="95%" />
      </Stack>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <div
        ref={viewportRef}
        className="overflow-auto rounded-[var(--radius-md)] bg-[var(--surface-2)]"
        style={{ height }}
      >
        <div className="sticky left-0 top-0 z-10 h-1 bg-[var(--border)]">
          <div
            className="h-full bg-[var(--primary)] transition-[width]"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="p-4" style={{ zoom: currentScale }}>
          <Markdown content={content} onHeadingsChange={setHeadings} />
        </div>
      </div>
      {toolbar && (
        <MarkdownViewerToolbar
          headings={headings}
          onSelectHeading={scrollToHeading}
          scale={currentScale}
          onZoomIn={() => setScale(zoomInMdScale(currentScale))}
          onZoomOut={() => setScale(zoomOutMdScale(currentScale))}
        />
      )}
    </div>
  );
}
