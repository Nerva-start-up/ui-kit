import type { Story } from "@ladle/react";
import { useState } from "react";
import { Text } from "../../typography/Text";
import { Avatar } from "../avatar/Avatar";
import { Badge } from "../badge/Badge";
import { Table, Tbody, Td, Th, Thead, Tr } from "./Table";
import { TdCheckbox } from "./TdCheckbox";
import { TdCopy } from "./TdCopy";
import { ThCheckbox } from "./ThCheckbox";

export default { title: "Components / Data Display / Table" };

const students = [
  { name: "Алишер Навоий", group: "ИБ-101", score: 1420, status: "Активен" },
  { name: "Камила Юсупова", group: "ИБ-101", score: 1280, status: "Активен" },
  { name: "Фаррух Ташкентов", group: "ИБ-102", score: 980, status: "Неактивен" },
  { name: "Зарина Мирзаева", group: "ИБ-102", score: 1150, status: "Активен" },
  { name: "Даниёр Каримов", group: "ИБ-201", score: 670, status: "Неактивен" },
];

export const Default: Story = () => (
  <Table>
    <Thead>
      <Tr hoverable={false}>
        <Th>Студент</Th>
        <Th>Группа</Th>
        <Th>KSI Score</Th>
        <Th>Статус</Th>
      </Tr>
    </Thead>
    <Tbody>
      {students.map((s) => (
        <Tr key={s.name}>
          <Td>
            <div className="flex items-center gap-2">
              <Avatar name={s.name} size="sm" />
              <Text as="span" size="sm">
                {s.name}
              </Text>
            </div>
          </Td>
          <Td>{s.group}</Td>
          <Td>
            <Text as="span" size="sm" weight="semibold" variant="primary">
              {s.score}
            </Text>
          </Td>
          <Td>
            <Badge variant={s.status === "Активен" ? "success" : "default"}>{s.status}</Badge>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

const apiKeys = [
  { name: "Основной", id: "usr_8f3a92bc1d4e", key: "sk-ksi-prod-a1b2c3d4e5f6g7h8i9j0" },
  { name: "Тестовый", id: "usr_1a2b3c4d5e6f", key: "sk-ksi-test-z9y8x7w6v5u4t3s2r1q0" },
  { name: "Резервный", id: "usr_9f8e7d6c5b4a", key: "sk-ksi-prod-q1w2e3r4t5y6u7i8o9p0" },
];

export const Copyable: Story = () => (
  <Table>
    <Thead>
      <Tr hoverable={false}>
        <Th>Название</Th>
        <Th>ID пользователя</Th>
        <Th>API-ключ</Th>
      </Tr>
    </Thead>
    <Tbody>
      {apiKeys.map((row) => (
        <Tr key={row.id} hoverable={false}>
          <Td>{row.name}</Td>
          <TdCopy text={row.id} />
          <TdCopy text={row.key} mask truncate />
        </Tr>
      ))}
    </Tbody>
  </Table>
);

export const Selectable: Story = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleRow = (name: string) =>
    setSelected((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));

  const allSelected = selected.length === students.length;
  const someSelected = selected.length > 0 && !allSelected;

  return (
    <Table>
      <Thead>
        <Tr hoverable={false}>
          <ThCheckbox
            checked={allSelected}
            indeterminate={someSelected}
            onChange={(checked) => setSelected(checked ? students.map((s) => s.name) : [])}
          />
          <Th>Студент</Th>
          <Th>Группа</Th>
          <Th>Статус</Th>
        </Tr>
      </Thead>
      <Tbody>
        {students.map((s) => (
          <Tr key={s.name} hoverable={false} selected={selected.includes(s.name)}>
            <TdCheckbox
              checked={selected.includes(s.name)}
              onChange={() => toggleRow(s.name)}
              aria-label={`Выбрать ${s.name}`}
            />
            <Td>{s.name}</Td>
            <Td>{s.group}</Td>
            <Td>
              <Badge variant={s.status === "Активен" ? "success" : "default"}>{s.status}</Badge>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export const Simple: Story = () => (
  <Table>
    <Thead>
      <Tr hoverable={false}>
        <Th>#</Th>
        <Th>Тема</Th>
        <Th>Баллы</Th>
      </Tr>
    </Thead>
    <Tbody>
      {["Криптография", "Веб-безопасность", "Сети", "Форензика"].map((topic, i) => (
        <Tr key={topic}>
          <Td>{i + 1}</Td>
          <Td>{topic}</Td>
          <Td>{Math.floor(Math.random() * 100) + 60}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);
