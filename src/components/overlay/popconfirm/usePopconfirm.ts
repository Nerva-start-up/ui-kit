import { useState } from "react";

export type UsePopconfirmOptions = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
};

/** Controlled/uncontrolled состояние попапа + async-обёртка над `onConfirm` с индикацией ожидания. */
export function usePopconfirm({
  open,
  defaultOpen = false,
  onOpenChange,
  onConfirm,
  onCancel,
}: UsePopconfirmOptions) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const [confirming, setConfirming] = useState(false);

  function setOpen(next: boolean) {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }

  async function handleConfirm() {
    const result = onConfirm();
    if (result instanceof Promise) {
      setConfirming(true);
      try {
        await result;
      } finally {
        setConfirming(false);
      }
    }
    setOpen(false);
  }

  function handleCancel() {
    onCancel?.();
    setOpen(false);
  }

  return { isOpen, setOpen, confirming, handleConfirm, handleCancel };
}
