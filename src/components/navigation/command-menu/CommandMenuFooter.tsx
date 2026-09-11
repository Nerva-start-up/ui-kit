import { cn } from "../../../lib/cn";
import { Kbd } from "../../data-display/kbd/Kbd";
import { KbdKey } from "../../data-display/kbd/KbdKey";

export type CommandMenuFooterProps = { className?: string };

/** Подсказки по клавишам. */
export function CommandMenuFooter({ className }: CommandMenuFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 border-t border-[var(--border)] px-4 py-2.5",
        "text-[10px] text-[var(--text-muted)] select-none",
        className
      )}
    >
      <span className="flex items-center gap-1">
        <Kbd size="sm">
          <KbdKey>↑</KbdKey>
          <KbdKey>↓</KbdKey>
        </Kbd>
        навигация
      </span>
      <span className="flex items-center gap-1">
        <KbdKey size="sm">Enter</KbdKey>
        выбрать
      </span>
      <span className="flex items-center gap-1">
        <KbdKey size="sm">Esc</KbdKey>
        закрыть
      </span>
      <span className="ml-auto flex items-center gap-1">
        <span className="font-mono opacity-60">/команды</span>
        <span className="opacity-40">·</span>
        <span className="font-mono opacity-60">@страницы</span>
      </span>
    </div>
  );
}
