import type { Story } from "@ladle/react";
import { useRef, useState } from "react";
import { Badge } from "../components/data-display/badge/Badge";
import { Kbd } from "../components/data-display/kbd/Kbd";
import { KbdKey } from "../components/data-display/kbd/KbdKey";
import { Text } from "../components/typography/Text";
import { useEscapeKey } from "../hooks/useEscapeKey";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useHotkey } from "../hooks/useHotkey";
import { useKeyPress } from "../hooks/useKeyPress";
import { useKeyboardNav } from "../hooks/useKeyboardNav";

export default { title: "Hooks / Keyboard" };

/* ── useKeyPress ────────────────────────────────────────── */
export const KeyPress: Story = () => {
  const [last, setLast] = useState<string>("—");

  useKeyPress(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", "Escape", " "], (e) =>
    setLast(e.key === " " ? "Space" : e.key)
  );

  return (
    <div className="flex flex-col gap-4">
      <Text size="sm" variant="muted">
        Нажми любую клавишу —{" "}
        <Kbd size="sm">
          <KbdKey>↑</KbdKey>
        </Kbd>{" "}
        <Kbd size="sm">
          <KbdKey>↓</KbdKey>
        </Kbd>{" "}
        <KbdKey size="sm">Enter</KbdKey> <KbdKey size="sm">Esc</KbdKey>
      </Text>
      <div className="flex items-center gap-2">
        <Text as="span" size="xs" variant="muted">
          Последняя клавиша:
        </Text>
        <Badge variant="orange">{last}</Badge>
      </div>
    </div>
  );
};

/* ── useHotkey ──────────────────────────────────────────── */
export const Hotkey: Story = () => {
  const [log, setLog] = useState<string[]>([]);
  const push = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 6));

  useHotkey(["ctrl+k", "meta+k"], () => push("⌘K — Открыть поиск"));
  useHotkey(["ctrl+s", "meta+s"], () => push("⌘S — Сохранить"));
  useHotkey("ctrl+shift+p", () => push("Ctrl+Shift+P — Команды"));
  useHotkey("alt+arrowleft", () => push("Alt+← — Назад"));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 text-sm text-[var(--text-muted)]">
        <div className="flex items-center justify-between">
          <Text as="span" size="sm" variant="muted">
            Поиск
          </Text>
          <Kbd size="sm">
            <KbdKey>⌘</KbdKey>
            <KbdKey>K</KbdKey>
          </Kbd>
        </div>
        <div className="flex items-center justify-between">
          <Text as="span" size="sm" variant="muted">
            Сохранить
          </Text>
          <Kbd size="sm">
            <KbdKey>⌘</KbdKey>
            <KbdKey>S</KbdKey>
          </Kbd>
        </div>
        <div className="flex items-center justify-between">
          <Text as="span" size="sm" variant="muted">
            Команды
          </Text>
          <Kbd size="sm">
            <KbdKey>Ctrl</KbdKey>
            <KbdKey>Shift</KbdKey>
            <KbdKey>P</KbdKey>
          </Kbd>
        </div>
        <div className="flex items-center justify-between">
          <Text as="span" size="sm" variant="muted">
            Назад
          </Text>
          <Kbd size="sm">
            <KbdKey>Alt</KbdKey>
            <KbdKey>←</KbdKey>
          </Kbd>
        </div>
      </div>

      <div className="border-t border-[var(--border)] pt-3 flex flex-col gap-1 min-h-[120px]">
        {log.length === 0 ? (
          <Text as="span" size="xs" variant="muted">
            Лог пуст — нажми комбинацию выше
          </Text>
        ) : (
          log.map((entry, i) => (
            <Text as="span" key={i} size="xs">
              {entry}
            </Text>
          ))
        )}
      </div>
    </div>
  );
};

/* ── useKeyboardNav ─────────────────────────────────────── */
export const KeyboardNav: Story = () => {
  const items = ["Дашборд", "Рейтинг", "Задания", "Материалы", "Нора AI", "Настройки"];
  const [selected, setSelected] = useState<string | null>(null);

  const { activeIndex, getItemProps, containerProps } = useKeyboardNav({
    count: items.length,
    onSelect: (i) => setSelected(items[i]),
    onEscape: () => setSelected(null),
  });

  return (
    <div className="flex flex-col gap-3">
      <Text size="xs" variant="muted">
        Навигация: <KbdKey size="sm">↑</KbdKey> <KbdKey size="sm">↓</KbdKey> · Выбор:{" "}
        <KbdKey size="sm">Enter</KbdKey> · Сброс: <KbdKey size="sm">Esc</KbdKey>
      </Text>

      <ul {...containerProps} className="flex flex-col gap-1 outline-none">
        {items.map((item, i) => (
          <li
            key={item}
            {...getItemProps(i)}
            className={[
              "px-3 py-2 rounded-[var(--radius-md)] text-sm cursor-pointer transition-colors",
              activeIndex === i
                ? "bg-[var(--primary)] text-white"
                : "text-[var(--text-muted)] hover:bg-[var(--surface-2)]",
            ].join(" ")}
          >
            {item}
          </li>
        ))}
      </ul>

      {selected && (
        <Text size="xs" variant="muted">
          Выбрано: <Badge variant="orange">{selected}</Badge>
        </Text>
      )}
    </div>
  );
};

/* ── useFocusTrap ───────────────────────────────────────── */
export const FocusTrap: Story = () => {
  const [active, setActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useFocusTrap(containerRef, active);
  useEscapeKey(() => setActive(false), active);

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={() => setActive(true)}
        className="px-4 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--primary)] text-white"
      >
        Активировать ловушку фокуса
      </button>

      {active && (
        <div
          ref={containerRef}
          className="p-4 border border-[var(--primary)] rounded-[var(--radius-lg)] flex flex-col gap-3"
        >
          <Text size="xs" variant="muted">
            Фокус заперт здесь. Tab циклится внутри. <KbdKey size="sm">Esc</KbdKey> — выйти.
          </Text>
          <input
            className="px-3 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--primary)]"
            placeholder="Поле 1"
          />
          <input
            className="px-3 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--primary)]"
            placeholder="Поле 2"
          />
          <button
            type="button"
            onClick={() => setActive(false)}
            className="px-4 py-2 text-sm rounded-[var(--radius-md)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]"
          >
            Закрыть (Esc)
          </button>
        </div>
      )}
    </div>
  );
};

/* ── useEscapeKey ───────────────────────────────────────── */
export const EscapeKey: Story = () => {
  const [open, setOpen] = useState(false);

  useEscapeKey(() => setOpen(false), open);

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-4 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)]"
      >
        Открыть уведомление
      </button>

      {open && (
        <div className="p-4 rounded-[var(--radius-lg)] border border-[var(--primary)] bg-[rgba(249,115,22,0.06)] flex items-center justify-between">
          <Text as="span" size="sm">
            Нажми <KbdKey size="sm">Esc</KbdKey> чтобы закрыть
          </Text>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text)]"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};
