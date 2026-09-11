import { createContext, useContext } from "react";
import type { SearchItem } from "./types";

export type SearchContextValue = {
  open: boolean;
  search: string;
  setSearch: (s: string) => void;
  filtered: SearchItem[];
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  onClose: () => void;
  onSelect: (item: SearchItem) => void;
};

export const SearchContext = createContext<SearchContextValue | null>(null);

export function useSearchContext(): SearchContextValue {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("Search sub-components must be used inside <Search>");
  return ctx;
}
