import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import type React from "react";
import { cn } from "../../../lib/cn";
import { Stack } from "../../layout/Stack";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ElementType;
  /** CSS-цвет (hex/rgb/var) — рисует цветной кружок перед лейблом, если `icon` не задан */
  swatch?: string;
};

export type SelectProps = {
  /** controlled value */
  value?: string;
  onValueChange?: (value: string) => void;
  /** `{ value, label, disabled?, icon?, swatch? }[]` */
  options: SelectOption[];
  placeholder?: string;
  /** подпись */
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
};

/** Dropdown-селект на Radix UI. */
export function Select({
  value,
  onValueChange,
  options,
  placeholder = "Выбрать...",
  label,
  error,
  disabled,
  className,
}: SelectProps) {
  const selectedOption = options.find((o) => o.value === value);
  const SelectedIcon = selectedOption?.icon;

  return (
    <Stack gap={1.5}>
      {label && <span className="text-[13px] font-medium text-[var(--text-sub)]">{label}</span>}

      <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectPrimitive.Trigger
          className={cn(
            "flex items-center justify-between w-full",
            "bg-[var(--surface-2)] border rounded-[var(--radius-md)]",
            "px-3.5 py-[11px] text-[15px] text-[var(--text)]",
            "outline-none transition-[border-color,box-shadow] duration-150 cursor-pointer",
            "data-[placeholder]:text-[var(--text-muted)]",
            // default
            !error &&
              !disabled && [
                "border-[var(--border)]",
                "hover:border-[var(--text-muted)]",
                "focus:border-[var(--primary)]",
                "focus:shadow-[0_0_0_3px_rgba(249,115,22,0.15)]",
              ],
            // error
            error && ["border-[var(--error)]", "focus:shadow-[0_0_0_3px_rgba(248,113,113,0.15)]"],
            // disabled
            disabled && "border-[var(--border)] opacity-50 cursor-not-allowed",
            className
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder}>
            {selectedOption && (
              <span className="flex items-center gap-2 truncate">
                {SelectedIcon ? (
                  <SelectedIcon size={15} className="shrink-0 text-[var(--text-muted)]" />
                ) : (
                  selectedOption.swatch && (
                    <span
                      className="shrink-0 rounded-full border border-[var(--border)]"
                      style={{ width: 12, height: 12, background: selectedOption.swatch }}
                    />
                  )
                )}
                {selectedOption.label}
              </span>
            )}
          </SelectPrimitive.Value>
          <SelectPrimitive.Icon>
            <ChevronDown size={15} className="text-[var(--text-muted)] shrink-0" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={6}
            className={cn(
              "w-[var(--radix-select-trigger-width)]",
              "bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-md)]",
              "shadow-[var(--shadow)] overflow-hidden z-50",
              "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
            )}
            style={{ maxHeight: "var(--radix-select-content-available-height)" }}
          >
            <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1 text-[var(--text-muted)]">
              <ChevronUp size={14} />
            </SelectPrimitive.ScrollUpButton>
            <SelectPrimitive.Viewport className="p-1 max-h-72 overflow-y-auto">
              {options.map((opt) => {
                const Icon = opt.icon;
                return (
                  <SelectPrimitive.Item
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-[15px] rounded-[var(--radius-sm)]",
                      "text-[var(--text)] outline-none cursor-pointer select-none",
                      "transition-colors duration-100",
                      "data-[highlighted]:bg-[var(--surface-2)]",
                      "data-[disabled]:opacity-40 data-[disabled]:cursor-not-allowed"
                    )}
                  >
                    {Icon ? (
                      <Icon size={14} className="shrink-0 text-[var(--text-muted)]" />
                    ) : (
                      opt.swatch && (
                        <span
                          className="shrink-0 rounded-full border border-[var(--border)]"
                          style={{ width: 12, height: 12, background: opt.swatch }}
                        />
                      )
                    )}
                    <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                    <SelectPrimitive.ItemIndicator className="ml-auto">
                      <Check size={13} className="text-[var(--primary)]" />
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                );
              })}
            </SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-1 text-[var(--text-muted)]">
              <ChevronDown size={14} />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {error && <p className="text-[13px] text-[var(--error)]">{error}</p>}
    </Stack>
  );
}
