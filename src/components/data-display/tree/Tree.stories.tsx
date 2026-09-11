import type { Story } from "@ladle/react";
import { BookOpen, Folder, GraduationCap, Users } from "lucide-react";
import { useState } from "react";
import { Text } from "../../typography/Text";
import { Badge } from "../badge/Badge";
import { Tree } from "./Tree";
import type { TreeNode } from "./types";

export default { title: "Components / Data Display / Tree" };

const COURSE_TREE: TreeNode[] = [
  {
    key: "module-1",
    label: "Модуль 1 — Основы криптографии",
    icon: Folder,
    children: [
      { key: "lesson-1-1", label: "Симметричное шифрование", icon: BookOpen },
      { key: "lesson-1-2", label: "Асимметричное шифрование", icon: BookOpen },
      { key: "lesson-1-3", label: "Хеш-функции", icon: BookOpen },
    ],
  },
  {
    key: "module-2",
    label: "Модуль 2 — Сетевая безопасность",
    icon: Folder,
    children: [
      { key: "lesson-2-1", label: "Firewall и IDS/IPS", icon: BookOpen },
      { key: "lesson-2-2", label: "VPN", icon: BookOpen },
      {
        key: "module-2-3",
        label: "Практикум",
        icon: Folder,
        children: [
          { key: "lesson-2-3-1", label: "Настройка iptables", icon: BookOpen },
          { key: "lesson-2-3-2", label: "Wireshark", icon: BookOpen, disabled: true },
        ],
      },
    ],
  },
  { key: "module-3", label: "Модуль 3 — Экзамен", icon: GraduationCap },
];

const ORG_TREE: TreeNode[] = [
  {
    key: "faculty-it",
    label: "Факультет ИТ",
    icon: Users,
    children: [
      { key: "group-ib-101", label: "Группа ИБ-101" },
      { key: "group-ib-102", label: "Группа ИБ-102" },
    ],
  },
  {
    key: "faculty-eco",
    label: "Экономический факультет",
    icon: Users,
    children: [{ key: "group-ec-101", label: "Группа ЭК-101" }],
  },
];

/* ── Selectable (одиночное выделение) ───────────────────── */
export const Selectable: Story = () => {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <div className="max-w-sm">
      <Tree
        data={COURSE_TREE}
        selectedKeys={selected}
        onSelect={(keys) => setSelected(keys)}
        defaultExpandedKeys={["module-1", "module-2"]}
      />
      {selected.length > 0 && (
        <Text size="xs" variant="muted" className="mt-2">
          Выбрано: {selected[0]}
        </Text>
      )}
    </div>
  );
};

/* ── Checkable (каскадное множественное выделение) ──────── */
export const Checkable: Story = () => {
  const [checked, setChecked] = useState<string[]>([]);
  return (
    <div className="max-w-sm">
      <Tree
        data={COURSE_TREE}
        checkable
        selectable={false}
        checkedKeys={checked}
        onCheck={setChecked}
        defaultExpandedKeys={["module-1", "module-2", "module-2-3"]}
      />
      <Text size="xs" variant="muted" className="mt-2">
        Отмечено: <Badge variant="orange">{checked.length}</Badge>
      </Text>
    </div>
  );
};

/* ── Организационная структура ──────────────────────────── */
export const OrgStructure: Story = () => (
  <div className="max-w-sm">
    <Tree data={ORG_TREE} defaultExpandedKeys={["faculty-it"]} />
  </div>
);

/* ── С отключёнными узлами ──────────────────────────────── */
export const WithDisabled: Story = () => (
  <div className="max-w-sm">
    <Tree checkable data={COURSE_TREE} defaultExpandedKeys={["module-2", "module-2-3"]} />
  </div>
);
