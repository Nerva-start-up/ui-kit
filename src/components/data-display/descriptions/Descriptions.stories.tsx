import type { Story } from "@ladle/react";
import { Button } from "../../actions/button/Button";
import { Badge } from "../../data-display/badge/Badge";
import { Descriptions } from "./Descriptions";
import { DescriptionsItem } from "./DescriptionsItem";

export default { title: "Components / Data Display / Descriptions" };

/* ── Default ────────────────────────────────────────────── */
export const Default: Story = () => (
  <Descriptions title="Профиль студента">
    <DescriptionsItem label="ФИО">Иванов Иван Иванович</DescriptionsItem>
    <DescriptionsItem label="Группа">ИБ-101</DescriptionsItem>
    <DescriptionsItem label="Email">ivanov@ksi-ed.uz</DescriptionsItem>
    <DescriptionsItem label="Статус">
      <Badge variant="success">Активен</Badge>
    </DescriptionsItem>
  </Descriptions>
);

/* ── Bordered ───────────────────────────────────────────── */
export const Bordered: Story = () => (
  <Descriptions title="Информация о курсе" bordered column={2}>
    <DescriptionsItem label="Название">Основы информационной безопасности</DescriptionsItem>
    <DescriptionsItem label="Преподаватель">Азимов А.А.</DescriptionsItem>
    <DescriptionsItem label="Кредиты">6</DescriptionsItem>
    <DescriptionsItem label="Семестр">Осень 2026</DescriptionsItem>
    <DescriptionsItem label="Описание" span={2}>
      Курс охватывает основы криптографии, сетевую безопасность и практики безопасной разработки.
    </DescriptionsItem>
  </Descriptions>
);

/* ── Columns ────────────────────────────────────────────── */
export const Columns: Story = () => (
  <div className="flex flex-col gap-8">
    <Descriptions title="1 колонка" column={1} bordered>
      <DescriptionsItem label="Логин">ivanov.i</DescriptionsItem>
      <DescriptionsItem label="Роль">Студент</DescriptionsItem>
    </Descriptions>
    <Descriptions title="3 колонки" column={3} bordered>
      <DescriptionsItem label="KSI Score">1 420</DescriptionsItem>
      <DescriptionsItem label="Место">#3</DescriptionsItem>
      <DescriptionsItem label="Посещаемость">94%</DescriptionsItem>
    </Descriptions>
  </div>
);

/* ── Vertical layout ────────────────────────────────────── */
export const VerticalLayout: Story = () => (
  <Descriptions title="Задание" layout="vertical" bordered column={3}>
    <DescriptionsItem label="Название">Лабораторная работа №3</DescriptionsItem>
    <DescriptionsItem label="Дедлайн">21.07.2026, 23:59</DescriptionsItem>
    <DescriptionsItem label="Статус">
      <Badge variant="warning">На проверке</Badge>
    </DescriptionsItem>
    <DescriptionsItem label="Условие" span={3}>
      Реализовать симметричный шифр AES-256 в режиме CBC и продемонстрировать
      шифрование/дешифрование тестового файла.
    </DescriptionsItem>
  </Descriptions>
);

/* ── Size ───────────────────────────────────────────────── */
export const Sizes: Story = () => (
  <div className="flex flex-col gap-8">
    <Descriptions title="Обычный (md)" size="md" bordered>
      <DescriptionsItem label="Поле A">Значение A</DescriptionsItem>
      <DescriptionsItem label="Поле B">Значение B</DescriptionsItem>
    </Descriptions>
    <Descriptions title="Компактный (sm)" size="sm" bordered>
      <DescriptionsItem label="Поле A">Значение A</DescriptionsItem>
      <DescriptionsItem label="Поле B">Значение B</DescriptionsItem>
    </Descriptions>
  </div>
);

/* ── With extra ─────────────────────────────────────────── */
export const WithExtra: Story = () => (
  <Descriptions
    title="Профиль студента"
    bordered
    extra={
      <Button size="sm" variant="outline">
        Редактировать
      </Button>
    }
  >
    <DescriptionsItem label="ФИО">Иванов Иван Иванович</DescriptionsItem>
    <DescriptionsItem label="Группа">ИБ-101</DescriptionsItem>
  </Descriptions>
);
