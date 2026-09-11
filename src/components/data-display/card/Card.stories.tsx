import type { Story } from "@ladle/react";
import { Text } from "../../typography/Text";
import { Card } from "./Card";

export default { title: "Components / Data Display / Card" };

export const Default: Story = () => (
  <div className="max-w-sm">
    <Card>
      <Text>Содержимое карточки</Text>
    </Card>
  </div>
);

export const WithGlow: Story = () => (
  <div className="max-w-sm">
    <Card glow>
      <Text size="sm">Наведите мышь — появится оранжевое свечение</Text>
    </Card>
  </div>
);

export const PaddingSizes: Story = () => (
  <div className="flex flex-col gap-4 max-w-sm">
    {(["none", "sm", "md", "lg"] as const).map((p) => (
      <Card key={p} padding={p}>
        <Text size="xs" variant="muted">
          padding="{p}"
        </Text>
        <Text size="sm" className="mt-1">
          Содержимое
        </Text>
      </Card>
    ))}
  </div>
);

export const AsStatCard: Story = () => (
  <div className="grid grid-cols-2 gap-4 max-w-md">
    {[
      { label: "KSI Score", value: "1 420" },
      { label: "Место в рейтинге", value: "#3" },
      { label: "Посещаемость", value: "94%" },
      { label: "Заданий сдано", value: "12 / 15" },
    ].map(({ label, value }) => (
      <Card key={label} glow>
        <Text size="xs" variant="muted">
          {label}
        </Text>
        <Text weight="bold" variant="primary" className="text-2xl mt-1">
          {value}
        </Text>
      </Card>
    ))}
  </div>
);
