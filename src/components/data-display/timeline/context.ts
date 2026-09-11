import { createContext, useContext } from "react";

export type TimelineVariant = "default" | "success" | "error" | "warning" | "info" | "primary";

export type TimelineItemContextValue = { variant: TimelineVariant };

export const TimelineItemContext = createContext<TimelineItemContextValue>({ variant: "default" });

export const useTimelineItemContext = () => useContext(TimelineItemContext);
