import type { Story } from "@ladle/react";
import { Eye, Mail, Search } from "lucide-react";
import { Input } from "./Input";

export default { title: "Components / Data Entry / Input" };

export const Default: Story = () => (
  <div className="max-w-sm">
    <Input placeholder="Введите текст..." />
  </div>
);

export const WithLabel: Story = () => (
  <div className="max-w-sm">
    <Input label="Email" placeholder="user@example.com" type="email" />
  </div>
);

export const WithHint: Story = () => (
  <div className="max-w-sm">
    <Input
      label="Пароль"
      placeholder="Минимум 8 символов"
      type="password"
      hint="Используйте буквы, цифры и символы"
    />
  </div>
);

export const WithError: Story = () => (
  <div className="max-w-sm">
    <Input label="Email" defaultValue="not-an-email" error="Введите корректный email" />
  </div>
);

export const WithIcons: Story = () => (
  <div className="flex flex-col gap-4 max-w-sm">
    <Input leftIcon={<Search size={16} />} placeholder="Поиск..." />
    <Input label="Email" leftIcon={<Mail size={16} />} placeholder="user@example.com" />
    <Input label="Пароль" rightIcon={<Eye size={16} />} type="password" placeholder="••••••••" />
  </div>
);

export const Disabled: Story = () => (
  <div className="max-w-sm">
    <Input label="Заблокировано" defaultValue="Нельзя редактировать" disabled />
  </div>
);

export const Interactive: Story<{
  label: string;
  placeholder: string;
  hint: string;
  error: string;
  disabled: boolean;
}> = ({ label, placeholder, hint, error, disabled }) => (
  <div className="max-w-sm">
    <Input
      label={label || undefined}
      placeholder={placeholder}
      hint={hint || undefined}
      error={error || undefined}
      disabled={disabled}
    />
  </div>
);
Interactive.args = {
  label: "Поле",
  placeholder: "Введите текст...",
  hint: "Подсказка",
  error: "",
  disabled: false,
};
