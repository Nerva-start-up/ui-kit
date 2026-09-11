import type React from "react";

export type CommandItemType = "command" | "link";

export type CommandItem = {
  id: string;
  type: CommandItemType;
  label: string;
  description?: string;
  icon?: React.ElementType;
  /** Триггер команды — начинается с `/`, например `/toggleTheme` */
  trigger?: string;
  onSelect?: () => void;
  /** Псевдоним ссылки — начинается с `@`, например `@dashboard` */
  alias?: string;
  href?: string;
};
