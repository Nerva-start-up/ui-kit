import { Button } from "@components/actions/button/Button";
import { HStack } from "@components/layout/HStack";
import { cn } from "@lib/cn";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PDF_MAX_SCALE, PDF_MIN_SCALE } from "./utils";

export type PdfViewerToolbarProps = {
  page: number;
  numPages: number;
  scale: number;
  onPrev: () => void;
  onNext: () => void;
  /** Переход на конкретную страницу — клик по счётчику "N / M" открывает поле ввода */
  onPageInput: (page: number) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  className?: string;
};

/** Панель навигации `PdfViewer`: вперёд/назад по страницам, клик по счётчику для перехода на конкретную страницу, зум */
export function PdfViewerToolbar({
  page,
  numPages,
  scale,
  onPrev,
  onNext,
  onPageInput,
  onZoomIn,
  onZoomOut,
  className,
}: PdfViewerToolbarProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(page));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  function commit() {
    const next = Number.parseInt(draft, 10);
    if (Number.isFinite(next)) onPageInput(next);
    setEditing(false);
  }

  return (
    <HStack
      justify="between"
      className={cn("border-t border-[var(--border)] pt-2 mt-2", className)}
    >
      <HStack gap={1}>
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrev}
          disabled={page <= 1}
          aria-label="Предыдущая страница"
        >
          <ChevronLeft size={16} />
        </Button>

        {editing ? (
          <input
            ref={inputRef}
            type="number"
            min={1}
            max={numPages}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") setEditing(false);
            }}
            className={cn(
              "h-6 w-14 rounded-[var(--radius-sm)] border border-[var(--border)]",
              "bg-[var(--surface)] text-center text-xs text-[var(--text)] outline-none",
              "focus-visible:border-[var(--primary)]"
            )}
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              setDraft(String(page));
              setEditing(true);
            }}
            className={cn(
              "min-w-[64px] rounded-[var(--radius-sm)] px-1 py-0.5 text-center text-xs transition-colors",
              "text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
            )}
            aria-label="Перейти на страницу"
          >
            {page} / {numPages}
          </button>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          disabled={page >= numPages}
          aria-label="Следующая страница"
        >
          <ChevronRight size={16} />
        </Button>
      </HStack>

      <HStack gap={1}>
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomOut}
          disabled={scale <= PDF_MIN_SCALE}
          aria-label="Уменьшить масштаб"
        >
          <ZoomOut size={16} />
        </Button>
        <span className="min-w-[48px] text-center text-xs text-[var(--text-muted)]">
          {Math.round(scale * 100)}%
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomIn}
          disabled={scale >= PDF_MAX_SCALE}
          aria-label="Увеличить масштаб"
        >
          <ZoomIn size={16} />
        </Button>
      </HStack>
    </HStack>
  );
}
