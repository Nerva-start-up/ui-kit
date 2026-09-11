import type { Story } from "@ladle/react";
import type { ReactNode } from "react";
import { Text } from "../typography/Text";
import { Box } from "./Box";
import { Center } from "./Center";
import { Container } from "./Container";
import { Flex } from "./Flex";
import { Grid } from "./Grid";
import { HStack } from "./HStack";
import { Spacer } from "./Spacer";
import { Stack } from "./Stack";

export default { title: "Components / Layout" };

const Cell = ({ children }: { children: ReactNode }) => (
  <div className="bg-[var(--surface-2)] border border-[var(--border)] rounded-[var(--radius-sm)] px-3 py-2 text-xs text-[var(--text-muted)]">
    {children}
  </div>
);

export const StackVertical: Story = () => (
  <div className="max-w-xs">
    <Stack gap={3}>
      <Cell>Элемент 1</Cell>
      <Cell>Элемент 2</Cell>
      <Cell>Элемент 3</Cell>
    </Stack>
  </div>
);

export const HorizontalStack: Story = () => (
  <HStack gap={3}>
    <Cell>Левый</Cell>
    <Cell>Центр</Cell>
    <Cell>Правый</Cell>
  </HStack>
);

export const FlexWithSpacer: Story = () => (
  <div className="max-w-md border border-[var(--border)] rounded-[var(--radius-md)] p-3">
    <Flex align="center">
      <Cell>Заголовок</Cell>
      <Spacer />
      <Cell>Действие</Cell>
    </Flex>
  </div>
);

export const GridLayout: Story = () => (
  <Grid cols={3} gap={3}>
    {Array.from({ length: 6 }, (_, i) => (
      <Cell key={i}>col {i + 1}</Cell>
    ))}
  </Grid>
);

export const CenterContent: Story = () => (
  <Center className="h-32 bg-[var(--surface-2)] rounded-[var(--radius-lg)]">
    <Cell>По центру</Cell>
  </Center>
);

export const FractionalGap: Story = () => (
  <Stack gap={4}>
    {[0.5, 1.5, 2.5, 7, "6px"].map((gap) => (
      <div key={gap}>
        <Text size="xs" variant="muted" className="mb-1">
          gap={JSON.stringify(gap)}
        </Text>
        <HStack gap={gap}>
          <Cell>A</Cell>
          <Cell>B</Cell>
          <Cell>C</Cell>
        </HStack>
      </div>
    ))}
  </Stack>
);

export const AsChild: Story = () => (
  <Stack gap={3}>
    <Text size="xs" variant="muted">
      `asChild` пробрасывает layout-стили в переданный элемент вместо рендера `&lt;div&gt;` — удобно
      для семантических тегов или роутер-компонентов
    </Text>
    <HStack
      asChild
      gap={3}
      className="border border-[var(--border)] rounded-[var(--radius-md)] p-3"
    >
      <nav aria-label="demo">
        <Cell>Главная</Cell>
        <Cell>Задания</Cell>
        <Cell>Рейтинг</Cell>
      </nav>
    </HStack>
  </Stack>
);

export const GridArbitraryCols: Story = () => (
  <Grid cols="200px 1fr 1fr" gap={3}>
    {["Сайдбар", "Контент А", "Контент Б"].map((label) => (
      <Cell key={label}>{label}</Cell>
    ))}
  </Grid>
);

export const ItemProps: Story = () => (
  <Stack gap={4}>
    <div>
      <Text size="xs" variant="muted" className="mb-1">
        self — своё выравнивание внутри родительского контейнера
      </Text>
      <Flex className="h-24 border border-[var(--border)] rounded-[var(--radius-md)] p-2">
        <Box self="start" className="bg-[var(--surface-2)] px-2 py-1 text-xs">
          start
        </Box>
        <Box self="center" className="bg-[var(--surface-2)] px-2 py-1 text-xs">
          center
        </Box>
        <Box self="end" className="bg-[var(--surface-2)] px-2 py-1 text-xs">
          end
        </Box>
      </Flex>
    </div>

    <div>
      <Text size="xs" variant="muted" className="mb-1">
        shrink={"{false}"} — запрещает сжатие в тесном flex-контейнере
      </Text>
      <HStack gap={2} className="w-48 border border-[var(--border)] rounded-[var(--radius-md)] p-2">
        <Box shrink={false} className="bg-[var(--surface-2)] px-2 py-1 text-xs">
          не сжимается
        </Box>
        <Cell>обычный элемент сжимается первым</Cell>
      </HStack>
    </div>

    <div>
      <Text size="xs" variant="muted" className="mb-1">
        basis — фиксированная базовая ширина
      </Text>
      <HStack gap={2} className="border border-[var(--border)] rounded-[var(--radius-md)] p-2">
        <Box basis={120} className="bg-[var(--surface-2)] px-2 py-1 text-xs">
          basis=120
        </Box>
        <Cell>остальное место</Cell>
      </HStack>
    </div>
  </Stack>
);

export const ContainerWidths: Story = () => (
  <Stack gap={4}>
    {(["sm", "md", "lg", "xl", "full"] as const).map((size) => (
      <Container
        key={size}
        size={size}
        className="bg-[var(--surface-2)] rounded-[var(--radius-sm)] px-3 py-2"
      >
        <Text size="xs" variant="muted">
          Container size="{size}"
        </Text>
      </Container>
    ))}
  </Stack>
);
