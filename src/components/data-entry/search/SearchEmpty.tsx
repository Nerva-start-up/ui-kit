import { SearchX } from "lucide-react";
import type React from "react";
import { Stack } from "../../layout/Stack";
import { useSearchContext } from "./context";

export type SearchEmptyProps = { children?: React.ReactNode };

/** Пустое состояние. */
export function SearchEmpty({ children }: SearchEmptyProps) {
  const { filtered, search } = useSearchContext();

  if (filtered.length > 0) return null;

  return (
    <Stack align="center" gap={2} className="py-10 text-[var(--text-muted)]">
      <SearchX size={32} strokeWidth={1.5} />
      {children ?? (
        <p className="text-sm">
          {search.trim() ? (
            <>
              Ничего не найдено по <span className="font-mono text-[var(--text)]">«{search}»</span>
            </>
          ) : (
            "Список пуст"
          )}
        </p>
      )}
    </Stack>
  );
}
