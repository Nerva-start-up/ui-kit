import { Moon, Sun } from "lucide-react";
import { Button } from "../actions/button";
import { useTheme } from "./ThemeProvider";

export type ThemeToggleProps = {
  /** Размер кнопки */
  size?: "sm" | "md";
  className?: string;
};

/** Готовая кнопка Sun/Moon для переключения темы */
export function ThemeToggle({ size = "sm", className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const iconSize = size === "sm" ? 16 : 18;

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
      className={className}
    >
      {theme === "dark" ? <Sun size={iconSize} /> : <Moon size={iconSize} />}
    </Button>
  );
}
