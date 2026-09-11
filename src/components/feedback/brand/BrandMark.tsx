import { cn } from "@lib/cn";
import { motion } from "motion/react";
import { useId } from "react";

const BARS = [
  { x: 28, y: 30, width: 64 },
  { x: 39, y: 55, width: 42 },
  { x: 28, y: 80, width: 64 },
] as const;

const CYCLE_DURATION = 2;
const BAR_STAGGER = 0.15;

export type BrandMarkProps = {
  /** Сторона квадрата, px */
  size?: number;
  /** Полоски прорисовываются в цикле друг за другом, а не статично */
  animated?: boolean;
  className?: string;
};

/** Глиф KSI — три полоски, прорезанные насквозь в скруглённом квадрате `--primary`. */
export function BrandMark({ size = 48, animated = false, className }: BrandMarkProps) {
  const maskId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <rect width={120} height={120} fill="white" />
          {BARS.map((bar, i) =>
            animated ? (
              <motion.rect
                key={`${bar.x}-${bar.y}`}
                x={bar.x}
                y={bar.y}
                height={10}
                rx={5}
                fill="black"
                initial={{ width: 0 }}
                animate={{ width: [0, bar.width, bar.width, 0] }}
                transition={{
                  duration: CYCLE_DURATION,
                  times: [0, 0.2, 0.8, 1],
                  delay: i * BAR_STAGGER,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ) : (
              <rect
                key={`${bar.x}-${bar.y}`}
                x={bar.x}
                y={bar.y}
                width={bar.width}
                height={10}
                rx={5}
                fill="black"
              />
            )
          )}
        </mask>
      </defs>
      <rect width={120} height={120} rx={28} fill="var(--primary)" mask={`url(#${maskId})`} />
    </svg>
  );
}
