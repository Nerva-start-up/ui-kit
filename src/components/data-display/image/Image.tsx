import { ImageOff } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { cn } from "../../../lib/cn";
import { Skeleton } from "../../feedback/skeleton/Skeleton";
import { Center } from "../../layout/Center";
import { ImagePreview } from "./ImagePreview";
import { useImageStatus } from "./useImageStatus";

const roundedClasses = {
  none: "",
  sm: "rounded-[var(--radius-sm)]",
  md: "rounded-[var(--radius-md)]",
  lg: "rounded-[var(--radius-lg)]",
  full: "rounded-full",
};

const fitClasses = {
  cover: "object-cover",
  contain: "object-contain",
  fill: "object-fill",
  none: "object-none",
  "scale-down": "object-scale-down",
};

export type ImageProps = {
  /** URL изображения */
  src: string;
  /** Альтернативный текст (обязателен для доступности) */
  alt: string;
  /** CSS-ширина контейнера */
  width?: number | string;
  /** CSS-высота контейнера */
  height?: number | string;
  /** object-fit */
  fit?: keyof typeof fitClasses;
  /** border-radius */
  rounded?: keyof typeof roundedClasses;
  /** Кастомный UI вместо иконки-заглушки при ошибке загрузки */
  fallback?: React.ReactNode;
  /** Показывать pulse-плейсхолдер во время загрузки */
  showSkeleton?: boolean;
  /** Клик по изображению открывает полноэкранный просмотр */
  preview?: boolean;
  /** native `loading` — по умолчанию `'lazy'` */
  loading?: "lazy" | "eager";
  onLoad?: () => void;
  onError?: () => void;
  className?: string;
};

/** Картинка с плейсхолдером загрузки, fallback при ошибке и опциональным полноэкранным просмотром. */
export function Image({
  src,
  alt,
  width,
  height,
  fit = "cover",
  rounded = "md",
  fallback,
  showSkeleton = true,
  preview = false,
  loading = "lazy",
  onLoad,
  onError,
  className,
}: ImageProps) {
  const { ref, status, handleLoad, handleError } = useImageStatus(src);
  const [previewOpen, setPreviewOpen] = useState(false);

  const isLoading = status === "loading";
  const isError = status === "error";

  const imgEl = (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading={loading}
      onLoad={() => {
        handleLoad();
        onLoad?.();
      }}
      onError={() => {
        handleError();
        onError?.();
      }}
      className={cn(
        "block h-full w-full transition-opacity duration-200",
        fitClasses[fit],
        isLoading && "opacity-0"
      )}
    />
  );

  return (
    <div
      className={cn("relative inline-block overflow-hidden", roundedClasses[rounded], className)}
      style={{ width, height }}
    >
      {isLoading && showSkeleton && (
        <Skeleton className="absolute inset-0" width="100%" height="100%" />
      )}

      {isError ? (
        (fallback ?? (
          <Center className="h-full min-h-[80px] w-full bg-[var(--surface-2)] text-[var(--text-muted)]">
            <ImageOff size={20} />
          </Center>
        ))
      ) : preview ? (
        <button
          type="button"
          onClick={() => setPreviewOpen(true)}
          aria-label={`Открыть изображение: ${alt}`}
          className="block h-full w-full cursor-zoom-in"
        >
          {imgEl}
        </button>
      ) : (
        imgEl
      )}

      {preview && (
        <ImagePreview src={src} alt={alt} open={previewOpen} onOpenChange={setPreviewOpen} />
      )}
    </div>
  );
}
