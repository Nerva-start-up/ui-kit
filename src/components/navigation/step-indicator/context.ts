import { createContext, useContext } from "react";

export type StepOrientation = "horizontal" | "vertical";
export type StepSize = "sm" | "md" | "lg";
export type StepStatus = "completed" | "active" | "upcoming" | "error";

export type StepIndicatorContextValue = {
  current: number;
  total: number;
  orientation: StepOrientation;
  size: StepSize;
};

export type StepContextValue = {
  index: number;
  status: StepStatus;
};

export const StepIndicatorContext = createContext<StepIndicatorContextValue>({
  current: 0,
  total: 0,
  orientation: "horizontal",
  size: "md",
});

export const StepContext = createContext<StepContextValue>({
  index: 0,
  status: "upcoming",
});

export const useStepIndicatorContext = () => useContext(StepIndicatorContext);
export const useStepContext = () => useContext(StepContext);
