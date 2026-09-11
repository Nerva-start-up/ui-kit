import type { Story } from "@ladle/react";
import { useState } from "react";
import { Badge } from "../../data-display/badge/Badge";
import { Mentions } from "./Mentions";
import type { MentionOption } from "./types";

export default { title: "Components / Data Entry / Mentions" };

const STUDENTS: MentionOption[] = [
  { id: "1", label: "Иванов Иван", value: "ivanov" },
  { id: "2", label: "Петров Пётр", value: "petrov" },
  { id: "3", label: "Сидорова Анна", value: "sidorova" },
  { id: "4", label: "Каримова Дилноза", value: "karimova" },
  { id: "5", label: "Азимов Азиз", value: "azimov" },
];

/* ── Default ────────────────────────────────────────────── */
export const Default: Story = () => {
  const [value, setValue] = useState("");
  return (
    <div className="max-w-md">
      <Mentions
        options={STUDENTS}
        value={value}
        onChange={setValue}
        placeholder="Напишите комментарий, используйте @ для упоминания"
      />
    </div>
  );
};

/* ── С колбэком onMention ────────────────────────────────── */
export const WithMentionCallback: Story = () => {
  const [value, setValue] = useState("");
  const [mentioned, setMentioned] = useState<string[]>([]);
  return (
    <div className="flex max-w-md flex-col gap-3">
      <Mentions
        options={STUDENTS}
        value={value}
        onChange={setValue}
        onMention={(option) => setMentioned((prev) => [...prev, option.label])}
        placeholder="Упомяните студента через @"
      />
      {mentioned.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {mentioned.map((label, i) => (
            <Badge key={`${label}-${i}`} variant="orange">
              {label}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Preselected text ───────────────────────────────────── */
export const Preselected: Story = () => (
  <div className="max-w-md">
    <Mentions
      options={STUDENTS}
      defaultValue="Отличная работа, @ivanov! Проверь пожалуйста комментарий @petrov."
    />
  </div>
);

/* ── Custom rows ────────────────────────────────────────── */
export const CustomRows: Story = () => (
  <div className="max-w-md">
    <Mentions options={STUDENTS} rows={5} placeholder="Развёрнутый комментарий..." />
  </div>
);

/* ── Disabled ───────────────────────────────────────────── */
export const Disabled: Story = () => (
  <div className="max-w-md">
    <Mentions options={STUDENTS} disabled placeholder="Недоступно" />
  </div>
);
