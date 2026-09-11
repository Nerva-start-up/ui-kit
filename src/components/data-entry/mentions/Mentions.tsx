import { cn } from "../../../lib/cn";
import { Avatar } from "../../data-display/avatar/Avatar";
import type { MentionOption } from "./types";
import { useMentions } from "./useMentions";

export type MentionsProps = {
  /** Список упоминаемых пользователей */
  options: MentionOption[];
  /** Controlled текст */
  value?: string;
  /** Uncontrolled начальный текст */
  defaultValue?: string;
  /** Callback изменения текста */
  onChange?: (value: string) => void;
  /** Callback при вставке упоминания */
  onMention?: (option: MentionOption) => void;
  /** Символ-триггер */
  trigger?: string;
  placeholder?: string;
  disabled?: boolean;
  /** Количество видимых строк */
  rows?: number;
  className?: string;
};

/** Textarea с автодополнением упоминаний (`@username`) — список подсказок под полем, фильтруется по вводу. */
export function Mentions({
  options,
  value,
  defaultValue,
  onChange,
  onMention,
  trigger = "@",
  placeholder,
  disabled = false,
  rows = 3,
  className,
}: MentionsProps) {
  const {
    textareaRef,
    text,
    query,
    suggestions,
    highlighted,
    handleChange,
    handleKeyDown,
    selectOption,
  } = useMentions({ options, value, defaultValue, onChange, onMention, trigger });

  return (
    <div className={cn("relative flex flex-col gap-1.5", className)}>
      <div
        className={cn(
          "flex rounded-[var(--radius-md)] border bg-[var(--surface-2)]",
          "transition-[border-color,box-shadow] duration-150",
          "border-[var(--border)] hover:border-[var(--text-muted)]",
          "focus-within:border-[var(--primary)] focus-within:shadow-[0_0_0_3px_rgba(249,115,22,0.15)]",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <textarea
          ref={textareaRef}
          value={text}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => handleChange(e.target.value, e.target.selectionStart)}
          onKeyDown={handleKeyDown}
          onClick={(e) => handleChange(text, e.currentTarget.selectionStart)}
          className={cn(
            "min-w-0 flex-1 resize-y bg-transparent outline-none",
            "px-3.5 py-3 text-[15px] leading-relaxed text-[var(--text)]",
            "placeholder:text-[var(--text-muted)] caret-[var(--primary)]",
            "disabled:cursor-not-allowed"
          )}
        />
      </div>

      {query && suggestions.length > 0 && (
        <div
          className={cn(
            "absolute left-0 top-full z-10 mt-1 max-h-56 w-64 overflow-y-auto",
            "rounded-[var(--radius-md)] border border-[var(--border)]",
            "bg-[var(--surface)] p-1 shadow-xl"
          )}
        >
          {suggestions.map((option, i) => (
            <button
              key={option.id}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                selectOption(option);
              }}
              className={cn(
                "flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-sm",
                i === highlighted
                  ? "bg-[var(--primary-dim)] text-[var(--primary)]"
                  : "text-[var(--text)] hover:bg-[var(--surface-2)]"
              )}
            >
              <Avatar name={option.label} src={option.avatar} size="sm" />
              <span className="truncate">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
