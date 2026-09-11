import { File, FileAudio, FileCode, FileImage, FileText, FileVideo } from "lucide-react";
import type { ElementType } from "react";

type IconConfig = { icon: ElementType; color: string; bg: string };

const EXT_MAP: Record<string, IconConfig> = {
  pdf: { icon: FileText, color: "#f87171", bg: "rgba(248,113,113,0.12)" },
  doc: { icon: FileText, color: "#60a5fa", bg: "rgba(96,165,250,0.12)" },
  docx: { icon: FileText, color: "#60a5fa", bg: "rgba(96,165,250,0.12)" },
  txt: { icon: FileText, color: "#b0bec5", bg: "rgba(176,190,197,0.10)" },
  md: { icon: FileCode, color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
  png: { icon: FileImage, color: "#4ade80", bg: "rgba(74,222,128,0.12)" },
  jpg: { icon: FileImage, color: "#4ade80", bg: "rgba(74,222,128,0.12)" },
  jpeg: { icon: FileImage, color: "#4ade80", bg: "rgba(74,222,128,0.12)" },
  gif: { icon: FileImage, color: "#4ade80", bg: "rgba(74,222,128,0.12)" },
  webp: { icon: FileImage, color: "#4ade80", bg: "rgba(74,222,128,0.12)" },
  mp4: { icon: FileVideo, color: "#f97316", bg: "rgba(249,115,22,0.12)" },
  mp3: { icon: FileAudio, color: "#fbbf24", bg: "rgba(251,191,36,0.12)" },
  py: { icon: FileCode, color: "#4ade80", bg: "rgba(74,222,128,0.12)" },
  js: { icon: FileCode, color: "#fbbf24", bg: "rgba(251,191,36,0.12)" },
  ts: { icon: FileCode, color: "#60a5fa", bg: "rgba(96,165,250,0.12)" },
};

const FALLBACK: IconConfig = { icon: File, color: "#8b9cb0", bg: "rgba(139,156,176,0.10)" };

export function getFileIconConfig(ext: string): IconConfig {
  return EXT_MAP[ext.toLowerCase()] ?? FALLBACK;
}
