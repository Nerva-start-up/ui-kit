import { Button } from "@components/actions/button/Button";
import { Segmented } from "@components/data-entry/segmented/Segmented";
import { Select } from "@components/data-entry/select/Select";
import { Separator } from "@components/layout/separator/Separator";
import { Text } from "@components/typography/Text";
import type { Story } from "@ladle/react";
import { useState } from "react";
import { Drawer } from "./Drawer";
import { DrawerBody } from "./DrawerBody";
import { DrawerFooter } from "./DrawerFooter";
import { DrawerHandle } from "./DrawerHandle";
import { DrawerHeader } from "./DrawerHeader";
import { DrawerPanel } from "./DrawerPanel";
import { DrawerTitle } from "./DrawerTitle";

export default { title: "Components / Overlay / Drawer" };

/* ── Bottom sheet — action list ─────────────────────────── */
export const Bottom: Story = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Bottom sheet</Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <DrawerPanel side="bottom">
          <DrawerHandle />
          <DrawerHeader>
            <DrawerTitle>Выберите действие</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <div className="flex flex-col gap-1">
              {["Редактировать", "Поделиться", "Скопировать ссылку", "Пожаловаться"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-left px-4 py-3 rounded-[var(--radius-md)] text-sm text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </DrawerBody>
        </DrawerPanel>
      </Drawer>
    </>
  );
};

/* ── Bottom sheet — confirm dialog ──────────────────────── */
export const BottomConfirm: Story = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Подтверждение
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <DrawerPanel side="bottom" maxHeight="50vh">
          <DrawerHandle />
          <DrawerBody>
            <Text size="sm" weight="semibold" className="mb-2">
              Подтвердить отправку?
            </Text>
            <Text size="sm" variant="muted" className="leading-relaxed">
              Задание будет отправлено на проверку. Редактировать после отправки нельзя.
            </Text>
          </DrawerBody>
          <DrawerFooter>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => setOpen(false)}>
                Отправить
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                Отмена
              </Button>
            </div>
          </DrawerFooter>
        </DrawerPanel>
      </Drawer>
    </>
  );
};

/* ── Bottom sheet — tall content ────────────────────────── */
export const BottomTall: Story = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Детали студента</Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <DrawerPanel side="bottom" maxHeight="70vh">
          <DrawerHandle />
          <DrawerHeader>
            <DrawerTitle>Алишер Навоий</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <div className="flex flex-col gap-4">
              <Separator />
              {[
                ["Группа", "ИБ-101"],
                ["Email", "alisher@ksi.uz"],
                ["KSI Score", "1 420"],
                ["Посещаемость", "94%"],
                ["Заданий сдано", "12 / 15"],
                ["Место в рейтинге", "#3"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between">
                  <Text as="span" size="sm" variant="muted">
                    {label}
                  </Text>
                  <Text as="span" size="sm" weight="medium">
                    {value}
                  </Text>
                </div>
              ))}
              <Separator />
            </div>
          </DrawerBody>
          <DrawerFooter>
            <Button className="w-full">Написать сообщение</Button>
          </DrawerFooter>
        </DrawerPanel>
      </Drawer>
    </>
  );
};

/* ── Right side ──────────────────────────────────────────── */
export const Right: Story = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Правый drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <DrawerPanel side="right">
          <DrawerHeader>
            <DrawerTitle>Детали задания</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <div className="flex flex-col gap-4">
              <div>
                <Text size="xs" variant="muted" className="mb-1">
                  Название
                </Text>
                <Text size="sm" weight="medium">
                  Лабораторная №3 — XSS-атаки
                </Text>
              </div>
              <Separator />
              <div>
                <Text size="xs" variant="muted" className="mb-1">
                  Дедлайн
                </Text>
                <Text size="sm">30 июня 2026</Text>
              </div>
              <div>
                <Text size="xs" variant="muted" className="mb-1">
                  Описание
                </Text>
                <Text size="sm" variant="muted" className="leading-relaxed">
                  Проанализируйте уязвимость и напишите отчёт с примером эксплойта и способом
                  защиты.
                </Text>
              </div>
            </div>
          </DrawerBody>
          <DrawerFooter>
            <Button className="w-full">Отправить решение</Button>
          </DrawerFooter>
        </DrawerPanel>
      </Drawer>
    </>
  );
};

/* ── Left side ───────────────────────────────────────────── */
export const Left: Story = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Левый drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <DrawerPanel side="left" width="260px">
          <DrawerHeader>
            <DrawerTitle>Меню</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <div className="flex flex-col gap-1">
              {["Дашборд", "Рейтинг", "Задания", "Материалы", "Нора AI", "Настройки"].map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    className="text-left px-3 py-2 rounded-[var(--radius-md)] text-sm text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)] transition-colors"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </DrawerBody>
        </DrawerPanel>
      </Drawer>
    </>
  );
};

const attendanceOptions = [
  { label: "Present", value: "present" },
  { label: "Late", value: "late" },
  { label: "Absent", value: "absent" },
];

/** Regression repro: switch several values, close, then interact with the page below. */
export const SegmentedCloseStress: Story = () => {
  const [open, setOpen] = useState(false);
  const [underlayClicks, setUnderlayClicks] = useState(0);
  const [values, setValues] = useState(() => Array.from({ length: 25 }, () => "present"));

  return (
    <div className="min-h-[140vh] space-y-4">
      <Button onClick={() => setOpen(true)}>Open attendance drawer</Button>
      <Button variant="outline" onClick={() => setUnderlayClicks((count) => count + 1)}>
        Underlay interaction target
      </Button>
      <output data-testid="underlay-click-count">{underlayClicks}</output>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <DrawerPanel side="right" width="460px">
          <DrawerHeader>
            <DrawerTitle>Attendance</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <div className="flex flex-col gap-3">
              {values.map((value, index) => (
                <Segmented
                  key={index}
                  aria-label={`Student ${index + 1}`}
                  value={value}
                  onChange={(nextValue) =>
                    setValues((previous) =>
                      previous.map((item, itemIndex) => (itemIndex === index ? nextValue : item))
                    )
                  }
                  options={attendanceOptions}
                />
              ))}
            </div>
          </DrawerBody>
          <DrawerFooter>
            <Button className="w-full" onClick={() => setOpen(false)}>
              Save and close
            </Button>
          </DrawerFooter>
        </DrawerPanel>
      </Drawer>
    </div>
  );
};

/**
 * Regression repro for bug #5: an app-level lock (e.g. a focus trap held by
 * another overlay) must only be released once the close animation is truly
 * done, not on a `setTimeout` guess. `onExitComplete` fires exactly once,
 * after both the backdrop and the panel finish exiting.
 */
export const ExitCompleteUnlock: Story = () => {
  const [open, setOpen] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="space-y-4">
      <Button
        onClick={() => {
          setOpen(true);
          setBlocked(true);
        }}
      >
        Open drawer with select
      </Button>
      <output data-testid="block-state">{blocked ? "blocked" : "unlocked"}</output>
      <Drawer open={open} onClose={() => setOpen(false)} onExitComplete={() => setBlocked(false)}>
        <DrawerPanel side="right">
          <DrawerHeader>
            <DrawerTitle>Attendance</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Select
              label="Status"
              options={attendanceOptions}
              value={value}
              onValueChange={setValue}
              placeholder="Select status..."
            />
          </DrawerBody>
          <DrawerFooter>
            <Button className="w-full" onClick={() => setOpen(false)}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerPanel>
      </Drawer>
    </div>
  );
};
