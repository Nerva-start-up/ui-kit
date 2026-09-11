import type { Story } from "@ladle/react";
import { Filter, Info, Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "../../actions/button/Button";
import { Badge } from "../../data-display/badge/Badge";
import { Separator } from "../../layout/separator/Separator";
import { Text } from "../../typography/Text";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./Collapsible";

export default { title: "Components / Disclosure / Collapsible" };

/* ── Default ────────────────────────────────────────────── */
export const Default: Story = () => (
  <div className="p-6 max-w-sm">
    <Collapsible defaultOpen>
      <CollapsibleTrigger
        showChevron
        className="px-4 py-3 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--text-muted)]"
      >
        <Text as="span" size="sm" weight="medium">
          Дополнительные сведения
        </Text>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3">
        <div className="flex flex-col gap-2">
          <Text variant="muted" className="text-[13px]">
            Здесь можно разместить любое содержимое: текст, формы, списки.
          </Text>
          <Text variant="muted" className="text-[13px]">
            Высота анимируется через CSS grid-rows — без JS-измерений.
          </Text>
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
);

/* ── Controlled ─────────────────────────────────────────── */
export const Controlled: Story = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-6 max-w-sm">
      <div className="flex items-center gap-3">
        <Button size="sm" variant="outline" onClick={() => setOpen((v) => !v)}>
          {open ? "Скрыть" : "Показать"} фильтры
        </Button>
        <Badge variant={open ? "success" : "default"}>{open ? "открыт" : "закрыт"}</Badge>
      </div>

      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger
          showChevron
          className="px-4 py-3 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--border)]"
        >
          <div className="flex items-center gap-2 text-[var(--text)]">
            <Filter size={14} />
            <Text as="span" size="sm" weight="medium">
              Фильтры поиска
            </Text>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <div className="flex flex-col gap-2 py-2">
            <Text variant="muted" className="text-[13px]">
              · Группа: ИБ-21
            </Text>
            <Text variant="muted" className="text-[13px]">
              · Период: последние 30 дней
            </Text>
            <Text variant="muted" className="text-[13px]">
              · Статус: активные
            </Text>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

/* ── Card style ─────────────────────────────────────────── */
export const CardStyle: Story = () => (
  <div className="p-6 max-w-sm">
    <div className="rounded-[var(--radius-md)] border border-[var(--border)] overflow-hidden">
      <Collapsible defaultOpen>
        <CollapsibleTrigger
          showChevron
          className="px-4 py-3 bg-[var(--surface-2)] hover:bg-[var(--surface)] w-full"
        >
          <div className="flex items-center gap-2">
            <Settings size={14} className="text-[var(--text-muted)]" />
            <Text as="span" size="sm" weight="medium">
              Настройки
            </Text>
          </div>
        </CollapsibleTrigger>
        <Separator />
        <CollapsibleContent>
          <div className="px-4 py-3 flex flex-col gap-3">
            <Text variant="muted" className="text-[13px]">
              Уведомления
            </Text>
            <Text variant="muted" className="text-[13px]">
              Конфиденциальность
            </Text>
            <Text variant="muted" className="text-[13px]">
              Безопасность
            </Text>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  </div>
);

/* ── Multiple ────────────────────────────────────────────── */
export const Multiple: Story = () => {
  const items = [
    {
      id: "modules",
      label: "Модули курса",
      badge: "5",
      content: ["Введение в ИБ", "Криптография", "Сетевая безопасность", "Веб-безопасность", "CTF"],
    },
    {
      id: "tasks",
      label: "Задания",
      badge: "3",
      content: ["Лабораторная №1", "Практическая работа", "Финальный проект"],
    },
    {
      id: "resources",
      label: "Материалы",
      badge: "12",
      content: ["Слайды лекций", "Видеозаписи", "Дополнительная литература"],
    },
  ];

  return (
    <div className="p-6 max-w-sm flex flex-col gap-2">
      {items.map((item) => (
        <div key={item.id} className="rounded-[var(--radius-sm)] border border-[var(--border)]">
          <Collapsible>
            <CollapsibleTrigger
              showChevron
              className="px-4 py-3 hover:bg-[var(--surface-2)] rounded-[var(--radius-sm)]"
            >
              <div className="flex items-center gap-2">
                <Text as="span" size="sm" weight="medium">
                  {item.label}
                </Text>
                <Badge variant="orange">{item.badge}</Badge>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-3">
              <ul className="flex flex-col gap-1 pt-1">
                {item.content.map((c) => (
                  <li key={c} className="py-0.5">
                    <Text variant="muted" className="text-[13px]">
                      {c}
                    </Text>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}
    </div>
  );
};

/* ── Inline (no border) ─────────────────────────────────── */
export const Inline: Story = () => (
  <div className="p-6 max-w-sm flex flex-col gap-3">
    <div className="flex items-start gap-2">
      <Info size={14} className="mt-[2px] shrink-0 text-[var(--primary)]" />
      <Text variant="muted" className="text-[13px]">
        Норма — вычисляется на основе посещаемости и заданий.
      </Text>
    </div>

    <Collapsible>
      <CollapsibleTrigger className="text-[13px] text-[var(--primary)] hover:underline w-auto self-start">
        Как рассчитывается рейтинг?
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2">
        <div className="flex flex-col gap-1 pl-1 border-l-2 border-[var(--border)]">
          <Text variant="muted" className="text-[13px]">
            40% — академическая успеваемость
          </Text>
          <Text variant="muted" className="text-[13px]">
            25% — активность на платформе
          </Text>
          <Text variant="muted" className="text-[13px]">
            20% — загруженные материалы
          </Text>
          <Text variant="muted" className="text-[13px]">
            15% — взаимодействие с Норой
          </Text>
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
);

/* ── Disabled ────────────────────────────────────────────── */
export const Disabled: Story = () => (
  <div className="p-6 max-w-sm">
    <Collapsible disabled defaultOpen>
      <CollapsibleTrigger
        showChevron
        className="px-4 py-3 rounded-[var(--radius-sm)] bg-[var(--surface-2)] border border-[var(--border)]"
      >
        <Text as="span" size="sm" weight="medium">
          Заблокировано
        </Text>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3">
        <Text variant="muted" className="text-[13px]">
          Контент виден, но триггер нельзя нажать.
        </Text>
      </CollapsibleContent>
    </Collapsible>
  </div>
);
