import type { Story } from "@ladle/react";
import { Dropzone } from "./Dropzone";

export default { title: "Components / Data Entry / Dropzone" };

export const Default: Story = () => (
  <div className="max-w-md">
    <Dropzone onFiles={(f) => console.log(f)} />
  </div>
);

export const WithHint: Story = () => (
  <div className="max-w-md">
    <Dropzone
      onFiles={(f) => console.log(f)}
      accept=".pdf,.docx,.md"
      maxSizeMB={20}
      label="Загрузить учебный материал"
      hint="PDF, DOCX, MD — до 20 МБ"
    />
  </div>
);

export const Multiple: Story = () => (
  <div className="max-w-md">
    <Dropzone
      onFiles={(f) => console.log(f)}
      multiple
      label="Загрузить несколько файлов"
      hint="Выберите или перетащите сразу несколько"
    />
  </div>
);

export const Disabled: Story = () => (
  <div className="max-w-md">
    <Dropzone onFiles={() => {}} disabled label="Загрузка недоступна" hint="Дедлайн истёк" />
  </div>
);
