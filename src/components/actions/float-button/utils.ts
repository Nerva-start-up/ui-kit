/** Функция, возвращающая скролл-контейнер. По умолчанию используется `window`. */
export type FloatButtonContainer = () => HTMLElement | Window;

export function getScrollContainer(container?: FloatButtonContainer): HTMLElement | Window {
  return container ? container() : window;
}

export function getScrollTop(target: HTMLElement | Window): number {
  return target instanceof Window ? target.scrollY : target.scrollTop;
}

export function scrollToTop(target: HTMLElement | Window): void {
  target.scrollTo({ top: 0, behavior: "smooth" });
}
