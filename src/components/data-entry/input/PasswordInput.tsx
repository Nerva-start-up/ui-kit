import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Input, type InputProps } from "./Input";

export type PasswordInputProps = Omit<InputProps, "type" | "rightIcon">;

/** Поле пароля с кнопкой показать/скрыть (Eye/EyeOff). */
export const PasswordInput = (props: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      {...props}
      type={visible ? "text" : "password"}
      rightIcon={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Скрыть пароль" : "Показать пароль"}
          className="hover:text-[var(--text)] transition-colors"
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      }
    />
  );
};
PasswordInput.displayName = "PasswordInput";
