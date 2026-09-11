import type React from "react";

export type TreeNode = {
  key: string;
  label: string;
  icon?: React.ElementType;
  disabled?: boolean;
  children?: TreeNode[];
};
