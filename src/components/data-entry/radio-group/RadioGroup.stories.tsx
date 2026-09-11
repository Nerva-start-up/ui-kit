import type { Story } from "@ladle/react";
import { Bell, LayoutGrid, List, Shield, User, Zap } from "lucide-react";
import { useState } from "react";
import { Button } from "../../actions/button/Button";
import { Badge } from "../../data-display/badge/Badge";
import { Text } from "../../typography/Text";
import { RadioGroup, RadioItem } from "./RadioGroup";

export default { title: "Components / Data Entry / RadioGroup" };

/* ── Basic ──────────────────────────────────────────────── */
export const Basic: Story = () => {
  const [value, setValue] = useState("student");
  return (
    <div className="flex flex-col gap-6 p-4 max-w-sm">
      <RadioGroup name="role" value={value} onChange={setValue} label="Роль пользователя">
        <RadioItem value="student" label="Студент" />
        <RadioItem value="teacher" label="Преподаватель" />
        <RadioItem value="admin" label="Администратор" />
      </RadioGroup>
      <Text size="xs" variant="muted">
        Выбрано: <Badge variant="orange">{value}</Badge>
      </Text>
    </div>
  );
};

/* ── With hints ─────────────────────────────────────────── */
export const WithHints: Story = () => {
  const [value, setValue] = useState("balanced");
  return (
    <div className="p-4 max-w-sm">
      <RadioGroup
        name="score-mode"
        value={value}
        onChange={setValue}
        label="Режим подсчёта KSI Score"
        hint="Влияет на весовые коэффициенты при расчёте рейтинга"
      >
        <RadioItem
          value="balanced"
          label="Сбалансированный"
          hint="40% академика · 25% активность · 20% вклад · 15% взаимодействие"
        />
        <RadioItem value="academic" label="Академический" hint="70% академика · 30% активность" />
        <RadioItem value="activity" label="Активность" hint="50% активность · 50% вклад" />
      </RadioGroup>
    </div>
  );
};

/* ── Horizontal ─────────────────────────────────────────── */
export const Horizontal: Story = () => {
  const [value, setValue] = useState("list");
  return (
    <div className="p-4 max-w-sm">
      <RadioGroup
        name="view"
        value={value}
        onChange={setValue}
        label="Вид отображения"
        orientation="horizontal"
      >
        <RadioItem value="list" label="Список" />
        <RadioItem value="grid" label="Сетка" />
        <RadioItem value="compact" label="Компактный" />
      </RadioGroup>
    </div>
  );
};

/* ── With error ─────────────────────────────────────────── */
export const WithError: Story = () => {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const error = submitted && !value ? "Выберите один из вариантов" : undefined;

  return (
    <div className="flex flex-col gap-4 p-4 max-w-sm">
      <RadioGroup name="group-error" value={value} onChange={setValue} label="Группа" error={error}>
        <RadioItem value="2a" label="2-А" />
        <RadioItem value="2b" label="2-Б" />
        <RadioItem value="3a" label="3-А" />
      </RadioGroup>
      <Button size="sm" onClick={() => setSubmitted(true)}>
        Подтвердить
      </Button>
    </div>
  );
};

/* ── Disabled ───────────────────────────────────────────── */
export const Disabled: Story = () => (
  <div className="flex flex-col gap-6 p-4 max-w-sm">
    <RadioGroup
      name="disabled-group"
      defaultValue="teacher"
      label="Группа (заблокирована)"
      disabled
    >
      <RadioItem value="student" label="Студент" />
      <RadioItem value="teacher" label="Преподаватель" />
      <RadioItem value="admin" label="Администратор" />
    </RadioGroup>

    <RadioGroup name="partial-disabled" defaultValue="student" label="Частичная блокировка">
      <RadioItem value="student" label="Студент" />
      <RadioItem value="teacher" label="Преподаватель (недоступно)" disabled />
      <RadioItem value="admin" label="Администратор (недоступно)" disabled />
    </RadioGroup>
  </div>
);

/* ── Uncontrolled ───────────────────────────────────────── */
export const Uncontrolled: Story = () => (
  <div className="p-4 max-w-sm">
    <RadioGroup
      name="uncontrolled"
      defaultValue="on"
      label="Уведомления"
      hint="Состояние управляется внутри компонента"
    >
      <RadioItem value="on" label="Включены" />
      <RadioItem value="important" label="Только важные" />
      <RadioItem value="off" label="Отключены" />
    </RadioGroup>
  </div>
);

/* ── Card variant ───────────────────────────────────────── */
export const Card: Story = () => {
  const [value, setValue] = useState("student");
  return (
    <div className="p-4 max-w-sm">
      <RadioGroup
        name="card-role"
        value={value}
        onChange={setValue}
        variant="card"
        label="Роль пользователя"
      >
        <RadioItem
          value="student"
          icon={<User size={16} />}
          label="Студент"
          hint="Доступ к курсам, заданиям и чату с Норой"
        />
        <RadioItem
          value="teacher"
          icon={<Shield size={16} />}
          label="Преподаватель"
          hint="Создание заданий, отметка посещаемости"
        />
        <RadioItem
          value="admin"
          icon={<Zap size={16} />}
          label="Администратор"
          hint="Полный доступ ко всем функциям платформы"
        />
      </RadioGroup>
    </div>
  );
};

/* ── Card horizontal ────────────────────────────────────── */
export const CardHorizontal: Story = () => {
  const [value, setValue] = useState("list");
  return (
    <div className="p-4 max-w-lg">
      <RadioGroup
        name="card-view"
        value={value}
        onChange={setValue}
        variant="card"
        orientation="horizontal"
        label="Вид отображения"
      >
        <RadioItem value="list" icon={<List size={16} />} label="Список" hint="Строки" />
        <RadioItem value="grid" icon={<LayoutGrid size={16} />} label="Сетка" hint="Карточки" />
        <RadioItem value="compact" icon={<Bell size={16} />} label="Компактный" hint="Плотно" />
      </RadioGroup>
    </div>
  );
};

/* ── Card disabled ──────────────────────────────────────── */
export const CardDisabled: Story = () => (
  <div className="p-4 max-w-sm">
    <RadioGroup name="card-disabled" defaultValue="student" variant="card" label="Тарифный план">
      <RadioItem value="student" icon={<User size={16} />} label="Студент" hint="Бесплатно" />
      <RadioItem value="pro" icon={<Zap size={16} />} label="Pro" hint="Скоро" disabled />
    </RadioGroup>
  </div>
);
