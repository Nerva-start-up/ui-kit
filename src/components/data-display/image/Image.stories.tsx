import type { Story } from "@ladle/react";
import { Image } from "./Image";

export default { title: "Components / Data Display / Image" };

const SRC = "https://picsum.photos/seed/ksi-ui/480/320";
const BROKEN_SRC = "https://picsum.photos/broken-url-404";

/* ── Default ────────────────────────────────────────────── */
export const Default: Story = () => (
  <Image src={SRC} alt="Случайное фото" width={320} height={200} />
);

/* ── Object-fit ─────────────────────────────────────────── */
export const ObjectFit: Story = () => (
  <div className="flex gap-4">
    <Image src={SRC} alt="cover" fit="cover" width={160} height={160} />
    <Image
      src={SRC}
      alt="contain"
      fit="contain"
      width={160}
      height={160}
      className="bg-[var(--surface-2)]"
    />
    <Image src={SRC} alt="none" fit="none" width={160} height={160} />
  </div>
);

/* ── Rounded ────────────────────────────────────────────── */
export const Rounded: Story = () => (
  <div className="flex items-center gap-4">
    <Image src={SRC} alt="none" rounded="none" width={100} height={100} />
    <Image src={SRC} alt="sm" rounded="sm" width={100} height={100} />
    <Image src={SRC} alt="md" rounded="md" width={100} height={100} />
    <Image src={SRC} alt="lg" rounded="lg" width={100} height={100} />
    <Image src={SRC} alt="full" rounded="full" width={100} height={100} />
  </div>
);

/* ── Error fallback ─────────────────────────────────────── */
export const ErrorFallback: Story = () => (
  <div className="flex gap-4">
    <Image src={BROKEN_SRC} alt="Битая ссылка" width={200} height={140} />
    <Image
      src={BROKEN_SRC}
      alt="Битая ссылка с кастомным fallback"
      width={200}
      height={140}
      fallback={
        <div className="flex h-full w-full items-center justify-center bg-[var(--surface-2)] text-xs text-[var(--text-muted)]">
          Не удалось загрузить
        </div>
      }
    />
  </div>
);

/* ── Preview (полноэкранный просмотр) ──────────────────── */
export const Preview: Story = () => (
  <div className="flex gap-4">
    <Image src={SRC} alt="Кликни, чтобы увеличить" width={220} height={150} preview />
    <Image
      src="https://picsum.photos/seed/ksi-ui-2/900/600"
      alt="Второе фото"
      width={220}
      height={150}
      preview
    />
  </div>
);

/* ── Gallery ────────────────────────────────────────────── */
export const Gallery: Story = () => (
  <div className="grid grid-cols-4 gap-3 max-w-2xl">
    {Array.from({ length: 8 }, (_, i) => (
      <Image
        key={i}
        src={`https://picsum.photos/seed/ksi-gallery-${i}/300/300`}
        alt={`Фото ${i + 1}`}
        width="100%"
        height={120}
        preview
      />
    ))}
  </div>
);
