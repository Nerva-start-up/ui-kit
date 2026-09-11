import type { Story } from "@ladle/react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../../actions/button/Button";
import { Badge } from "../../data-display/badge/Badge";
import { Text } from "../../typography/Text";
import { Popconfirm } from "./Popconfirm";

export default { title: "Components / Overlay / Popconfirm" };

/* ── Default ────────────────────────────────────────────── */
export const Default: Story = () => (
  <Popconfirm title="Удалить черновик?" onConfirm={() => {}}>
    <Button variant="outline" size="sm">
      Удалить
    </Button>
  </Popconfirm>
);

/* ── Danger + description ───────────────────────────────── */
export const Danger: Story = () => (
  <Popconfirm
    title="Удалить студента из группы?"
    description="Это действие нельзя отменить. История успеваемости сохранится."
    confirmText="Удалить"
    danger
    onConfirm={() => {}}
  >
    <Button variant="danger" size="sm">
      <Trash2 size={14} />
      Удалить
    </Button>
  </Popconfirm>
);

/* ── Async onConfirm (спиннер на кнопке) ────────────────── */
export const AsyncConfirm: Story = () => {
  const [status, setStatus] = useState("не отправлено");
  return (
    <div className="flex flex-col gap-3">
      <Popconfirm
        title="Отправить задание на проверку?"
        description="После отправки редактирование будет недоступно."
        confirmText="Отправить"
        onConfirm={() =>
          new Promise<void>((resolve) => {
            setTimeout(() => {
              setStatus("отправлено");
              resolve();
            }, 1500);
          })
        }
      >
        <Button size="sm">Сдать задание</Button>
      </Popconfirm>
      <Text size="xs" variant="muted">
        Статус: <Badge variant={status === "отправлено" ? "success" : "default"}>{status}</Badge>
      </Text>
    </div>
  );
};

/* ── В таблице ───────────────────────────────────────────── */
export const InTable: Story = () => {
  const [rows, setRows] = useState(["ИБ-101", "ИБ-102", "ИБ-103"]);
  return (
    <div className="max-w-sm rounded-[var(--radius-lg)] border border-[var(--border)]">
      {rows.map((row) => (
        <div
          key={row}
          className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5 last:border-b-0"
        >
          <Text as="span" size="sm">
            Группа {row}
          </Text>
          <Popconfirm
            title={`Удалить группу ${row}?`}
            danger
            confirmText="Удалить"
            onConfirm={() => setRows((prev) => prev.filter((r) => r !== row))}
          >
            <button
              type="button"
              className="rounded-[var(--radius-sm)] p-1.5 text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--error)]"
              aria-label={`Удалить группу ${row}`}
            >
              <Trash2 size={14} />
            </button>
          </Popconfirm>
        </div>
      ))}
      {rows.length === 0 && (
        <Text size="sm" variant="muted" className="px-4 py-3">
          Список пуст
        </Text>
      )}
    </div>
  );
};
