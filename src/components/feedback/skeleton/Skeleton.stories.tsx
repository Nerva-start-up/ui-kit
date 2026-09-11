import type { Story } from "@ladle/react";
import { Skeleton } from "./Skeleton";

export default { title: "Components / Feedback / Skeleton" };

export const Default: Story = () => (
  <div className="max-w-sm">
    <Skeleton height={16} />
  </div>
);

export const TextLines: Story = () => (
  <div className="flex flex-col gap-2 max-w-sm">
    <Skeleton height={16} />
    <Skeleton height={16} width="80%" />
    <Skeleton height={16} width="60%" />
  </div>
);

export const CardSkeleton: Story = () => (
  <div className="max-w-sm p-5 border border-[var(--border)] rounded-[var(--radius-lg)] bg-[var(--surface)]">
    <div className="flex items-center gap-3 mb-4">
      <Skeleton rounded="full" width={40} height={40} />
      <div className="flex-1 flex flex-col gap-2">
        <Skeleton height={14} width="60%" />
        <Skeleton height={12} width="40%" />
      </div>
    </div>
    <Skeleton height={12} className="mb-2" />
    <Skeleton height={12} width="90%" className="mb-2" />
    <Skeleton height={12} width="75%" />
  </div>
);

export const Shapes: Story = () => (
  <div className="flex items-center gap-4">
    <Skeleton rounded="sm" width={64} height={64} />
    <Skeleton rounded="md" width={64} height={64} />
    <Skeleton rounded="lg" width={64} height={64} />
    <Skeleton rounded="full" width={64} height={64} />
  </div>
);
