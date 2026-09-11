import { useHotkey } from "@hooks/useHotkey";
import { useResetIndexOnChange } from "@hooks/useResetIndexOnChange";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { CommandMenuContext } from "./context";
import { filterItems } from "./filter";
import type { CommandItem } from "./types";

export type CommandMenuProps = {
  /** все команды и ссылки */
  items: CommandItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

/** Root — portal, backdrop, фильтрация, клавиатурная навигация. */
export function CommandMenu({ items, open, onOpenChange, children }: CommandMenuProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => filterItems(items, search), [items, search]);
  const [activeIndex, setActiveIndex] = useResetIndexOnChange(filtered);

  const onClose = useCallback(() => {
    onOpenChange(false);
    setSearch("");
    setActiveIndex(0);
  }, [onOpenChange, setActiveIndex]);

  const execute = useCallback(
    (item: CommandItem) => {
      if (item.href) {
        window.location.href = item.href;
      } else {
        item.onSelect?.();
      }
      onClose();
    },
    [onClose]
  );

  // ⌘K / Ctrl+K to open, + ⌘/ / Ctrl+/ как запасной биндинг на случай конфликта с браузером.
  // ignoreInput: false — иначе хоткей молча не сработает (и не отменит браузерное действие),
  // если фокус в этот момент стоит в любом другом поле ввода на странице.
  useHotkey(["meta+k", "ctrl+k", "meta+/", "ctrl+/"], () => onOpenChange(true), {
    enabled: !open,
    ignoreInput: false,
  });

  // Навигация по списку — активна только когда меню открыто
  useHotkey("arrowdown", () => setActiveIndex((i) => (i + 1) % Math.max(filtered.length, 1)), {
    enabled: open,
    ignoreInput: false,
  });
  useHotkey(
    "arrowup",
    () =>
      setActiveIndex((i) => (i - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1)),
    { enabled: open, ignoreInput: false }
  );
  useHotkey(
    "enter",
    () => {
      const item = filtered[activeIndex];
      if (item) execute(item);
    },
    { enabled: open, ignoreInput: false }
  );
  useHotkey("escape", onClose, { enabled: open, ignoreInput: false });

  if (typeof document === "undefined") return null;

  return (
    <CommandMenuContext.Provider
      value={{ open, search, setSearch, filtered, activeIndex, setActiveIndex, onClose, execute }}
    >
      {createPortal(
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop */}
              <motion.div
                key="cmd-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={onClose}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              />
              {/* Content */}
              <motion.div
                key="cmd-panel"
                initial={{ opacity: 0, scale: 0.96, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -8 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="fixed left-1/2 top-[20vh] z-50 w-full max-w-[560px] -translate-x-1/2"
              >
                {children}
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </CommandMenuContext.Provider>
  );
}
