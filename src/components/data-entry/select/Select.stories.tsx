import type { Story } from "@ladle/react";
import { Bug, Globe, Key, Shield } from "lucide-react";
import { useState } from "react";
import { Button } from "../../actions/button/Button";
import { Dialog } from "../../overlay/dialog/Dialog";
import { Select } from "./Select";

export default { title: "Components / Data Entry / Select" };

const groups = [
  { value: "ib-101", label: "ИБ-101" },
  { value: "ib-102", label: "ИБ-102" },
  { value: "ib-201", label: "ИБ-201" },
  { value: "ib-202", label: "ИБ-202" },
];

const subjects = [
  { value: "crypto", label: "Криптография" },
  { value: "network", label: "Сетевая безопасность" },
  { value: "os", label: "Безопасность ОС" },
  { value: "web", label: "Веб-безопасность" },
  { value: "forensics", label: "Форензика", disabled: true },
];

export const Default: Story = () => {
  const [value, setValue] = useState("");
  return (
    <div className="max-w-xs">
      <Select
        options={groups}
        value={value}
        onValueChange={setValue}
        placeholder="Выберите группу..."
      />
    </div>
  );
};

export const WithLabel: Story = () => {
  const [value, setValue] = useState("crypto");
  return (
    <div className="max-w-xs">
      <Select label="Предмет" options={subjects} value={value} onValueChange={setValue} />
    </div>
  );
};

export const WithError: Story = () => (
  <div className="max-w-xs">
    <Select label="Группа" options={groups} error="Выберите группу для продолжения" />
  </div>
);

export const WithDisabledOption: Story = () => {
  const [value, setValue] = useState("");
  return (
    <div className="max-w-xs">
      <Select
        label="Предмет"
        options={subjects}
        value={value}
        onValueChange={setValue}
        placeholder="Форензика недоступна..."
      />
    </div>
  );
};

export const Disabled: Story = () => (
  <div className="max-w-xs">
    <Select label="Год обучения" options={[{ value: "2", label: "2-й курс" }]} value="2" disabled />
  </div>
);

const categoriesWithIcons = [
  { value: "network", label: "Сети", icon: Globe },
  { value: "crypto", label: "Криптография", icon: Key },
  { value: "web", label: "Веб-безопасность", icon: Shield },
  { value: "vuln", label: "Уязвимости", icon: Bug },
];

export const WithIcons: Story = () => {
  const [value, setValue] = useState("crypto");
  return (
    <div className="max-w-xs">
      <Select
        label="Категория"
        options={categoriesWithIcons}
        value={value}
        onValueChange={setValue}
      />
    </div>
  );
};

const colors = [
  { value: "#60a5fa", label: "Синий", swatch: "#60a5fa" },
  { value: "#a78bfa", label: "Фиолетовый", swatch: "#a78bfa" },
  { value: "#f97316", label: "Оранжевый", swatch: "#f97316" },
  { value: "#4ade80", label: "Зелёный", swatch: "#4ade80" },
];

export const WithSwatches: Story = () => {
  const [value, setValue] = useState("#f97316");
  return (
    <div className="max-w-xs">
      <Select label="Цвет" options={colors} value={value} onValueChange={setValue} />
    </div>
  );
};

/**
 * Regression: у Radix `Select` физически нет пропа `modal`, поэтому `Dialog` сам
 * нейтрализует оба способа, которыми немодальный-по-DOM Select мог его закрыть —
 * клик по опции (портал вне `Dialog.Content`) и повторный клик по триггеру
 * (aria-hidden → Motion выставляет `pointer-events: none`). См. `Dialog.tsx`.
 */
export const InsideDialog: Story = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <>
      <Button onClick={() => setOpen(true)}>Открыть диалог с селектом</Button>
      <Dialog open={open} onOpenChange={setOpen} title="Настройки группы">
        <Select
          label="Группа"
          options={groups}
          value={value}
          onValueChange={setValue}
          placeholder="Выберите группу..."
        />
      </Dialog>
    </>
  );
};
