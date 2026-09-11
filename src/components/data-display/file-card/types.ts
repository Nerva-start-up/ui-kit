export type FileStatus = "approved" | "rejected" | "pending";

export type FileCardContextValue = {
  status: FileStatus;
  fileType: string;
};
