import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../../lib/cn";
import { Button } from "../../actions/button/Button";
import { HStack } from "../../layout/HStack";

export type PaginationProps = {
  /** текущая страница (1-indexed) */
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Всего записей — показывает диапазон "1–20 из 87" */
  total?: number;
  /** Нужен вместе с `total` */
  pageSize?: number;
  className?: string;
};

/** Пагинация. Скрывается автоматически при `totalPages <= 1`. */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  total,
  pageSize,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = buildPageNumbers(page, totalPages);

  return (
    <HStack gap={2} className={className}>
      {total != null && pageSize != null && (
        <p className="text-sm mr-auto" style={{ color: "var(--text-muted)" }}>
          {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} из {total}
        </p>
      )}

      <HStack gap={1} className="ml-auto">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Предыдущая страница"
        >
          <ChevronLeft size={14} />
        </Button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="px-2 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              …
            </span>
          ) : (
            <button
              type="button"
              key={p}
              onClick={() => onPageChange(p as number)}
              className={cn(
                "h-9 min-w-[2.25rem] px-3 text-sm rounded-[var(--radius-md)] transition-colors",
                p === page
                  ? "bg-[var(--primary)] text-[#0d1117] font-semibold"
                  : "text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
              )}
            >
              {p}
            </button>
          )
        )}

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Следующая страница"
        >
          <ChevronRight size={14} />
        </Button>
      </HStack>
    </HStack>
  );
}

function buildPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}
