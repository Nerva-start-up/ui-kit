import type { Story } from "@ladle/react";
import { Bell, Eye, Moon, Shield, Wifi } from "lucide-react";
import { useState } from "react";
import { Badge } from "../../data-display/badge/Badge";
import { Separator } from "../../layout/separator/Separator";
import { Text } from "../../typography/Text";
import { Switch } from "./Switch";

export default { title: "Components / Data Entry / Switch" };

/* ── Default ────────────────────────────────────────────── */
export const Default: Story = () => {
  const [on, setOn] = useState(false);
  return (
    <div className="flex flex-col gap-4 p-6 max-w-xs">
      <Switch label="Тёмная тема" checked={on} onChange={setOn} />
      <Text size="xs" variant="muted">
        Состояние: <Badge variant={on ? "success" : "default"}>{on ? "вкл" : "выкл"}</Badge>
      </Text>
    </div>
  );
};

/* ── Sizes ──────────────────────────────────────────────── */
export const Sizes: Story = () => {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  return (
    <div className="flex flex-col gap-5 p-6 max-w-xs">
      <Switch size="md" label="Размер md (по умолчанию)" checked={a} onChange={setA} />
      <Switch size="sm" label="Размер sm" checked={b} onChange={setB} />
    </div>
  );
};

/* ── With description ───────────────────────────────────── */
export const WithDescription: Story = () => {
  const [notifs, setNotifs] = useState(true);
  const [sound, setSound] = useState(false);
  const [privacy, setPrivacy] = useState(true);

  return (
    <div className="flex flex-col gap-5 p-6 max-w-sm">
      <Switch
        label="Push-уведомления"
        description="Получать оповещения об оценках и заданиях"
        checked={notifs}
        onChange={setNotifs}
      />
      <Switch
        label="Звук"
        description="Воспроизводить звук при новых уведомлениях"
        checked={sound}
        onChange={setSound}
      />
      <Switch
        label="Публичный профиль"
        description="Ваше место в рейтинге видно другим студентам"
        checked={privacy}
        onChange={setPrivacy}
      />
    </div>
  );
};

/* ── Settings panel ─────────────────────────────────────── */
export const SettingsPanel: Story = () => {
  const [settings, setSettings] = useState({
    darkMode: true,
    wifi: true,
    notifications: false,
    twoFactor: true,
    publicProfile: false,
  });

  const set = (key: keyof typeof settings) => (v: boolean) =>
    setSettings((prev) => ({ ...prev, [key]: v }));

  const rows = [
    { key: "darkMode" as const, icon: Moon, label: "Тёмная тема" },
    { key: "wifi" as const, icon: Wifi, label: "Wi-Fi" },
    { key: "notifications" as const, icon: Bell, label: "Уведомления" },
    { key: "twoFactor" as const, icon: Shield, label: "Двухфакторная аутентификация" },
    { key: "publicProfile" as const, icon: Eye, label: "Публичный профиль" },
  ];

  return (
    <div className="p-6 max-w-sm">
      <div className="rounded-[var(--radius-md)] border border-[var(--border)] overflow-hidden">
        {rows.map((row, i) => {
          const Icon = row.icon;
          return (
            <div key={row.key}>
              {i > 0 && <Separator />}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <Icon size={15} className="text-[var(--text-muted)] shrink-0" />
                  <Text as="span" size="sm">
                    {row.label}
                  </Text>
                </div>
                <Switch checked={settings[row.key]} onChange={set(row.key)} size="sm" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ── Error state ────────────────────────────────────────── */
export const ErrorState: Story = () => {
  const [agreed, setAgreed] = useState(false);
  return (
    <div className="flex flex-col gap-4 p-6 max-w-xs">
      <Switch
        label="Принимаю условия"
        description="Необходимо для доступа к платформе"
        checked={agreed}
        onChange={setAgreed}
        error={!agreed ? "Необходимо принять условия" : undefined}
      />
    </div>
  );
};

/* ── Hint ────────────────────────────────────────────────── */
export const WithHint: Story = () => {
  const [beta, setBeta] = useState(false);
  return (
    <div className="flex flex-col gap-4 p-6 max-w-xs">
      <Switch
        label="Бета-функции"
        checked={beta}
        onChange={setBeta}
        hint="Некоторые функции могут быть нестабильны"
      />
    </div>
  );
};

/* ── Disabled ────────────────────────────────────────────── */
export const Disabled: Story = () => (
  <div className="flex flex-col gap-4 p-6 max-w-xs">
    <Switch label="Отключено (выкл)" disabled />
    <Switch label="Отключено (вкл)" defaultChecked disabled />
    <Switch
      label="Отключено с описанием"
      description="Недоступно в текущем тарифе"
      defaultChecked
      disabled
    />
  </div>
);

/* ── Uncontrolled ───────────────────────────────────────── */
export const Uncontrolled: Story = () => (
  <div className="flex flex-col gap-4 p-6 max-w-xs">
    <Switch label="По умолчанию выкл" />
    <Switch label="По умолчанию вкл" defaultChecked />
  </div>
);
