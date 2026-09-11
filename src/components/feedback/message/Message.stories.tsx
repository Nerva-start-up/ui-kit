import type { Story } from "@ladle/react";
import { Button } from "../../actions/button/Button";
import { Message } from "./Message";
import { message } from "./message";

export default { title: "Components / Feedback / Message" };

export const AllTypes: Story = () => (
  <>
    <Message />
    <div className="flex flex-wrap gap-3">
      <Button variant="outline" onClick={() => message.success("Задание сохранено")}>
        Success
      </Button>
      <Button variant="danger" onClick={() => message.error("Не удалось сохранить")}>
        Error
      </Button>
      <Button variant="ghost" onClick={() => message.warning("Дедлайн через 2 часа")}>
        Warning
      </Button>
      <Button variant="ghost" onClick={() => message.info("Доступно новое задание")}>
        Info
      </Button>
    </div>
  </>
);

export const LoadingThenSuccess: Story = () => (
  <>
    <Message />
    <Button
      onClick={() => {
        const id = message.loading("Проверка задания…");
        setTimeout(() => {
          message.dismiss(id);
          message.success("Задание проверено");
        }, 2000);
      }}
    >
      Загрузка → успех
    </Button>
  </>
);

export const Stacking: Story = () => (
  <>
    <Message max={5} />
    <Button
      onClick={() => {
        message.info(`Сообщение #${Math.floor(Math.random() * 1000)}`);
      }}
    >
      Добавить сообщение (max 5 видно)
    </Button>
  </>
);
