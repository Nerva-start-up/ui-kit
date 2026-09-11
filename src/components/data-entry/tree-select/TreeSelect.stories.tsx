import type { Story } from "@ladle/react";
import { useState } from "react";
import type { TreeNode } from "../../data-display/tree/types";
import { TreeSelect } from "./TreeSelect";

export default { title: "Components / Data Entry / TreeSelect" };

const ORG_TREE: TreeNode[] = [
  {
    key: "faculty-it",
    label: "Факультет ИТ",
    children: [
      { key: "group-ib-101", label: "Группа ИБ-101" },
      { key: "group-ib-102", label: "Группа ИБ-102" },
      { key: "group-po-101", label: "Группа ПО-101" },
    ],
  },
  {
    key: "faculty-eco",
    label: "Экономический факультет",
    children: [
      { key: "group-ec-101", label: "Группа ЭК-101" },
      { key: "group-ec-102", label: "Группа ЭК-102" },
    ],
  },
];

/* ── Single ─────────────────────────────────────────────── */
export const Single: Story = () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <div className="max-w-xs">
      <TreeSelect data={ORG_TREE} value={value} onChange={setValue} placeholder="Выберите группу" />
    </div>
  );
};

/* ── Multiple ───────────────────────────────────────────── */
export const Multiple: Story = () => {
  const [value, setValue] = useState<string[]>(["group-ib-101"]);
  return (
    <div className="max-w-xs">
      <TreeSelect
        data={ORG_TREE}
        multiple
        value={value}
        onChange={setValue}
        placeholder="Выберите группы"
      />
    </div>
  );
};

/* ── Disabled ───────────────────────────────────────────── */
export const Disabled: Story = () => (
  <div className="max-w-xs">
    <TreeSelect data={ORG_TREE} disabled placeholder="Недоступно" />
  </div>
);
