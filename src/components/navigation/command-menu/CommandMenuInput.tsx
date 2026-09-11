import { Search } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "../../../lib/cn";
import { useCommandMenuContext } from "./context";

export type CommandMenuInputProps = {
  placeholder?: string;
  className?: string;
};

/** Поле поиска с автофокусом и кнопкой «очистить». */
export function CommandMenuInput({
  placeholder = "Поиск команд и страниц...",
  className,
}: CommandMenuInputProps) {
  const { open, search, setSearch } = useCommandMenuContext();
  const inputRef = useRef<HTMLInputElement>(null);

  // Фокус ставится на каждое открытие, а не только на маунт — AnimatePresence
  // может переиспользовать инстанс при быстром закрытии/открытии, и mount-эффект тогда не сработает повторно.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <div
      className={cn("flex items-center gap-3 border-b border-[var(--border)] px-4 py-3", className)}
    >
      <Search size={16} className="shrink-0 text-[var(--text-muted)]" />
      <input
        ref={inputRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none"
      />
      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
        >
          очистить
        </button>
      )}
    </div>
  );
}
