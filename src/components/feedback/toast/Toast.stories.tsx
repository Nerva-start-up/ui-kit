import type { Story } from "@ladle/react";
import { Button } from "../../actions/button/Button";
import { Toaster } from "./Toaster";
import { toast } from "./toast";

export default { title: "Components / Feedback / Toast" };

export const AllTypes: Story = () => (
  <>
    <Toaster />
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => toast("Информационное сообщение")}>Default</Button>
      <Button variant="outline" onClick={() => toast.success("Задание успешно отправлено!")}>
        Success
      </Button>
      <Button variant="danger" onClick={() => toast.error("Ошибка загрузки файла")}>
        Error
      </Button>
      <Button variant="ghost" onClick={() => toast.info("Новое задание добавлено")}>
        Info
      </Button>
      <Button variant="ghost" onClick={() => toast.warning("Дедлайн через 2 часа!")}>
        Warning
      </Button>
    </div>
  </>
);

export const WithDescription: Story = () => (
  <>
    <Toaster />
    <Button
      onClick={() =>
        toast.success("Файл загружен", {
          description: "lecture_01_cryptography.pdf · 2.4 МБ",
        })
      }
    >
      С описанием
    </Button>
  </>
);

export const LoadingToast: Story = () => (
  <>
    <Toaster />
    <Button
      onClick={() => {
        const id = toast.loading("Проверка задания Норой...");
        setTimeout(() => toast.success("Задание одобрено!", { id }), 2500);
      }}
    >
      Loading → Success
    </Button>
  </>
);
