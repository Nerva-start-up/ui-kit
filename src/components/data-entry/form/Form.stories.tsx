import type { Story } from "@ladle/react";
import { useState } from "react";
import { Button } from "../../actions/button/Button";
import { Badge } from "../../data-display/badge/Badge";
import { Separator } from "../../layout/separator/Separator";
import { Text } from "../../typography/Text";
import { Checkbox } from "../checkbox/Checkbox";
import { Input } from "../input/Input";
import { PasswordInput } from "../input/PasswordInput";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormSection,
} from "./Form";

export default { title: "Components / Data Entry / Form" };

/* ── Login ──────────────────────────────────────────────── */
export const Login: Story = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (vals: typeof values) => {
    const e: Record<string, string> = {};
    if (!vals.email) e.email = "Email обязателен";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) e.email = "Введите корректный email";
    if (!vals.password) e.password = "Пароль обязателен";
    else if (vals.password.length < 8) e.password = "Минимум 8 символов";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSubmitted(true);
  };

  if (submitted)
    return (
      <div className="p-6">
        <Badge variant="success">Вход выполнен!</Badge>
      </div>
    );

  return (
    <div className="p-6 max-w-sm">
      <Form onSubmit={handleSubmit}>
        <FormField name="email" error={errors.email}>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder="student@ksi.uz"
              value={values.email}
              onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            />
          </FormControl>
          <FormMessage />
        </FormField>

        <FormField name="password" error={errors.password}>
          <FormLabel>Пароль</FormLabel>
          <FormControl>
            <PasswordInput
              placeholder="••••••••"
              value={values.password}
              onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
            />
          </FormControl>
          <FormMessage />
        </FormField>

        <Button type="submit" className="w-full">
          Войти
        </Button>
      </Form>
    </div>
  );
};

/* ── Registration ───────────────────────────────────────── */
export const Registration: Story = () => {
  const [values, setValues] = useState({ name: "", email: "", password: "", agree: false });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = <K extends keyof typeof values>(k: K, v: (typeof values)[K]) =>
    setValues((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!values.name.trim()) errs.name = "Укажите имя";
    if (!values.email) errs.email = "Email обязателен";
    if (!values.password || values.password.length < 8) errs.password = "Минимум 8 символов";
    if (!values.agree) errs.agree = "Необходимо принять условия";
    setErrors(errs);
  };

  return (
    <div className="p-6 max-w-sm">
      <Form onSubmit={handleSubmit}>
        <FormField name="name" error={errors.name}>
          <FormLabel>Имя</FormLabel>
          <FormControl>
            <Input
              placeholder="Иван Иванов"
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </FormControl>
          <FormMessage />
        </FormField>

        <FormField name="email" error={errors.email}>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder="student@ksi.uz"
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </FormControl>
          <FormDescription>Используется для входа в аккаунт</FormDescription>
          <FormMessage />
        </FormField>

        <FormField name="password" error={errors.password}>
          <FormLabel>Пароль</FormLabel>
          <FormControl>
            <PasswordInput
              placeholder="••••••••"
              value={values.password}
              onChange={(e) => set("password", e.target.value)}
            />
          </FormControl>
          <FormDescription>Минимум 8 символов</FormDescription>
          <FormMessage />
        </FormField>

        <Separator />

        <FormField name="agree" error={errors.agree}>
          <FormControl>
            <Checkbox
              label="Принимаю правила платформы"
              description="Нажимая, вы соглашаетесь с политикой конфиденциальности"
              checked={values.agree}
              onChange={(v) => set("agree", v)}
            />
          </FormControl>
          <FormMessage />
        </FormField>

        <Button type="submit" className="w-full">
          Зарегистрироваться
        </Button>
      </Form>
    </div>
  );
};

