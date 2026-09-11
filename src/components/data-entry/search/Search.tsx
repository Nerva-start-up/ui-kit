import { useResetIndexOnChange } from "@hooks/useResetIndexOnChange";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { SearchContext } from "./context";
import { type SearchFilterFn, type SearchItem, defaultFilter } from "./types";

export type SearchProps = {
  items: SearchItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Кастомная функция фильтрации (default: label + description + meta + tags) */
  filterFn?: SearchFilterFn;
  /** Колбэк при выборе элемента. Если не задан — используется item.onSelect или item.href */
  onSelect?: (item: SearchItem) => void;
  children: React.ReactNode;
};

/** Root — portal, фильтрация, nav. */
export function Search({
  items,
  open,
  onOpenChange,
  filterFn = defaultFilter,
  onSelect: onSelectProp,
  children,
}: SearchProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => (search.trim() ? items.filter((i) => filterFn(i, search)) : items),
    [items, search, filterFn]
  );
  const [activeIndex, setActiveIndex] = useResetIndexOnChange(filtered);

  const onClose = useCallback(() => {
    onOpenChange(false);
    setSearch("");
    setActiveIndex(0);
  }, [onOpenChange, setActiveIndex]);

  const onSelect = useCallback(
    (item: SearchItem) => {
      if (onSelectProp) {
        onSelectProp(item);
      } else if (item.href) {
        window.location.href = item.href;
      } else {
        item.onSelect?.();
      }
      onClose();
    },
    [onSelectProp, onClose]
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      const len = Math.max(filtered.length, 1);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % len);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + len) % len);
      } else if (e.key === "Enter") {
        const item = filtered[activeIndex];
        if (item) onSelect(item);
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, filtered, activeIndex, onSelect, onClose, setActiveIndex]);

  if (typeof document === "undefined") return null;

  return (
    <SearchContext.Provider
      value={{ open, search, setSearch, filtered, activeIndex, setActiveIndex, onClose, onSelect }}
    >
      {createPortal(
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                key="search-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={onClose}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              />
              <motion.div
                key="search-panel"
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
    </SearchContext.Provider>
  );
}
