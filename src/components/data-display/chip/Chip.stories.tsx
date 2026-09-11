import type { Story } from "@ladle/react";
import { Globe, Lock, Shield } from "lucide-react";
import { useState } from "react";
import { Chip } from "./Chip";

export default { title: "Components / Data Display / Chip" };

export const Static: Story = () => (
  <div className="flex flex-wrap gap-2">
    <Chip label="React" />
    <Chip label="TypeScript" selected />
    <Chip label="Tailwind" />
    <Chip label="Radix UI" selected />
  </div>
);

export const WithIcons: Story = () => (
  <div className="flex flex-wrap gap-2">
    <Chip label="Шифрование" icon={<Lock size={12} />} selected />
    <Chip label="Сетевая безопасность" icon={<Globe size={12} />} />
    <Chip label="Криптография" icon={<Shield size={12} />} />
  </div>
);

export const Removable: Story = () => {
  const [items, setItems] = useState(["XSS", "SQL-инъекции", "CSRF", "JWT"]);
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Chip
          key={item}
          label={item}
          selected
          onRemove={() => setItems((prev) => prev.filter((i) => i !== item))}
        />
      ))}
    </div>
  );
};

export const AsFilterGroup: Story = () => {
  const topics = ["Все темы", "Криптография", "Сети", "Веб-безопасность", "ОС"];
  const [active, setActive] = useState("Все темы");
  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((t) => (
        <Chip key={t} label={t} selected={active === t} onClick={() => setActive(t)} />
      ))}
    </div>
  );
};

export const Disabled: Story = () => (
  <div className="flex gap-2">
    <Chip label="Активный" selected />
    <Chip label="Недоступен" disabled />
    <Chip label="Выбран + заблокирован" selected disabled />
  </div>
);
