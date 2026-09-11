import { Avatar } from "@components/data-display/avatar/Avatar";
import { Badge } from "@components/data-display/badge/Badge";
import { Text } from "@components/typography/Text";
import type { Story } from "@ladle/react";
import { useState } from "react";
import { Kanban } from "./Kanban";
import { KanbanCard } from "./KanbanCard";
import { KanbanColumn } from "./KanbanColumn";
import type { KanbanMoveEvent } from "./types";

export default { title: "Components / Data Display / Kanban" };

type Task = {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
  assignee: string;
};

type Column = { id: string; title: string; tasks: Task[] };

const priorityVariant = { low: "info", medium: "warning", high: "error" } as const;
const priorityLabel = { low: "Low", medium: "Medium", high: "High" } as const;

const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "1",
        title: "Настроить CI для нового модуля",
        priority: "medium",
        assignee: "Иван Петров",
      },
      {
        id: "2",
        title: "Написать тесты для Kanban",
        priority: "high",
        assignee: "Анна Смирнова",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      {
        id: "3",
        title: "Ревью PR по drag-and-drop",
        priority: "high",
        assignee: "Иван Петров",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [{ id: "4", title: "Добавить PdfViewer", priority: "low", assignee: "Анна Смирнова" }],
  },
];

/** Перенос задачи между колонками в локальном state сторис — так же будет выглядеть интеграция в реальном приложении */
function moveTask(columns: Column[], event: KanbanMoveEvent): Column[] {
  const fromColumn = columns.find((c) => c.id === event.fromColumnId);
  const task = fromColumn?.tasks.find((t) => t.id === event.cardId);
  if (!task) return columns;

  return columns.map((column) => {
    if (column.id === event.fromColumnId && column.id === event.toColumnId) {
      const tasks = column.tasks.filter((t) => t.id !== event.cardId);
      tasks.splice(event.toIndex, 0, task);
      return { ...column, tasks };
    }
    if (column.id === event.fromColumnId) {
      return { ...column, tasks: column.tasks.filter((t) => t.id !== event.cardId) };
    }
    if (column.id === event.toColumnId) {
      const tasks = [...column.tasks];
      tasks.splice(event.toIndex, 0, task);
      return { ...column, tasks };
    }
    return column;
  });
}

/* ── Default: доска задач, как в Jira ──────────────────── */
export const Default: Story = () => {
  const [columns, setColumns] = useState(initialColumns);

  return (
    <Kanban onCardMove={(event) => setColumns((prev) => moveTask(prev, event))}>
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          id={column.id}
          title={
            <div className="flex items-center justify-between">
              <span>{column.title}</span>
              <Badge>{column.tasks.length}</Badge>
            </div>
          }
        >
          {column.tasks.map((task) => (
            <KanbanCard key={task.id} id={task.id}>
              <div className="flex flex-col gap-2">
                <Text size="sm" weight="medium">
                  {task.title}
                </Text>
                <div className="flex items-center justify-between">
                  <Badge variant={priorityVariant[task.priority]}>
                    {priorityLabel[task.priority]}
                  </Badge>
                  <Avatar name={task.assignee} size="sm" />
                </div>
              </div>
            </KanbanCard>
          ))}
        </KanbanColumn>
      ))}
    </Kanban>
  );
};

/* ── Карточка с disabled — не перетаскивается ──────────── */
export const WithDisabledCard: Story = () => {
  const [columns, setColumns] = useState(initialColumns);

  return (
    <Kanban onCardMove={(event) => setColumns((prev) => moveTask(prev, event))}>
      {columns.map((column) => (
        <KanbanColumn key={column.id} id={column.id} title={column.title}>
          {column.tasks.map((task, i) => (
            <KanbanCard key={task.id} id={task.id} disabled={column.id === "todo" && i === 0}>
              <Text size="sm" weight="medium">
                {task.title}
                {column.id === "todo" && i === 0 && " (закреплена)"}
              </Text>
            </KanbanCard>
          ))}
        </KanbanColumn>
      ))}
    </Kanban>
  );
};
