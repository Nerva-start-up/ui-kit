import { Check } from "lucide-react";
import { cn } from "../../../lib/cn";
import type { ComboboxOption } from "./types";

export type ComboboxItemProps = {
  option: ComboboxOption;
  active: boolean;
  selected: boolean;
  onSelect: (option: ComboboxOption) => void;
  onMouseEnter: () => void;
};

export function ComboboxItem({
  option,
  active,
  selected,
  onSelect,
  onMouseEnter,
}: ComboboxItemProps) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: needs disabled + click semantics of a real <button>, not a native <option>
    <button
      role="option"
      type="button"
      aria-selected={selected}
      disabled={option.disabled}
      onClick={() => onSelect(option)}
      onMouseEnter={onMouseEnter}
      className={cn(
        "flex w-full items-center gap-2 px-3 py-2 text-[15px] rounded-[var(--radius-sm)]",
        "text-[var(--text)] outline-none cursor-pointer select-none text-left",
        "transition-colors duration-100",
        active && !option.disabled && "bg-[var(--surface-2)]",
        option.disabled && "opacity-40 cursor-not-allowed"
      )}
    >
      <span className="flex-1 truncate">{option.label}</span>
      {selected && <Check size={13} className="shrink-0 text-[var(--primary)]" />}
    </button>
  );
}
