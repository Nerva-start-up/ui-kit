import { Center } from "@components/layout/Center";
import { Stack } from "@components/layout/Stack";
import { Text } from "@components/typography/Text";
import type { Story } from "@ladle/react";
import { useState } from "react";
import { BrandLoader } from "./BrandLoader";
import { BrandMark } from "./BrandMark";
import { BrandSplash } from "./BrandSplash";

export default { title: "Components / Feedback / Brand" };

export const Mark: Story = () => (
  <div className="flex items-center gap-8">
    <Stack gap={2} align="center">
      <BrandMark size={64} />
      <Text as="span" size="xs" variant="muted">
        статичный
      </Text>
    </Stack>
    <Stack gap={2} align="center">
      <BrandMark size={64} animated />
      <Text as="span" size="xs" variant="muted">
        animated
      </Text>
    </Stack>
  </div>
);

export const Loader: Story = () => (
  <div className="flex items-center gap-8">
    <Stack gap={2} align="center">
      <BrandLoader size="sm" />
      <Text as="span" size="xs" variant="muted">
        sm
      </Text>
    </Stack>
    <Stack gap={2} align="center">
      <BrandLoader size="md" />
      <Text as="span" size="xs" variant="muted">
        md
      </Text>
    </Stack>
    <Stack gap={2} align="center">
      <BrandLoader size="lg" />
      <Text as="span" size="xs" variant="muted">
        lg
      </Text>
    </Stack>
  </div>
);

export const LoaderWithLabel: Story = () => <BrandLoader size="md" label="Загрузка данных..." />;

export const Splash: Story = () => {
  const [open, setOpen] = useState(false);

  return (
    <Center className="min-h-[200px]">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-4 py-2 text-sm rounded-[var(--radius-md)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
      >
        Показать splash
      </button>

      <BrandSplash open={open} label="Загрузка KSI..." />

      {open && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="fixed bottom-6 right-6 z-[60] px-4 py-2 text-sm rounded-[var(--radius-md)] bg-[var(--primary)] text-white"
        >
          Закрыть
        </button>
      )}
    </Center>
  );
};
