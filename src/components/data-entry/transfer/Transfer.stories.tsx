import type { Story } from "@ladle/react";
import { useState } from "react";
import { Badge } from "../../data-display/badge/Badge";
import { Text } from "../../typography/Text";
import { Transfer } from "./Transfer";
import type { TransferItem } from "./types";

export default { title: "Components / Data Entry / Transfer" };

const STUDENTS: TransferItem[] = [
  { key: "1", title: "Иванов Иван", description: "ИБ-101" },
  { key: "2", title: "Петров Пётр", description: "ИБ-101" },
  { key: "3", title: "Сидорова Анна", description: "ИБ-102" },
  { key: "4", title: "Каримова Дилноза", description: "ИБ-102" },
  { key: "5", title: "Азимов Азиз", description: "ИБ-103" },
  { key: "6", title: "Юсупова Мадина", description: "ИБ-103" },
  { key: "7", title: "Рахимов Тимур", description: "ИБ-104", disabled: true },
  { key: "8", title: "Назарова Севара", description: "ИБ-104" },
];

/* ── Default (controlled) ───────────────────────────────── */
export const Default: Story = () => {
  const [targetKeys, setTargetKeys] = useState<string[]>(["2", "5"]);
  return (
    <div className="flex flex-col gap-4">
      <Transfer
        dataSource={STUDENTS}
        targetKeys={targetKeys}
        onChange={setTargetKeys}
        titles={["Студенты", "Участники группы"]}
      />
      <Text size="xs" variant="muted">
        Выбрано: <Badge variant="orange">{targetKeys.length}</Badge>
      </Text>
    </div>
  );
};

/* ── Uncontrolled ───────────────────────────────────────── */
export const Uncontrolled: Story = () => (
  <Transfer dataSource={STUDENTS} defaultTargetKeys={["1", "3"]} />
);

/* ── Without search ─────────────────────────────────────── */
export const WithoutSearch: Story = () => (
  <Transfer dataSource={STUDENTS.slice(0, 4)} searchable={false} height={220} />
);

/* ── Disabled ───────────────────────────────────────────── */
export const Disabled: Story = () => (
  <Transfer dataSource={STUDENTS} defaultTargetKeys={["2", "5"]} disabled />
);

/* ── Custom height ──────────────────────────────────────── */
export const CustomHeight: Story = () => <Transfer dataSource={STUDENTS} height={200} />;
