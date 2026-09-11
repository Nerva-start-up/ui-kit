import type { Story } from "@ladle/react";
import { Badge } from "./Badge";

export default { title: "Components / Data Display / Badge" };

export const AllVariants: Story = () => (
  <div className="flex flex-wrap gap-3">
    <Badge variant="default">Default</Badge>
    <Badge variant="success">Принято</Badge>
    <Badge variant="error">Отклонено</Badge>
    <Badge variant="info">Информация</Badge>
    <Badge variant="warning">Внимание</Badge>
    <Badge variant="orange">Активно</Badge>
  </div>
);

export const Interactive: Story<{
  label: string;
  variant: "default" | "success" | "error" | "info" | "warning" | "orange";
}> = ({ label, variant }) => <Badge variant={variant}>{label}</Badge>;
Interactive.args = { label: "Статус", variant: "success" };
Interactive.argTypes = {
  variant: {
    options: ["default", "success", "error", "info", "warning", "orange"],
    control: { type: "select" },
  },
};
