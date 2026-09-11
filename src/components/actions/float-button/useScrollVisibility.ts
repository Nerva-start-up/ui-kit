import { useEffect, useState } from "react";
import { type FloatButtonContainer, getScrollContainer, getScrollTop } from "./utils";

/** `true`, когда скролл `container` (по умолчанию `window`) превысил `visibilityHeight`. */
export function useScrollVisibility(
  visibilityHeight: number,
  container?: FloatButtonContainer
): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = getScrollContainer(container);

    function handleScroll() {
      setVisible(getScrollTop(target) > visibilityHeight);
    }

    handleScroll();
    target.addEventListener("scroll", handleScroll, { passive: true });
    return () => target.removeEventListener("scroll", handleScroll);
  }, [visibilityHeight, container]);

  return visible;
}
