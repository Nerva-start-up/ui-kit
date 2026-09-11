import React from "react";
import { cn } from "../../../lib/cn";

/* ── Field context ───────────────────────────────────────── */
type FormFieldContextValue = {
  id: string;
  name: string;
  error?: string;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({
  id: "",
  name: "",
});

/**
 * Access the nearest FormField's id, name, and error from a custom control.
 * Useful when building components that need to wire aria attributes manually.
 */
export function useFormField(): FormFieldContextValue {
  return React.useContext(FormFieldContext);
}

/* ── Form ─────────────────────────────────────────────── */
export type FormProps = React.FormHTMLAttributes<HTMLFormElement>;

/** `<form noValidate>` с flex-col gap-5 */
export function Form({ className, ...props }: FormProps) {
  return <form noValidate className={cn("flex flex-col gap-5", className)} {...props} />;
}

/* ── FormSection ──────────────────────────────────────── */
export type FormSectionProps = {
  /** Подпись секции */
  legend?: string;
  className?: string;
  children: React.ReactNode;
};

/** `<fieldset>` с опциональной легендой */
export function FormSection({ legend, className, children }: FormSectionProps) {
  return (
    <fieldset className={cn("flex flex-col gap-5 border-none p-0 m-0 min-w-0", className)}>
      {legend && (
        <legend className="text-[12px] font-semibold uppercase tracking-wide text-[var(--text-muted)] pb-1">
          {legend}
        </legend>
      )}
      {children}
    </fieldset>
  );
}

/* ── FormField ────────────────────────────────────────── */
export type FormFieldProps = {
  /** Имя поля (обязательно), используется для генерации id */
  name: string;
  /** Текст ошибки; пробрасывается в FormMessage и FormControl */
  error?: string;
  className?: string;
  children: React.ReactNode;
};

/** Провайдер контекста поля: name, error. Устанавливает id = field-{name} */
export function FormField({ name, error, className, children }: FormFieldProps) {
  const id = `field-${name}`;

  return (
    <FormFieldContext.Provider value={{ id, name, error }}>
      <div className={cn("flex flex-col gap-[6px]", className)}>{children}</div>
    </FormFieldContext.Provider>
  );
}

/* ── FormLabel ────────────────────────────────────────── */
export type FormLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

/** `<label htmlFor={id}>` из контекста; краснеет при ошибке */
export function FormLabel({ className, children, ...props }: FormLabelProps) {
  const { id, error } = useFormField();

  return (
    <label
      htmlFor={id}
      className={cn(
        "text-[13px] font-medium select-none",
        error ? "text-[var(--error)]" : "text-[var(--text-sub)]",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}

/* ── FormControl ──────────────────────────────────────── */
export type FormControlProps = {
  /**
   * The form control to enhance. Must be a single React element.
   * FormControl injects: `id`, `aria-invalid`, `aria-describedby`.
   * The child must forward these to its underlying <input> (all KSI kit
   * components do this automatically).
   */
  children: React.ReactElement;
};

/** Оборачивает единственный контрол и инжектит id, aria-invalid, aria-describedby */
export function FormControl({ children }: FormControlProps) {
  const { id, error } = useFormField();

  return React.cloneElement(children, {
    id,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": `${id}-description ${id}-message`,
  } as React.HTMLAttributes<HTMLElement>);
}

/* ── FormDescription ──────────────────────────────────── */
export type FormDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

/** Статичная подсказка (id = field-{name}-description) */
export function FormDescription({ className, ...props }: FormDescriptionProps) {
  const { id } = useFormField();

  return (
    <p
      id={`${id}-description`}
      className={cn("text-[12px] text-[var(--text-muted)] leading-snug", className)}
      {...props}
    />
  );
}

/* ── FormMessage ──────────────────────────────────────── */
export type FormMessageProps = React.HTMLAttributes<HTMLParagraphElement>;

/** Сообщение об ошибке из контекста (id = field-{name}-message); скрыт когда нет ошибки */
export function FormMessage({ className, children, ...props }: FormMessageProps) {
  const { id, error } = useFormField();
  const body = error ?? children;
  if (!body) return null;

  return (
    <p
      id={`${id}-message`}
      role="alert"
      aria-live="polite"
      className={cn(
        "text-[12px] leading-snug",
        error ? "text-[var(--error)]" : "text-[var(--text-muted)]",
        className
      )}
      {...props}
    >
      {body}
    </p>
  );
}
