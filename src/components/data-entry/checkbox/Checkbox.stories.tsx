import type { Story } from "@ladle/react";
import { useState } from "react";
import { Badge } from "../../data-display/badge/Badge";
import { Text } from "../../typography/Text";
import { Checkbox, CheckboxGroup, CheckboxItem } from "./Checkbox";

export default { title: "Components / Data Entry / Checkbox" };

/* ── Default ────────────────────────────────────────────── */
export const Default: Story = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex flex-col gap-4 p-6 max-w-xs">
      <Checkbox label="Принимаю условия" checked={checked} onChange={setChecked} />
      <Text size="xs" variant="muted">
        Значение: <Badge variant={checked ? "success" : "default"}>{String(checked)}</Badge>
      </Text>
    </div>
  );
};

/* ── With description ───────────────────────────────────── */
export const WithDescription: Story = () => {
  const [a, setA] = useState(false);
  const [b, setB] = useState(true);

  return (
    <div className="flex flex-col gap-4 p-6 max-w-sm">
      <Checkbox
        label="Уведомления по email"
        description="Получать уведомления об оценках и новых заданиях"
        checked={a}
        onChange={setA}
      />
      <Checkbox
        label="Публичный профиль"
        description="Ваше место в рейтинге видно другим студентам"
        checked={b}
        onChange={setB}
      />
    </div>
  );
};

/* ── Indeterminate ──────────────────────────────────────── */
export const Indeterminate: Story = () => {
  const options = ["Присутствие", "Задание", "Викторина"];
  const [selected, setSelected] = useState<string[]>(["Присутствие"]);

  const allChecked = selected.length === options.length;
  const someChecked = selected.length > 0 && !allChecked;

  const toggleAll = () => {
    setSelected(allChecked ? [] : options);
  };

  const toggle = (item: string) => {
    setSelected((prev) => (prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]));
  };

  return (
    <div className="flex flex-col gap-3 p-6 max-w-xs">
      <Checkbox
        label="Все компоненты"
        checked={allChecked}
        indeterminate={someChecked}
        onChange={toggleAll}
      />
      <div className="flex flex-col gap-2 pl-7">
        {options.map((opt) => (
          <Checkbox
            key={opt}
            label={opt}
            checked={selected.includes(opt)}
            onChange={() => toggle(opt)}
          />
        ))}
      </div>
    </div>
  );
};

/* ── Group ──────────────────────────────────────────────── */
export const Group: Story = () => {
  const [permissions, setPermissions] = useState<string[]>(["read"]);

  return (
    <div className="flex flex-col gap-6 p-6 max-w-xs">
      <CheckboxGroup
        label="Права доступа"
        value={permissions}
        onChange={setPermissions}
        hint="Выберите разрешённые действия"
      >
        <CheckboxItem value="read" label="Просмотр" description="Читать материалы" />
        <CheckboxItem
          value="write"
          label="Редактирование"
          description="Загружать и редактировать"
        />
        <CheckboxItem value="delete" label="Удаление" description="Удалять материалы" />
        <CheckboxItem value="admin" label="Администратор" description="Полный доступ" disabled />
      </CheckboxGroup>
      <Text size="xs" variant="muted">
        Выбрано: <Badge variant="orange">{permissions.join(", ") || "—"}</Badge>
      </Text>
    </div>
  );
};

/* ── Horizontal group ───────────────────────────────────── */
export const HorizontalGroup: Story = () => {
  const [days, setDays] = useState<string[]>(["mon", "wed", "fri"]);

  return (
    <div className="flex flex-col gap-4 p-6 max-w-sm">
      <CheckboxGroup label="Дни занятий" value={days} onChange={setDays} orientation="horizontal">
        {[
          { value: "mon", label: "Пн" },
          { value: "tue", label: "Вт" },
          { value: "wed", label: "Ср" },
          { value: "thu", label: "Чт" },
          { value: "fri", label: "Пт" },
          { value: "sat", label: "Сб" },
        ].map((d) => (
          <CheckboxItem key={d.value} value={d.value} label={d.label} />
        ))}
      </CheckboxGroup>
    </div>
  );
};

/* ── Error state ────────────────────────────────────────── */
export const ErrorState: Story = () => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-6 max-w-xs">
      <Checkbox
        label="Согласен с правилами платформы"
        checked={agreed}
        onChange={setAgreed}
        error={!agreed ? "Необходимо принять условия для продолжения" : undefined}
      />
    </div>
  );
};

/* ── Disabled ───────────────────────────────────────────── */
export const Disabled: Story = () => (
  <div className="flex flex-col gap-3 p-6 max-w-xs">
    <Checkbox label="Отключено (не выбрано)" disabled />
    <Checkbox label="Отключено (выбрано)" defaultChecked disabled />
    <Checkbox
      label="Отключено (описание)"
      description="Изменение недоступно"
      defaultChecked
      disabled
    />
  </div>
);

/* ── Uncontrolled ───────────────────────────────────────── */
export const Uncontrolled: Story = () => (
  <div className="flex flex-col gap-3 p-6 max-w-xs">
    <Checkbox label="Запомнить меня" defaultChecked={false} />
    <Checkbox label="Получать рассылку" defaultChecked hint="Можно отписаться в настройках" />
  </div>
);
