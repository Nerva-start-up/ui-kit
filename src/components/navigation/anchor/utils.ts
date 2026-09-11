/** Функция, возвращающая скролл-контейнер. По умолчанию используется `window`. */
export type AnchorContainer = () => HTMLElement | Window;

export function getScrollContainer(container?: AnchorContainer): HTMLElement | Window {
  return container ? container() : window;
}

export function getScrollTop(target: HTMLElement | Window): number {
  return target instanceof Window ? target.scrollY : target.scrollTop;
}

export function getElementTop(el: HTMLElement, target: HTMLElement | Window): number {
  if (target instanceof Window) {
    return el.getBoundingClientRect().top + target.scrollY;
  }
  return el.getBoundingClientRect().top - target.getBoundingClientRect().top + target.scrollTop;
}

export function scrollTo(target: HTMLElement | Window, top: number): void {
  target.scrollTo({ top, behavior: "smooth" });
}
