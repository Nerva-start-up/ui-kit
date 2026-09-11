export type UploadFileStatus = "queued" | "uploading" | "success" | "error";

export type UploadFile = {
  id: string;
  file: File;
  status: UploadFileStatus;
  /** 0..100 */
  progress: number;
  error?: string;
};
