import type { Story } from "@ladle/react";
import { useState } from "react";
import { AttachmentChip } from "./AttachmentChip";

export default { title: "Components / Data Display / AttachmentChip" };

/* ── Default ────────────────────────────────────────────── */
export const Default: Story = () => (
  <div className="flex flex-wrap gap-3 p-4">
    <AttachmentChip name="report.pdf" size={1_240_000} status="done" />
    <AttachmentChip
      name="screenshot.png"
      type="image/png"
      previewUrl="https://picsum.photos/seed/ksi/200/200"
      size={182_000}
      status="done"
    />
  </div>
);

/* ── Playground: removable ─────────────────────────────── */
export const Playground: Story = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div className="p-4">
      {visible ? (
        <AttachmentChip
          name="network-scan.pcap"
          size={412_000}
          status="done"
          onRemove={() => setVisible(false)}
        />
      ) : (
        <button type="button" className="text-sm underline" onClick={() => setVisible(true)}>
          Вернуть вложение
        </button>
      )}
    </div>
  );
};

/* ── States: idle / uploading / done / error ───────────── */
export const States: Story = () => (
  <div className="flex flex-wrap gap-3 p-4">
    <AttachmentChip name="draft.docx" status="idle" />
    <AttachmentChip name="large-video.mp4" status="uploading" progress={42} />
    <AttachmentChip name="large-video.mp4" status="uploading" />
    <AttachmentChip name="log-dump.txt" size={54_000} status="done" />
    <AttachmentChip name="malware-sample.exe" status="error" error="Тип файла запрещён" />
  </div>
);

/* ── Image preview vs default file icon ────────────────── */
export const ImagePreview: Story = () => (
  <div className="flex flex-wrap gap-3 p-4">
    <AttachmentChip
      name="diagram.jpg"
      type="image/jpeg"
      previewUrl="https://picsum.photos/seed/ksi2/200/200"
      size={98_000}
      status="done"
      onRemove={() => {}}
    />
    <AttachmentChip name="notes.md" type="text/markdown" size={4_200} status="done" />
    <AttachmentChip name="archive.zip" size={5_400_000} status="done" />
  </div>
);
