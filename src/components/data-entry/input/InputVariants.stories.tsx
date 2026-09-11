import type { Story } from "@ladle/react";
import { useState } from "react";
import { DateInput } from "./DateInput";
import { EmailInput } from "./EmailInput";
import { OtpInput } from "./OtpInput";
import { PasswordInput } from "./PasswordInput";
import { PhoneInput } from "./PhoneInput";
import { TimeInput } from "./TimeInput";

export default { title: "Components / Data Entry / Input Variants" };

export const Password: Story = () => (
  <div className="flex flex-col gap-4 max-w-sm">
    <PasswordInput label="Пароль" placeholder="Введите пароль" />
    <PasswordInput label="С ошибкой" defaultValue="abc" error="Пароль слишком короткий" />
    <PasswordInput label="Disabled" defaultValue="секретпароль" disabled />
  </div>
);

export const Email: Story = () => (
  <div className="flex flex-col gap-4 max-w-sm">
    <EmailInput label="Email" />
    <EmailInput label="С ошибкой" defaultValue="не-email" error="Введите корректный email" />
  </div>
);

export const Phone: Story = () => (
  <div className="flex flex-col gap-4 max-w-sm">
    <PhoneInput label="Телефон" placeholder="90 123 45 67" />
    <PhoneInput label="С ошибкой" defaultValue="abc" error="Введите корректный номер" />
    <PhoneInput label="Другой prefix" prefix="+7" placeholder="999 123 45 67" />
  </div>
);

export const OTP: Story = () => {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col gap-6 max-w-sm">
      <OtpInput label="Код подтверждения" value={value} onChange={setValue} />
      <OtpInput label="4 символа" value="" onChange={() => {}} length={4} />
      <OtpInput
        label="С ошибкой"
        value="12"
        onChange={() => {}}
        error="Неверный код. Попробуйте ещё раз."
      />
    </div>
  );
};

export const Time: Story = () => {
  const [value, setValue] = useState("14:30");
  return (
    <div className="flex flex-col gap-4 max-w-[220px]">
      <TimeInput label="Начало занятия" value={value} onChange={setValue} />
      <TimeInput label="Шаг 15 минут" defaultValue="09:00" minuteStep={15} />
      <TimeInput label="С ошибкой" defaultValue="25:99" error="Некорректное время" />
      <TimeInput label="Disabled" defaultValue="12:00" disabled />
    </div>
  );
};

export const DatePicker: Story = () => {
  const [date, setDate] = useState<Date | null>(new Date(2026, 5, 26));
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 14);

  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <DateInput label="Дата рождения" value={date} onChange={setDate} />
      <DateInput label="Дедлайн (ближайшие 14 дней)" minDate={today} maxDate={maxDate} />
      <DateInput label="С ошибкой" error="Выберите дату" />
      <DateInput label="Disabled" defaultValue={new Date(2026, 5, 26)} disabled />
    </div>
  );
};

export const OtpInteractive: Story<{ length: number }> = ({ length }) => {
  const [value, setValue] = useState("");
  return (
    <OtpInput
      label={`OTP (${length} символов)`}
      value={value}
      onChange={setValue}
      length={length}
    />
  );
};
OtpInteractive.args = { length: 6 };
OtpInteractive.argTypes = { length: { control: { type: "number", min: 4, max: 8, step: 1 } } };
