import type { Story } from "@ladle/react";
import { Plus, Search } from "lucide-react";
import { Button } from "./Button";

export default { title: "Components / Actions / Button" };

export const Primary: Story = () => <Button>Primary</Button>;
export const Ghost: Story = () => <Button variant="ghost">Ghost</Button>;
export const Outline: Story = () => <Button variant="outline">Outline</Button>;
export const Danger: Story = () => <Button variant="danger">Danger</Button>;

export const Sizes: Story = () => (
  <div className="flex items-center gap-3">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
);

export const Icon: Story = () => (
  <div className="flex items-center gap-3">
    <Button size="icon">
      <Search size={16} />
    </Button>
    <Button size="icon" variant="ghost">
      <Plus size={16} />
    </Button>
    <Button size="icon" variant="outline">
      <Plus size={16} />
    </Button>
  </div>
);

export const WithIcon: Story = () => (
  <div className="flex items-center gap-3">
    <Button>
      <Plus size={16} /> Добавить
    </Button>
    <Button variant="outline">
      <Search size={16} /> Найти
    </Button>
  </div>
);

export const Loading: Story = () => (
  <div className="flex items-center gap-3">
    <Button loading>Загрузка...</Button>
    <Button loading variant="outline">
      Загрузка...
    </Button>
  </div>
);

export const Disabled: Story = () => (
  <div className="flex items-center gap-3">
    <Button disabled>Disabled</Button>
    <Button disabled variant="ghost">
      Disabled
    </Button>
    <Button disabled variant="outline">
      Disabled
    </Button>
  </div>
);

export const AllVariants: Story = () => (
  <div className="flex flex-wrap gap-3">
    {(["primary", "ghost", "outline", "danger"] as const).map((v) => (
      <Button key={v} variant={v}>
        {v}
      </Button>
    ))}
  </div>
);

export const Interactive: Story<{
  label: string;
  variant: "primary" | "ghost" | "outline" | "danger";
  size: "sm" | "md" | "lg" | "icon";
  loading: boolean;
  disabled: boolean;
}> = ({ label, variant, size, loading, disabled }) => (
  <Button variant={variant} size={size} loading={loading} disabled={disabled}>
    {label}
  </Button>
);
Interactive.args = {
  label: "Нажать",
  variant: "primary",
  size: "md",
  loading: false,
  disabled: false,
};
Interactive.argTypes = {
  variant: { options: ["primary", "ghost", "outline", "danger"], control: { type: "select" } },
  size: { options: ["sm", "md", "lg", "icon"], control: { type: "select" } },
};
