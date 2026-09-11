import { createContext, useContext } from "react";

export type DescriptionsLayout = "horizontal" | "vertical";
export type DescriptionsSize = "sm" | "md";

export type DescriptionsContextValue = {
  layout: DescriptionsLayout;
  bordered: boolean;
  size: DescriptionsSize;
};

export const DescriptionsContext = createContext<DescriptionsContextValue>({
  layout: "horizontal",
  bordered: false,
  size: "md",
});

export const useDescriptionsContext = () => useContext(DescriptionsContext);
