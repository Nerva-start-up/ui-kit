import type { Story } from "@ladle/react";
import { Text } from "../../typography/Text";
import { Spinner } from "./Spinner";

export default { title: "Components / Feedback / Spinner" };

export const Sizes: Story = () => (
  <div className="flex items-center gap-6">
    <div className="flex flex-col items-center gap-2">
      <Spinner size="sm" className="text-[var(--primary)]" />
      <Text as="span" size="xs" variant="muted">
        sm
      </Text>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Spinner size="md" className="text-[var(--primary)]" />
      <Text as="span" size="xs" variant="muted">
        md
      </Text>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Spinner size="lg" className="text-[var(--primary)]" />
      <Text as="span" size="xs" variant="muted">
        lg
      </Text>
    </div>
  </div>
);

export const InContext: Story = () => (
  <div className="flex items-center gap-2">
    <Spinner size="sm" className="text-[var(--primary)]" />
    <Text as="span" size="sm" variant="muted">
      Загрузка данных...
    </Text>
  </div>
);
