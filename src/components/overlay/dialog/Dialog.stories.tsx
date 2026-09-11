import type { Story } from "@ladle/react";
import { useState } from "react";
import { Button } from "../../actions/button/Button";
import { Input } from "../../data-entry/input/Input";
import { Text } from "../../typography/Text";
import { AlertDialog } from "./AlertDialog";
import { Dialog } from "./Dialog";

export default { title: "Components / Overlay / Dialog" };

export const Basic: Story = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Открыть диалог</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Редактировать профиль"
        description="Измените ваши данные и сохраните."
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <Button onClick={() => setOpen(false)}>Сохранить</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input label="Имя" defaultValue="Алишер Навоий" />
          <Input label="Email" defaultValue="alisher@ksi.uz" type="email" />
        </div>
      </Dialog>
    </>
  );
};

export const WithoutFooter: Story = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Без футера</Button>
      <Dialog open={open} onOpenChange={setOpen} title="Информация">
        <Text size="sm" variant="muted">
          Это диалог без кнопок внизу. Закрывается крестиком или кликом за пределами.
        </Text>
      </Dialog>
    </>
  );
};

export const AlertConfirm: Story = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        Удалить запись
      </Button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Удалить запись?"
        description="Это действие необратимо. Запись будет удалена навсегда."
        confirmLabel="Удалить"
        destructive
        onConfirm={() => setOpen(false)}
      />
    </>
  );
};

export const AlertLoading: Story = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 2000);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>С состоянием загрузки</Button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Подтвердить отправку?"
        description="Задание будет отправлено на проверку преподавателю."
        confirmLabel="Отправить"
        loading={loading}
        onConfirm={handleConfirm}
      />
    </>
  );
};
