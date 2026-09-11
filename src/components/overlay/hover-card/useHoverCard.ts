import { useCallback, useRef, useState } from "react";

export type UseHoverCardOptions = {
  openDelay: number;
  closeDelay: number;
};

/** Открытие/закрытие с задержкой; наведение на контент отменяет запланированное закрытие (grace-период). */
export function useHoverCard({ openDelay, closeDelay }: UseHoverCardOptions) {
  const [open, setOpen] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const scheduleOpen = useCallback(() => {
    clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => setOpen(true), openDelay);
  }, [openDelay]);

  const scheduleClose = useCallback(() => {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), closeDelay);
  }, [closeDelay]);

  const cancelClose = useCallback(() => {
    clearTimeout(closeTimer.current);
  }, []);

  return { open, scheduleOpen, scheduleClose, cancelClose };
}
