import type { Story } from "@ladle/react";
import { Textarea } from "./Textarea";

export default { title: "Components / Data Entry / Textarea" };

export const Default: Story = () => (
  <div className="max-w-sm">
    <Textarea placeholder="Введите текст..." />
  </div>
);

export const WithLabel: Story = () => (
  <div className="max-w-sm">
    <Textarea label="Решение задания" placeholder="Опишите ваше решение..." rows={5} />
  </div>
);

export const WithHint: Story = () => (
  <div className="max-w-sm">
    <Textarea
      label="Описание уязвимости"
      placeholder="Опишите уязвимость и способ эксплуатации..."
      hint="Минимум 100 символов. Используйте технические термины."
      rows={4}
    />
  </div>
);

export const WithError: Story = () => (
  <div className="max-w-sm">
    <Textarea
      label="Решение"
      defaultValue="слишком короткий"
      error="Решение должно содержать минимум 100 символов"
    />
  </div>
);

export const Disabled: Story = () => (
  <div className="max-w-sm">
    <Textarea
      label="Комментарий преподавателя"
      defaultValue="Хорошая работа! Задание выполнено верно."
      disabled
    />
  </div>
);
