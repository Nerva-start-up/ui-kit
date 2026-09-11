import type { Story } from "@ladle/react";
import { Text } from "../../typography/Text";
import { Separator } from "./Separator";

export default { title: "Components / Layout / Separator" };

export const Horizontal: Story = () => (
  <div className="flex flex-col gap-4 max-w-sm">
    <Text size="sm">Секция выше</Text>
    <Separator />
    <Text size="sm">Секция ниже</Text>
  </div>
);

export const Vertical: Story = () => (
  <div className="flex items-center gap-4 h-8">
    <Text as="span" size="sm">
      Слева
    </Text>
    <Separator orientation="vertical" />
    <Text as="span" size="sm">
      Справа
    </Text>
    <Separator orientation="vertical" />
    <Text as="span" size="sm">
      Ещё
    </Text>
  </div>
);

export const InCard: Story = () => (
  <div className="max-w-sm bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-5 flex flex-col gap-4">
    <div>
      <Text size="xs" variant="muted">
        Имя
      </Text>
      <Text size="sm" className="mt-0.5">
        Алишер Навоий
      </Text>
    </div>
    <Separator />
    <div>
      <Text size="xs" variant="muted">
        Группа
      </Text>
      <Text size="sm" className="mt-0.5">
        ИБ-101
      </Text>
    </div>
    <Separator />
    <div>
      <Text size="xs" variant="muted">
        KSI Score
      </Text>
      <Text size="sm" weight="bold" variant="primary" className="mt-0.5">
        1 420
      </Text>
    </div>
  </div>
);
