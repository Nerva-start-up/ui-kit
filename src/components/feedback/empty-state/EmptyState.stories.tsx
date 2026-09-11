import type { Story } from "@ladle/react";
import { BookOpen, FileSearch, Inbox, Users } from "lucide-react";
import { Button } from "../../actions/button/Button";
import { EmptyState } from "./EmptyState";

export default { title: "Components / Feedback / EmptyState" };

export const Default: Story = () => (
  <EmptyState
    title="Нет результатов"
    description="По вашему запросу ничего не найдено. Попробуйте изменить фильтры."
    icon={FileSearch}
  />
);

export const WithAction: Story = () => (
  <EmptyState
    title="Заданий пока нет"
    description="Преподаватель ещё не добавил задания для вашей группы."
    icon={BookOpen}
    action={<Button variant="outline">Обновить</Button>}
  />
);

export const Variants: Story = () => (
  <div className="grid grid-cols-2 gap-4">
    <EmptyState
      title="Нет студентов"
      description="В группе ещё нет участников."
      icon={Users}
      action={<Button size="sm">Пригласить</Button>}
    />
    <EmptyState title="Входящих нет" description="Все задания проверены." icon={Inbox} />
  </div>
);

export const Minimal: Story = () => <EmptyState title="Пусто" />;
