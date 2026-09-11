import { Mail } from "lucide-react";
import { Input, type InputProps } from "./Input";

export type EmailInputProps = Omit<InputProps, "type" | "leftIcon">;

/** Поле email с иконкой конверта слева. `type="email"` проставлен автоматически. */
export const EmailInput = ({ placeholder = "user@example.com", ...props }: EmailInputProps) => (
  <Input {...props} type="email" placeholder={placeholder} leftIcon={<Mail size={15} />} />
);
EmailInput.displayName = "EmailInput";
