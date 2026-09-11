import { Button } from "@components/actions/button/Button";
import type { MarkdownHeading } from "@components/data-display/markdown/Markdown";
import { HStack } from "@components/layout/HStack";
import { Popover, PopoverContent, PopoverTrigger } from "@components/overlay/popover/Popover";
import { cn } from "@lib/cn";
import { List, ZoomIn, ZoomOut } from "lucide-react";
import { MD_MAX_SCALE, MD_MIN_SCALE } from "./utils";

export type MarkdownViewerToolbarProps = {
  headings: MarkdownHeading[];
  onSelectHeading: (id: string) => void;
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  className?: string;
};

/** Панель `MarkdownViewer`: оглавление по заголовкам документа (только если их 2+) + регулировка размера текста */
export function MarkdownViewerToolbar({
  headings,
  onSelectHeading,
  scale,
  onZoomIn,
  onZoomOut,
  className,
}: MarkdownViewerToolbarProps) {
  return (
    <HStack
      justify="between"
      className={cn("border-t border-[var(--border)] pt-2 mt-2", className)}
    >
      {headings.length > 1 ? (
        <Popover>
          <PopoverTrigger>
            <Button variant="ghost" size="sm">
              <List size={14} />
              Оглавление
            </Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="start" className="max-h-80 w-72 overflow-auto p-1">
            {headings.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => onSelectHeading(h.id)}
                style={{ paddingLeft: `${(h.level - 1) * 12 + 8}px` }}
                className={cn(
                  "block w-full truncate rounded-[var(--radius-sm)] py-1.5 pr-2 text-left text-sm transition-colors",
                  "text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
                )}
              >
                {h.text}
              </button>
            ))}
          </PopoverContent>
        </Popover>
      ) : (
        <span />
      )}

      <HStack gap={1}>
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomOut}
          disabled={scale <= MD_MIN_SCALE}
          aria-label="Уменьшить размер текста"
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
          disabled={scale >= MD_MAX_SCALE}
          aria-label="Увеличить размер текста"
        >
          <ZoomIn size={16} />
        </Button>
      </HStack>
    </HStack>
  );
}
