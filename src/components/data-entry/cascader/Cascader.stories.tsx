import type { Story } from "@ladle/react";
import { useState } from "react";
import type { TreeNode } from "../../data-display/tree/types";
import { Cascader } from "./Cascader";

export default { title: "Components / Data Entry / Cascader" };

const ORG_DATA: TreeNode[] = [
  {
    key: "faculty-it",
    label: "Факультет ИТ",
    children: [
      {
        key: "group-ib-101",
        label: "Группа ИБ-101",
        children: [
          { key: "student-1", label: "Иванов Иван" },
          { key: "student-2", label: "Петров Пётр" },
        ],
      },
      {
        key: "group-po-101",
        label: "Группа ПО-101",
        children: [
          { key: "student-3", label: "Сидорова Анна" },
          { key: "student-4", label: "Каримова Дилноза" },
        ],
      },
    ],
  },
  {
    key: "faculty-eco",
    label: "Экономический факультет",
    children: [
      {
        key: "group-ec-101",
        label: "Группа ЭК-101",
        children: [{ key: "student-5", label: "Азимов Азиз" }],
      },
    ],
  },
];

/* ── Default ────────────────────────────────────────────── */
export const Default: Story = () => {
  const [path, setPath] = useState<string[]>([]);
  return (
    <div className="max-w-xs">
      <Cascader data={ORG_DATA} value={path} onChange={setPath} placeholder="Выберите студента" />
    </div>
  );
};

/* ── Preselected ────────────────────────────────────────── */
export const Preselected: Story = () => (
  <div className="max-w-xs">
    <Cascader data={ORG_DATA} defaultValue={["faculty-it", "group-ib-101", "student-1"]} />
  </div>
);

/* ── Custom separator ───────────────────────────────────── */
export const CustomSeparator: Story = () => (
  <div className="max-w-xs">
    <Cascader
      data={ORG_DATA}
      defaultValue={["faculty-it", "group-ib-101", "student-1"]}
      separator=" → "
    />
  </div>
);

/* ── Disabled ───────────────────────────────────────────── */
export const Disabled: Story = () => (
  <div className="max-w-xs">
    <Cascader data={ORG_DATA} disabled placeholder="Недоступно" />
  </div>
);
