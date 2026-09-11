import type { Story } from "@ladle/react";
import { BookOpen, Bot, Trophy, Zap } from "lucide-react";
import { useState } from "react";
import { Button } from "../../actions/button/Button";
import { Text } from "../../typography/Text";
import { Step } from "./Step";
import { StepContent } from "./StepContent";
import { StepDescription } from "./StepDescription";
import { StepIcon } from "./StepIcon";
import { StepIndicator } from "./StepIndicator";
import { StepLabel } from "./StepLabel";

export default { title: "Components / Navigation / StepIndicator" };

const ONBOARDING = ["Профиль", "Группа", "Знакомство с Норой", "Готово"];
const QUIZ_STEPS = ["Введение", "Вопросы", "Результат"];
const NORA_PATH = [
  { label: "Основы ИБ", desc: "CIA-триада, угрозы" },
  { label: "Модели доступа", desc: "DAC, MAC, Bell-LaPadula" },
  { label: "Криптография", desc: "AES, RSA, PKI" },
  { label: "Веб-безопасность", desc: "XSS, SQL-инъекции, CSRF" },
  { label: "Сетевая безопасность", desc: "VPN, TLS, Firewall" },
];

/* ── Горизонтальный — онбординг ─────────────────────────── */
export const Horizontal: Story = () => {
  const [current, setCurrent] = useState(1);
  return (
    <div className="flex flex-col gap-6 max-w-lg">
      <StepIndicator current={current}>
        {ONBOARDING.map((label) => (
          <Step key={label}>
            <StepIcon />
            <StepContent>
              <StepLabel>{label}</StepLabel>
            </StepContent>
          </Step>
        ))}
      </StepIndicator>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
        >
          ← Назад
        </Button>
        <Button
          onClick={() => setCurrent((c) => Math.min(ONBOARDING.length, c + 1))}
          disabled={current === ONBOARDING.length}
        >
          Далее →
        </Button>
      </div>
    </div>
  );
};

/* ── Горизонтальный — размеры ───────────────────────────── */
export const Sizes: Story = () => (
  <div className="flex flex-col gap-8 max-w-lg">
    {(["sm", "md", "lg"] as const).map((size) => (
      <div key={size} className="flex flex-col gap-2">
        <Text as="span" size="xs" variant="muted">
          {size}
        </Text>
        <StepIndicator current={1} size={size}>
          {QUIZ_STEPS.map((label) => (
            <Step key={label}>
              <StepIcon />
              <StepContent>
                <StepLabel>{label}</StepLabel>
              </StepContent>
            </Step>
          ))}
        </StepIndicator>
      </div>
    ))}
  </div>
);

/* ── Вертикальный — учебный путь Норы ───────────────────── */
export const VerticalNoraPath: Story = () => {
  const [current, setCurrent] = useState(2);
  return (
    <div className="flex gap-8 max-w-md">
      <StepIndicator current={current} orientation="vertical">
        {NORA_PATH.map((step, i) => (
          <Step key={i} onClick={() => setCurrent(i)} className="cursor-pointer">
            <StepIcon />
            <StepContent>
              <StepLabel>{step.label}</StepLabel>
              <StepDescription>{step.desc}</StepDescription>
            </StepContent>
          </Step>
        ))}
      </StepIndicator>
    </div>
  );
};

/* ── Квиз — с кастомными иконками ──────────────────────── */
export const QuizWithIcons: Story = () => {
  const [current, setCurrent] = useState(1);
  const steps = [
    { label: "Тема", desc: "Выбери модуль", icon: BookOpen },
    { label: "Вопросы", desc: "10 вопросов", icon: Zap },
    { label: "Результат", desc: "Твой KSI Score", icon: Trophy },
  ];
  return (
    <div className="flex flex-col gap-6 max-w-sm">
      <StepIndicator current={current} size="lg">
        {steps.map(({ label, desc, icon }) => (
          <Step key={label}>
            <StepIcon icon={icon} />
            <StepContent>
              <StepLabel>{label}</StepLabel>
              <StepDescription>{desc}</StepDescription>
            </StepContent>
          </Step>
        ))}
      </StepIndicator>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
        >
          ←
        </Button>
        <Button
          onClick={() => setCurrent((c) => Math.min(steps.length, c + 1))}
          disabled={current === steps.length}
        >
          →
        </Button>
      </div>
    </div>
  );
};

/* ── Error state ────────────────────────────────────────── */
export const WithError: Story = () => (
  <div className="flex flex-col gap-6 max-w-md">
    <StepIndicator current={2}>
      <Step>
        <StepIcon />
        <StepContent>
          <StepLabel>Данные</StepLabel>
        </StepContent>
      </Step>
      <Step status="error">
        <StepIcon />
        <StepContent>
          <StepLabel>Проверка</StepLabel>
          <StepDescription>Ошибка валидации</StepDescription>
        </StepContent>
      </Step>
      <Step>
        <StepIcon />
        <StepContent>
          <StepLabel>Отправка</StepLabel>
        </StepContent>
      </Step>
    </StepIndicator>
  </div>
);

/* ── Нора AI — карта прогресса ──────────────────────────── */
export const NoraProgress: Story = () => {
  const [current, setCurrent] = useState(1);
  return (
    <div className="p-5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] flex flex-col gap-4 max-w-xs">
      <div className="flex items-center gap-2">
        <Bot size={16} className="text-[var(--primary)]" />
        <Text as="span" size="sm" weight="semibold">
          Учебный путь
        </Text>
      </div>
      <StepIndicator current={current} orientation="vertical" size="sm">
        {NORA_PATH.map((step, i) => (
          <Step key={i}>
            <StepIcon />
            <StepContent>
              <StepLabel>{step.label}</StepLabel>
            </StepContent>
          </Step>
        ))}
      </StepIndicator>
      <Button
        size="sm"
        onClick={() => setCurrent((c) => Math.min(NORA_PATH.length, c + 1))}
        disabled={current === NORA_PATH.length}
        className="w-full"
      >
        {current === NORA_PATH.length ? "Завершено 🎉" : "Следующий модуль →"}
      </Button>
    </div>
  );
};
