import type { Story } from "@ladle/react";
import { HelpCircle, Info, Shield } from "lucide-react";
import { Button } from "../../actions/button/Button";
import { Text } from "../../typography/Text";
import { Tooltip, TooltipProvider } from "./Tooltip";

export default { title: "Components / Overlay / Tooltip" };

export const Sides: Story = () => (
  <TooltipProvider>
    <div className="flex items-center justify-center gap-8 py-12">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side} content={`side="${side}"`} side={side}>
          <Button variant="outline" size="sm">
            {side}
          </Button>
        </Tooltip>
      ))}
    </div>
  </TooltipProvider>
);

export const OnIcon: Story = () => (
  <TooltipProvider>
    <div className="flex items-center gap-4">
      <Tooltip content="KSI Score — взвешенный балл активности студента">
        <button
          type="button"
          className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
        >
          <Info size={18} />
        </button>
      </Tooltip>
      <Tooltip content="Нажмите для получения помощи">
        <button
          type="button"
          className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
        >
          <HelpCircle size={18} />
        </button>
      </Tooltip>
      <Tooltip content="Уровень доступа: student">
        <button type="button" className="text-[var(--info)]">
          <Shield size={18} />
        </button>
      </Tooltip>
    </div>
  </TooltipProvider>
);

export const RichContent: Story = () => (
  <TooltipProvider>
    <Tooltip
      content={
        <div className="flex flex-col gap-1">
          <Text as="span" weight="semibold">
            KSI Score
          </Text>
          <Text as="span" variant="muted">
            40% академика · 25% активность
          </Text>
        </div>
      }
    >
      <Button variant="ghost" size="sm">
        Как считается балл?
      </Button>
    </Tooltip>
  </TooltipProvider>
);
