import type { Story } from "@ladle/react";
import { Button } from "../../actions/button/Button";
import { Result } from "./Result";

export default { title: "Components / Feedback / Result" };

export const Success: Story = () => (
  <Result
    status="success"
    title="Задание отправлено"
    subtitle="Преподаватель проверит его в течение 3 рабочих дней."
    extra={<Button>К списку заданий</Button>}
  />
);

export const ErrorStatus: Story = () => (
  <Result
    status="error"
    title="Не удалось отправить задание"
    subtitle="Проверьте соединение с интернетом и попробуйте снова."
    extra={
      <>
        <Button variant="outline">Отмена</Button>
        <Button>Повторить</Button>
      </>
    }
  />
);

export const Forbidden: Story = () => (
  <Result
    status="403"
    subtitle="У вас нет доступа к этой группе. Обратитесь к куратору."
    extra={<Button variant="outline">На главную</Button>}
  />
);

export const NotFound: Story = () => (
  <Result
    status="404"
    subtitle="Курс мог быть удалён или перемещён."
    extra={<Button variant="outline">К списку курсов</Button>}
  />
);

export const ServerError: Story = () => (
  <Result status="500" subtitle="Мы уже разбираемся, попробуйте обновить страницу позже." />
);

export const AllStatuses: Story = () => (
  <div className="grid grid-cols-2 gap-6">
    <Result status="success" />
    <Result status="error" />
    <Result status="warning" />
    <Result status="info" />
    <Result status="403" />
    <Result status="404" />
  </div>
);

export const Minimal: Story = () => <Result status="success" title="Готово" />;
