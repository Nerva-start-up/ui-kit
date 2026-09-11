import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../actions/button/Button";
import { Flex } from "../../layout/Flex";
import { HStack } from "../../layout/HStack";
import { TransferPanel } from "./TransferPanel";
import type { TransferDirection, TransferItem } from "./types";
import { useTransfer } from "./useTransfer";

export type TransferProps = {
  /** Полный список всех элементов (источник + выбранные) */
  dataSource: TransferItem[];
  /** Controlled ключи элементов в правой панели */
  targetKeys?: string[];
  /** Uncontrolled начальные ключи в правой панели */
  defaultTargetKeys?: string[];
  /** Callback при перемещении между панелями */
  onChange?: (targetKeys: string[], direction: TransferDirection, movedKeys: string[]) => void;
  /** Заголовки [левая, правая] панели */
  titles?: [string, string];
  /** Показывать поле поиска в каждой панели */
  searchable?: boolean;
  /** Высота каждой панели */
  height?: number | string;
  /** Блокирует весь контрол */
  disabled?: boolean;
  className?: string;
};

/** Двухпанельный перенос элементов между "доступно" и "выбрано" — со списком, поиском и select-all. */
export function Transfer({
  dataSource,
  targetKeys,
  defaultTargetKeys,
  onChange,
  titles = ["Доступно", "Выбрано"],
  searchable = true,
  height = 320,
  disabled = false,
  className,
}: TransferProps) {
  const {
    sourceItems,
    targetItems,
    leftChecked,
    rightChecked,
    toggleChecked,
    toggleAllChecked,
    moveToRight,
    moveToLeft,
  } = useTransfer({ dataSource, targetKeys, defaultTargetKeys, onChange });

  return (
    <HStack align="stretch" gap={3} className={className}>
      <TransferPanel
        title={titles[0]}
        items={sourceItems}
        checked={leftChecked}
        onToggle={(key) => toggleChecked(key, "left")}
        onToggleAll={(keys) => toggleAllChecked("left", keys)}
        searchable={searchable}
        disabled={disabled}
        height={height}
        className="flex-1"
      />

      <Flex direction="col" justify="center" gap={2}>
        <Button
          variant="outline"
          size="icon"
          disabled={disabled || leftChecked.length === 0}
          onClick={moveToRight}
          aria-label={`Перенести в «${titles[1]}»`}
        >
          <ChevronRight size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          disabled={disabled || rightChecked.length === 0}
          onClick={moveToLeft}
          aria-label={`Перенести в «${titles[0]}»`}
        >
          <ChevronLeft size={16} />
        </Button>
      </Flex>

      <TransferPanel
        title={titles[1]}
        items={targetItems}
        checked={rightChecked}
        onToggle={(key) => toggleChecked(key, "right")}
        onToggleAll={(keys) => toggleAllChecked("right", keys)}
        searchable={searchable}
        disabled={disabled}
        height={height}
        className="flex-1"
      />
    </HStack>
  );
}
