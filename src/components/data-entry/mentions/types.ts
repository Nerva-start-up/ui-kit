export type MentionOption = {
  id: string;
  /** Отображаемое имя */
  label: string;
  /** Текст, вставляемый после символа-триггера */
  value: string;
  avatar?: string;
};

export type MentionQuery = { start: number; query: string };