/* ── Sections ───────────────────────────────────────────── */
export const WithSections: Story = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="p-6 max-w-sm">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <FormSection legend="Личные данные">
          <FormField name="first-name">
            <FormLabel>Имя</FormLabel>
            <FormControl>
              <Input placeholder="Иван" />
            </FormControl>
          </FormField>

          <FormField name="last-name">
            <FormLabel>Фамилия</FormLabel>
            <FormControl>
              <Input placeholder="Иванов" />
            </FormControl>
          </FormField>
        </FormSection>

        <FormSection legend="Учётная запись">
          <FormField name="email-sec">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="student@ksi.uz" />
            </FormControl>
          </FormField>

          <FormField name="group">
            <FormLabel>Группа</FormLabel>
            <FormControl>
              <Input placeholder="ИБ-21" />
            </FormControl>
            <FormDescription>Уточните у куратора</FormDescription>
          </FormField>
        </FormSection>

        <div className="flex gap-3">
          <Button type="button" variant="outline" className="flex-1">
            Отмена
          </Button>
          <Button type="submit" className="flex-1">
            {submitted ? "Сохранено ✓" : "Сохранить"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

/* ── RHF pattern (simulated) ─────────────────────────────── */
/*
 * With react-hook-form the pattern looks like this:
 *
 * const { register, handleSubmit, formState: { errors } } = useForm();
 *
 * <Form onSubmit={handleSubmit(onSubmit)}>
 *   <FormField name="email" error={errors.email?.message}>
 *     <FormLabel>Email</FormLabel>
 *     <FormControl>
 *       <Input {...register("email", { required: "Email обязателен" })} />
 *     </FormControl>
 *     <FormMessage />
 *   </FormField>
 *
 *   // Controlled components (Checkbox, Select, etc.) use Controller:
 *   <Controller
 *     name="agree"
 *     control={control}
 *     rules={{ required: "Обязательно" }}
 *     render={({ field, fieldState }) => (
 *       <FormField name="agree" error={fieldState.error?.message}>
 *         <FormControl>
 *           <Checkbox
 *             label="Принимаю условия"
 *             checked={field.value}
 *             onChange={field.onChange}
 *           />
 *         </FormControl>
 *         <FormMessage />
 *       </FormField>
 *     )}
 *   />
 * </Form>
 */
export const RhfPattern: Story = () => {
  // Simulates what react-hook-form would give you
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState({ email: "", agree: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!values.email) errs.email = "Email обязателен";
    if (!values.agree) errs.agree = "Обязательно для продолжения";
    setErrors(errs);
  };

  return (
    <div className="p-6 max-w-sm">
      <Text variant="muted" className="text-[12px] mb-4">
        Демонстрирует паттерн, идентичный react-hook-form / zod
      </Text>
      <Form onSubmit={handleSubmit}>
        <FormField name="rhf-email" error={errors.email}>
          <FormLabel>Email</FormLabel>
          <FormControl>
            {/* Эквивалент: {...register("email")} */}
            <Input
              type="email"
              placeholder="student@ksi.uz"
              value={values.email}
              onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            />
          </FormControl>
          <FormMessage />
        </FormField>

        <FormField name="rhf-agree" error={errors.agree}>
          <FormControl>
            {/* Эквивалент: <Controller render={...} /> */}
            <Checkbox
              label="Принимаю условия"
              checked={values.agree}
              onChange={(v) => setValues((prev) => ({ ...prev, agree: v }))}
            />
          </FormControl>
          <FormMessage />
        </FormField>

        <Button type="submit" className="w-full">
          Отправить
        </Button>
      </Form>
    </div>
  );
};

/* ── Custom control via useFormField ─────────────────────── */
export const CustomControl: Story = () => {
  const [rating, setRating] = useState(0);
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(rating === 0 ? "Поставьте оценку" : undefined);
  };

  return (
    <div className="p-6 max-w-sm">
      <Form onSubmit={handleSubmit}>
        <FormField name="rating" error={error}>
          <FormLabel>Оцените курс</FormLabel>
          <FormControl>
            <StarRating value={rating} onChange={setRating} />
          </FormControl>
          <FormDescription>Ваша оценка поможет улучшить курс</FormDescription>
          <FormMessage />
        </FormField>
        <Button type="submit">Отправить</Button>
      </Form>
    </div>
  );
};

function StarRating({
  value,
  onChange,
  id,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}: {
  value: number;
  onChange: (v: number) => void;
  id?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}) {
  return (
    <div
      id={id}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedBy}
      className="flex gap-1"
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`text-2xl transition-colors ${
            star <= value ? "text-[var(--primary)]" : "text-[var(--border)]"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
