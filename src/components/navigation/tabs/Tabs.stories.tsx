import type { Story } from "@ladle/react";
import { Text } from "../../typography/Text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

export default { title: "Components / Navigation / Tabs" };

export const LineVariant: Story = () => (
  <div className="max-w-md">
    <Tabs defaultValue="overview">
      <TabsList variant="line">
        <TabsTrigger value="overview" variant="line">
          Обзор
        </TabsTrigger>
        <TabsTrigger value="tasks" variant="line">
          Задания
        </TabsTrigger>
        <TabsTrigger value="materials" variant="line">
          Материалы
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Text size="sm" variant="muted" className="pt-4">
          Общая информация о курсе
        </Text>
      </TabsContent>
      <TabsContent value="tasks">
        <Text size="sm" variant="muted" className="pt-4">
          Список заданий
        </Text>
      </TabsContent>
      <TabsContent value="materials">
        <Text size="sm" variant="muted" className="pt-4">
          Учебные материалы
        </Text>
      </TabsContent>
    </Tabs>
  </div>
);

export const PillsVariant: Story = () => (
  <div className="max-w-md">
    <Tabs defaultValue="all">
      <TabsList variant="pills">
        <TabsTrigger value="all" variant="pills">
          Все
        </TabsTrigger>
        <TabsTrigger value="active" variant="pills">
          Активные
        </TabsTrigger>
        <TabsTrigger value="done" variant="pills">
          Завершены
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <Text size="sm" variant="muted" className="pt-4">
          Все записи
        </Text>
      </TabsContent>
      <TabsContent value="active">
        <Text size="sm" variant="muted" className="pt-4">
          Активные записи
        </Text>
      </TabsContent>
      <TabsContent value="done">
        <Text size="sm" variant="muted" className="pt-4">
          Завершённые записи
        </Text>
      </TabsContent>
    </Tabs>
  </div>
);

export const WithDisabled: Story = () => (
  <div className="max-w-md">
    <Tabs defaultValue="a">
      <TabsList variant="line">
        <TabsTrigger value="a" variant="line">
          Активная
        </TabsTrigger>
        <TabsTrigger value="b" variant="line" disabled>
          Недоступно
        </TabsTrigger>
        <TabsTrigger value="c" variant="line">
          Ещё одна
        </TabsTrigger>
      </TabsList>
      <TabsContent value="a">
        <Text size="sm" variant="muted" className="pt-4">
          Первая вкладка
        </Text>
      </TabsContent>
      <TabsContent value="c">
        <Text size="sm" variant="muted" className="pt-4">
          Третья вкладка
        </Text>
      </TabsContent>
    </Tabs>
  </div>
);
