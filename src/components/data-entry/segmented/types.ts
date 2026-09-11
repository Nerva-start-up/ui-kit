import type React from "react";

export type SegmentedOption = {
  label: React.ReactNode;
  value: string;
  icon?: React.ElementType;
  disabled?: boolean;
};
