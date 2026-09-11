export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

export const slideUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
} as const;

export const slideDown = {
  initial: { opacity: 0, y: -12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
} as const;

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
} as const;

export const dialogContent = {
  initial: { opacity: 0, scale: 0.95, x: "-50%", y: "-50%" },
  animate: { opacity: 1, scale: 1, x: "-50%", y: "-50%" },
  exit: { opacity: 0, scale: 0.95, x: "-50%", y: "-50%" },
} as const;

export const overlayBg = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

export const defaultTransition = { duration: 0.15, ease: "easeOut" } as const;
export const springTransition = { type: "spring", stiffness: 400, damping: 30 } as const;
