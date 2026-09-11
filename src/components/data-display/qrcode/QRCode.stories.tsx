import type { Story } from "@ladle/react";
import { GraduationCap } from "lucide-react";
import { Text } from "../../typography/Text";
import { QRCode } from "./QRCode";

export default { title: "Components / Data Display / QRCode" };

export const Default: Story = () => <QRCode value="https://ksi-ed.uz" />;

export const Sizes: Story = () => (
  <div className="flex items-end gap-4">
    <QRCode value="https://ksi-ed.uz" size={80} />
    <QRCode value="https://ksi-ed.uz" size={140} />
    <QRCode value="https://ksi-ed.uz" size={220} />
  </div>
);

export const ErrorCorrectionLevels: Story = () => (
  <div className="flex gap-4">
    {(["L", "M", "Q", "H"] as const).map((level) => (
      <div key={level} className="flex flex-col items-center gap-2">
        <QRCode value="https://ksi-ed.uz" level={level} size={120} />
        <Text as="span" size="xs" variant="muted">
          {level}
        </Text>
      </div>
    ))}
  </div>
);

export const WithLogo: Story = () => (
  <QRCode
    value="https://ksi-ed.uz/join?group=ib-101"
    level="H"
    size={200}
    logo={
      <div className="flex h-full w-full items-center justify-center bg-[var(--primary)]">
        <GraduationCap size={20} color="white" />
      </div>
    }
  />
);

export const CustomColors: Story = () => (
  <div className="flex gap-4 rounded-[var(--radius-lg)] bg-[#0b0f14] p-6">
    <QRCode value="https://ksi-ed.uz" color="var(--primary)" background="transparent" size={160} />
  </div>
);

export const Interactive: Story<{ value: string; size: number; level: "L" | "M" | "Q" | "H" }> = ({
  value,
  size,
  level,
}) => <QRCode value={value || "https://ksi-ed.uz"} size={size} level={level} />;
Interactive.args = { value: "https://ksi-ed.uz", size: 200, level: "M" };
Interactive.argTypes = {
  size: { control: { type: "range", min: 80, max: 320, step: 10 } },
  level: { options: ["L", "M", "Q", "H"], control: { type: "select" } },
};
