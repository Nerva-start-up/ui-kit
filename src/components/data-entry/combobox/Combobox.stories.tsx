import type { Story } from "@ladle/react";
import { useState } from "react";
import { Combobox } from "./Combobox";

export default { title: "Components / Data Entry / Combobox" };

const subjects = [
  { value: "crypto", label: "Криптография" },
  { value: "network", label: "Сетевая безопасность" },
  { value: "os", label: "Безопасность ОС" },
  { value: "web", label: "Веб-безопасность" },
  { value: "forensics", label: "Форензика", disabled: true },
];

const countries = [
  "Россия",
  "Казахстан",
  "Беларусь",
  "Узбекистан",
  "Армения",
  "Азербайджан",
  "Грузия",
  "Кыргызстан",
  "Таджикистан",
  "Туркменистан",
  "Молдова",
  "Украина",
].map((label) => ({ value: label.toLowerCase(), label }));

export const Default: Story = () => {
  const [value, setValue] = useState("");
  return (
    <div className="max-w-xs">
      <Combobox
        options={subjects}
        value={value}
        onValueChange={setValue}
        placeholder="Выберите предмет..."
      />
    </div>
  );
};

export const WithLabel: Story = () => {
  const [value, setValue] = useState("crypto");
  return (
    <div className="max-w-xs">
      <Combobox label="Предмет" options={subjects} value={value} onValueChange={setValue} />
    </div>
  );
};

export const SearchableLongList: Story = () => {
  const [value, setValue] = useState("");
  return (
    <div className="max-w-xs">
      <Combobox
        label="Страна"
        options={countries}
        value={value}
        onValueChange={setValue}
        placeholder="Выберите страну..."
        searchPlaceholder="Поиск страны..."
      />
    </div>
  );
};

export const WithError: Story = () => (
  <div className="max-w-xs">
    <Combobox label="Предмет" options={subjects} error="Выберите предмет для продолжения" />
  </div>
);

export const WithDisabledOption: Story = () => {
  const [value, setValue] = useState("");
  return (
    <div className="max-w-xs">
      <Combobox
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
    <Combobox label="Предмет" options={subjects} value="crypto" disabled />
  </div>
);
