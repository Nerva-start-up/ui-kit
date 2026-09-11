import { useResetIndexOnChange } from "@hooks/useResetIndexOnChange";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../../lib/cn";
import { HStack } from "../../layout/HStack";
import { Stack } from "../../layout/Stack";
import { Popover, PopoverContent, PopoverTrigger } from "../../overlay/popover/Popover";
import { ComboboxItem } from "./ComboboxItem";
import { filterOptions } from "./filter";
import type { ComboboxOption } from "./types";

export type ComboboxProps = {
  /** `{ value, label, disabled? }[]` */
  options: ComboboxOption[];
  /** controlled value */
  value?: string;
  onValueChange?: (value: string) => void;
  /** текст на триггере, когда ничего не выбрано */
  placeholder?: string;
  /** placeholder поля поиска в попапе */
  searchPlaceholder?: string;
  /** текст, когда поиск не дал результатов */
  emptyText?: string;
  /** подпись */
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
};

/** Dropdown-селект с поиском по опциям (typeahead) — для длинных списков. */
export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Выбрать...",
  searchPlaceholder = "Поиск...",
  emptyText = "Ничего не найдено",
  label,
  error,
  disabled,
  className,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => filterOptions(options, search), [options, search]);
  const selectedOption = options.find((o) => o.value === value);
  const [activeIndex, setActiveIndex] = useResetIndexOnChange(filtered);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setSearch("");
      setActiveIndex(0);
    }
  };

  const handleSelect = (option: ComboboxOption) => {
    if (option.disabled) return;
    onValueChange?.(option.value);
    handleOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const option = filtered[activeIndex];
      if (option) handleSelect(option);
    } else if (e.key === "Escape") {
      handleOpenChange(false);
    }
  };

  return (
    <Stack gap={1.5}>
      {label && <span className="text-[13px] font-medium text-[var(--text-sub)]">{label}</span>}

      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "flex items-center justify-between w-full gap-2",
              "bg-[var(--surface-2)] border rounded-[var(--radius-md)]",
              "px-3.5 py-[11px] text-[15px] text-[var(--text)]",
              "outline-none transition-[border-color,box-shadow] duration-150 cursor-pointer",
              !error &&
                !disabled && [
                  "border-[var(--border)]",
                  "hover:border-[var(--text-muted)]",
                  "focus:border-[var(--primary)]",
                  "focus:shadow-[0_0_0_3px_rgba(249,115,22,0.15)]",
                ],
              error && ["border-[var(--error)]", "focus:shadow-[0_0_0_3px_rgba(248,113,113,0.15)]"],
              disabled && "border-[var(--border)] opacity-50 cursor-not-allowed",
              className
            )}
          >
            <span className={cn("truncate", !selectedOption && "text-[var(--text-muted)]")}>
              {selectedOption?.label ?? placeholder}
            </span>
            <ChevronDown size={15} className="shrink-0 text-[var(--text-muted)]" />
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          sideOffset={6}
          className="w-[var(--radix-popover-trigger-width)] p-0 overflow-hidden"
        >
          <HStack gap={2} className="border-b border-[var(--border)] px-3 py-2">
            <Search size={14} className="shrink-0 text-[var(--text-muted)]" />
            <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={searchPlaceholder}
              className="flex-1 bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none"
            />
          </HStack>

          {/* biome-ignore lint/a11y/useSemanticElements lint/a11y/useFocusableInteractive: listbox container, items manage their own focus */}
          <div role="listbox" className="max-h-[280px] overflow-y-auto p-1">
            {filtered.length === 0 ? (
              <p className="py-6 text-center text-sm text-[var(--text-muted)]">{emptyText}</p>
            ) : (
              filtered.map((option, index) => (
                <ComboboxItem
                  key={option.value}
                  option={option}
                  active={index === activeIndex}
                  selected={option.value === value}
                  onSelect={handleSelect}
                  onMouseEnter={() => setActiveIndex(index)}
                />
              ))
            )}
          </div>
        </PopoverContent>
      </Popover>

      {error && <p className="text-[13px] text-[var(--error)]">{error}</p>}
    </Stack>
  );
}
