import type { Story } from "@ladle/react";
import { Text } from "../../typography/Text";
import { Avatar } from "./Avatar";
import { AvatarGroup } from "./AvatarGroup";

export default { title: "Components / Data Display / AvatarGroup" };

const STUDENTS = [
  "Алишер Навоий",
  "Камила Юсупова",
  "Фаррух Ташкентов",
  "Зарина Мирзаева",
  "Азиз Каримов",
  "Дилноза Рахимова",
  "Тимур Азимов",
];

export const Default: Story = () => (
  <AvatarGroup>
    {STUDENTS.slice(0, 4).map((name) => (
      <Avatar key={name} name={name} />
    ))}
  </AvatarGroup>
);

export const WithOverflow: Story = () => (
  <AvatarGroup max={4}>
    {STUDENTS.map((name) => (
      <Avatar key={name} name={name} />
    ))}
  </AvatarGroup>
);

export const Sizes: Story = () => (
  <div className="flex flex-col items-start gap-4">
    <AvatarGroup size="sm" max={4}>
      {STUDENTS.map((name) => (
        <Avatar key={name} name={name} size="sm" />
      ))}
    </AvatarGroup>
    <AvatarGroup size="md" max={4}>
      {STUDENTS.map((name) => (
        <Avatar key={name} name={name} size="md" />
      ))}
    </AvatarGroup>
    <AvatarGroup size="lg" max={4}>
      {STUDENTS.map((name) => (
        <Avatar key={name} name={name} size="lg" />
      ))}
    </AvatarGroup>
  </div>
);

export const WithImages: Story = () => (
  <AvatarGroup max={3}>
    <Avatar name="Алишер Навоий" src="https://i.pravatar.cc/40?img=1" />
    <Avatar name="Камила Юсупова" src="https://i.pravatar.cc/40?img=5" />
    <Avatar name="Фаррух Ташкентов" src="https://i.pravatar.cc/40?img=8" />
    <Avatar name="Зарина Мирзаева" />
    <Avatar name="Азиз Каримов" />
  </AvatarGroup>
);

export const InCard: Story = () => (
  <div className="flex max-w-xs items-center justify-between rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-4">
    <div className="flex flex-col gap-1">
      <Text as="span" size="sm" weight="semibold">
        Группа ИБ-101
      </Text>
      <Text as="span" size="xs" variant="muted">
        {STUDENTS.length} студентов
      </Text>
    </div>
    <AvatarGroup max={4} size="sm">
      {STUDENTS.map((name) => (
        <Avatar key={name} name={name} size="sm" />
      ))}
    </AvatarGroup>
  </div>
);
