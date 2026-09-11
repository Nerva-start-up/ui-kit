import { Search, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "../../../lib/cn";
import { HStack } from "../../layout/HStack";
import { useSearchContext } from "./context";

export type SearchInputProps = {
  placeholder?: string;
  className?: string;
};

/** Поиск + счётчик результатов. */
export function SearchInput({ placeholder = "Поиск...", className }: SearchInputProps) {
  const { open, search, setSearch, filtered } = useSearchContext();
  const inputRef = useRef<HTMLInputElement>(null);

  // Фокус ставится на каждое открытие, а не только на маунт — AnimatePresence
  // может переиспользовать инстанс при быстром закрытии/открытии, и mount-эффект тогда не сработает повторно.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <HStack gap={3} className={cn("border-b border-[var(--border)] px-4 py-3", className)}>
      <Search size={16} className="shrink-0 text-[var(--text-muted)]" />
      <input
        ref={inputRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none"
      />
      <HStack gap={2} className="shrink-0">
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            <X size={14} />
          </button>
        )}
        <span className="text-xs text-[var(--text-muted)] tabular-nums">{filtered.length}</span>
      </HStack>
    </HStack>
  );
}
