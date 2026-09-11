import type { Story } from "@ladle/react";
import { Text } from "../../typography/Text";
import { Kbd } from "./Kbd";
import { KbdKey } from "./KbdKey";

export default { title: "Components / Data Display / Kbd" };

/* ── Базовые сокращения ─────────────────────────────────── */
export const Shortcuts: Story = () => (
  <div className="flex flex-col gap-6">
    {/* Одиночные клавиши */}
    <div className="flex items-center gap-3">
      <KbdKey>Esc</KbdKey>
      <KbdKey>Tab</KbdKey>
      <KbdKey>Enter</KbdKey>
      <KbdKey>Space</KbdKey>
      <KbdKey>↑</KbdKey>
      <KbdKey>↓</KbdKey>
    </div>

    {/* Комбинации */}
    <div className="flex items-center gap-4 flex-wrap">
      <Kbd>
        <KbdKey>⌘</KbdKey>
        <KbdKey>K</KbdKey>
      </Kbd>

      <Kbd>
        <KbdKey>Ctrl</KbdKey>
        <KbdKey>S</KbdKey>
      </Kbd>

      <Kbd>
        <KbdKey>Ctrl</KbdKey>
        <KbdKey>Shift</KbdKey>
        <KbdKey>P</KbdKey>
      </Kbd>

      <Kbd>
        <KbdKey>Alt</KbdKey>
        <KbdKey>F4</KbdKey>
      </Kbd>
    </div>
  </div>
);

/* ── Размеры ────────────────────────────────────────────── */
export const Sizes: Story = () => (
  <div className="flex items-center gap-6">
    <Kbd size="sm">
      <KbdKey>⌘</KbdKey>
      <KbdKey>K</KbdKey>
    </Kbd>

    <Kbd size="md">
      <KbdKey>⌘</KbdKey>
      <KbdKey>K</KbdKey>
    </Kbd>
  </div>
);

/* ── В контексте UI (подсказки в интерфейсе) ───────────── */
export const InContext: Story = () => (
  <div className="flex flex-col gap-4 text-sm text-[var(--text-muted)]">
    <div className="flex items-center justify-between p-3 rounded-[var(--radius-md)] border border-[var(--border)]">
      <Text as="span" size="sm" variant="muted">
        Поиск
      </Text>
      <Kbd size="sm">
        <KbdKey>⌘</KbdKey>
        <KbdKey>K</KbdKey>
      </Kbd>
    </div>

    <div className="flex items-center justify-between p-3 rounded-[var(--radius-md)] border border-[var(--border)]">
      <Text as="span" size="sm" variant="muted">
        Закрыть
      </Text>
      <KbdKey size="sm">Esc</KbdKey>
    </div>

    <div className="flex items-center justify-between p-3 rounded-[var(--radius-md)] border border-[var(--border)]">
      <Text as="span" size="sm" variant="muted">
        Сохранить черновик
      </Text>
      <Kbd size="sm">
        <KbdKey>Ctrl</KbdKey>
        <KbdKey>S</KbdKey>
      </Kbd>
    </div>

    <div className="flex items-center justify-between p-3 rounded-[var(--radius-md)] border border-[var(--border)]">
      <Text as="span" size="sm" variant="muted">
        Команды
      </Text>
      <Kbd size="sm">
        <KbdKey>Ctrl</KbdKey>
        <KbdKey>Shift</KbdKey>
        <KbdKey>P</KbdKey>
      </Kbd>
    </div>
  </div>
);

/* ── Кастомный разделитель ──────────────────────────────── */
export const CustomSeparator: Story = () => (
  <div className="flex items-center gap-4">
    <Kbd separator="then">
      <KbdKey>g</KbdKey>
      <KbdKey>h</KbdKey>
    </Kbd>

    <Kbd separator="/">
      <KbdKey>?</KbdKey>
    </Kbd>
  </div>
);
