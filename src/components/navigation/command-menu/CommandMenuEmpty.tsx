import { SearchX } from "lucide-react";
import { Stack } from "../../layout/Stack";
import { useCommandMenuContext } from "./context";

export type CommandMenuEmptyProps = {
  children?: React.ReactNode;
};

/** Пустое состояние, рендерится только при поиске без результатов. */
export function CommandMenuEmpty({ children }: CommandMenuEmptyProps) {
  const { filtered, search } = useCommandMenuContext();

  if (filtered.length > 0 || !search.trim()) return null;

  return (
    <Stack align="center" gap={2} className="py-10 text-[var(--text-muted)]">
      <SearchX size={32} strokeWidth={1.5} />
      {children ?? (
        <p className="text-sm">
          Ничего не найдено по <span className="font-mono text-[var(--text)]">«{search}»</span>
        </p>
      )}
    </Stack>
  );
}
