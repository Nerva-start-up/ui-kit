import type { Story } from "@ladle/react";
import { Blockquote as BlockquoteComponent } from "./Blockquote";
import { Code } from "./Code";
import { Heading } from "./Heading";
import { Label } from "./Label";
import { Link } from "./Link";
import { List } from "./List";
import { ListItem } from "./ListItem";
import { Text } from "./Text";

export default { title: "Components / Typography" };

export const Headings: Story = () => (
  <div className="flex flex-col gap-4">
    <Heading level={1}>H1 — Заголовок страницы</Heading>
    <Heading level={2}>H2 — Раздел курса</Heading>
    <Heading level={3}>H3 — Тема занятия</Heading>
    <Heading level={4}>H4 — Подтема</Heading>
    <Heading level={5}>H5 — Метка</Heading>
    <Heading level={6}>H6 — Мелкий заголовок</Heading>
  </div>
);

export const HeadingColors: Story = () => (
  <div className="flex flex-col gap-3">
    <Heading level={2} color="default">
      Default — KSI Platform
    </Heading>
    <Heading level={2} color="sub">
      Sub — Вспомогательный
    </Heading>
    <Heading level={2} color="muted">
      Muted — Приглушённый
    </Heading>
    <Heading level={2} color="primary">
      Primary — Акцент
    </Heading>
  </div>
);

export const TextVariants: Story = () => (
  <div className="flex flex-col gap-2 max-w-sm">
    <Text variant="default">Default — основной текст страницы</Text>
    <Text variant="sub">Sub — вспомогательный текст</Text>
    <Text variant="muted">Muted — приглушённый, подписи</Text>
    <Text variant="primary">Primary — акцентный</Text>
    <Text variant="success">Success — успешно сдано</Text>
    <Text variant="error">Error — ошибка проверки</Text>
    <Text variant="info">Info — информация</Text>
  </div>
);

export const TextSizes: Story = () => (
  <div className="flex flex-col gap-2">
    <Text size="lg">lg — крупный текст</Text>
    <Text size="md">md — стандарт</Text>
    <Text size="sm">sm — мелкий</Text>
    <Text size="xs">xs — подпись, метка</Text>
  </div>
);

export const TextWeights: Story = () => (
  <div className="flex flex-col gap-2">
    <Text weight="normal">Normal — обычный</Text>
    <Text weight="medium">Medium — средний</Text>
    <Text weight="semibold">Semibold — полужирный</Text>
    <Text weight="bold">Bold — жирный</Text>
  </div>
);

export const Mono: Story = () => (
  <div className="flex flex-col gap-2">
    <Text mono variant="muted" size="sm">
      const token = localStorage.getItem('ksi_token');
    </Text>
    <Text mono size="sm">
      Bearer eyJhbGciOiJIUzI1NiJ9...
    </Text>
  </div>
);

export const Truncate: Story = () => (
  <div className="max-w-[200px]">
    <Heading level={3} truncate>
      Очень длинный заголовок который не влезает
    </Heading>
    <Text size="sm" variant="muted" truncate>
      Очень длинный вспомогательный текст для демонстрации
    </Text>
  </div>
);

export const Links: Story = () => (
  <div className="flex flex-col gap-2 items-start">
    <Link href="#">Default — обычная ссылка</Link>
    <Link href="#" variant="primary">
      Primary — акцентная ссылка
    </Link>
    <Link href="#" variant="muted" underline="always">
      Muted — всегда подчёркнута
    </Link>
    <Link href="https://example.com" external>
      External — открывается в новой вкладке
    </Link>
  </div>
);

export const InlineCode: Story = () => (
  <Text>
    Токен передаётся через <Code>Authorization: Bearer &lt;token&gt;</Code> заголовок.
  </Text>
);

export const Blockquote: Story = () => (
  <BlockquoteComponent>
    Нора помогает студентам не бояться кибербезопасности, а разбираться в ней шаг за шагом.
  </BlockquoteComponent>
);

export const Labels: Story = () => (
  <div className="flex flex-col gap-3 max-w-xs">
    <div className="flex flex-col gap-1">
      <Label htmlFor="email">Email</Label>
      <input id="email" className="border border-[var(--border)] rounded px-2 py-1" />
    </div>
    <div className="flex flex-col gap-1">
      <Label htmlFor="password" required>
        Пароль
      </Label>
      <input id="password" className="border border-[var(--border)] rounded px-2 py-1" />
    </div>
  </div>
);

export const Lists: Story = () => (
  <div className="flex flex-col gap-6">
    <List>
      <ListItem>Создать группу</ListItem>
      <ListItem>Добавить студентов</ListItem>
      <ListItem>Назначить курс</ListItem>
    </List>
    <List as="ol" marker="decimal">
      <ListItem>Регистрация</ListItem>
      <ListItem>Подтверждение почты</ListItem>
      <ListItem>Первый вход</ListItem>
    </List>
  </div>
);
