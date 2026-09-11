import type { Story } from "@ladle/react";
import { Text } from "../components/typography/Text";

export default { title: "Foundation / Design Tokens" };

const colors = [
  { name: "--bg", label: "Background" },
  { name: "--surface", label: "Surface" },
  { name: "--surface-2", label: "Surface 2" },
  { name: "--border", label: "Border" },
  { name: "--text", label: "Text" },
  { name: "--text-sub", label: "Text Sub" },
  { name: "--text-muted", label: "Text Muted" },
  { name: "--primary", label: "Primary" },
  { name: "--primary-h", label: "Primary Hover" },
  { name: "--primary-d", label: "Primary Dark" },
  { name: "--success", label: "Success" },
  { name: "--error", label: "Error" },
  { name: "--info", label: "Info" },
  { name: "--holiday", label: "Holiday" },
];

const radii = [
  { name: "--radius-sm", label: "sm" },
  { name: "--radius-md", label: "md" },
  { name: "--radius-lg", label: "lg" },
  { name: "--radius-xl", label: "xl" },
];

const fontFamilies = [
  { name: "--font-sans", label: "Sans (UI, тексты)", hint: "family-name" },
  { name: "--font-mono", label: "Mono (код, токены)", hint: "family-name" },
];

const fontSizes = [
  { name: "--font-size-xs", label: "xs" },
  { name: "--font-size-sm", label: "sm" },
  { name: "--font-size-md", label: "md" },
  { name: "--font-size-lg", label: "lg" },
  { name: "--font-size-xl", label: "xl" },
  { name: "--font-size-2xl", label: "2xl" },
  { name: "--font-size-3xl", label: "3xl" },
];

const fontWeights = [
  { name: "--font-weight-normal", label: "normal" },
  { name: "--font-weight-medium", label: "medium" },
  { name: "--font-weight-semibold", label: "semibold" },
  { name: "--font-weight-bold", label: "bold" },
];

export const Colors: Story = () => (
  <div className="flex flex-wrap gap-3">
    {colors.map(({ name, label }) => (
      <div key={name} className="flex flex-col gap-1.5 w-[120px]">
        <div
          className="h-12 w-full rounded-[var(--radius-md)] border border-[var(--border)]"
          style={{ background: `var(${name})` }}
        />
        <Text weight="medium" className="text-[11px]">
          {label}
        </Text>
        <Text variant="muted" mono className="text-[10px]">
          {name}
        </Text>
      </div>
    ))}
  </div>
);

export const Radii: Story = () => (
  <div className="flex flex-wrap gap-6">
    {radii.map(({ name, label }) => (
      <div key={name} className="flex flex-col gap-2 items-center">
        <div
          className="w-20 h-20 bg-[var(--surface-2)] border border-[var(--border)]"
          style={{ borderRadius: `var(${name})` }}
        />
        <Text size="xs" weight="medium">
          {label}
        </Text>
        <Text variant="muted" mono className="text-[10px]">
          {name}
        </Text>
      </div>
    ))}
  </div>
);

export const Fonts: Story = () => (
  <div className="flex flex-col gap-6">
    {fontFamilies.map(({ name, label }) => (
      <div key={name} className="flex flex-col gap-1.5">
        <p className="text-lg text-[var(--text)]" style={{ fontFamily: `var(${name})` }}>
          {label} — AaBbCc 0123456789
        </p>
        <Text variant="muted" mono className="text-[10px]">
          {name}
        </Text>
      </div>
    ))}
  </div>
);

export const FontSizes: Story = () => (
  <div className="flex flex-col gap-4 max-w-md">
    {fontSizes.map(({ name, label }) => (
      <div key={name} className="flex items-baseline gap-3">
        <p
          className="text-[var(--text)] leading-[var(--line-height-normal)]"
          style={{ fontSize: `var(${name})` }}
        >
          Заголовок и текст — {label}
        </p>
        <Text variant="muted" mono className="text-[10px] shrink-0">
          {name}
        </Text>
      </div>
    ))}
  </div>
);

export const FontWeights: Story = () => (
  <div className="flex flex-col gap-3 max-w-md">
    {fontWeights.map(({ name, label }) => (
      <div key={name} className="flex items-baseline gap-3">
        <p className="text-lg text-[var(--text)]" style={{ fontWeight: `var(${name})` }}>
          {label} — Нора, ИИ-наставник
        </p>
        <Text variant="muted" mono className="text-[10px] shrink-0">
          {name}
        </Text>
      </div>
    ))}
  </div>
);

export const Shadows: Story = () => (
  <div className="flex flex-wrap gap-8">
    {[
      { name: "--shadow-sm", label: "shadow-sm" },
      { name: "--shadow", label: "shadow" },
      { name: "--shadow-glow", label: "shadow-glow" },
    ].map(({ name, label }) => (
      <div key={name} className="flex flex-col gap-3 items-center">
        <div
          className="w-24 h-24 bg-[var(--surface)] rounded-[var(--radius-lg)]"
          style={{ boxShadow: `var(${name})` }}
        />
        <Text size="xs" variant="muted" mono>
          {label}
        </Text>
      </div>
    ))}
  </div>
);
