/**
 * Radix Select/Popover/DropdownMenu/ContextMenu/HoverCard/Tooltip all render their
 * popup content through `@radix-ui/react-popper`, which wraps it in an element
 * marked `data-radix-popper-content-wrapper`. That wrapper is portaled to
 * `document.body`, so it sits outside a `Dialog`/`AlertDialog` content's own DOM
 * subtree — Radix's `DismissableLayer` then treats clicks inside it as "outside"
 * clicks and closes the dialog (see https://github.com/radix-ui/primitives/issues/2450).
 */
function isInsideRadixPopper(target: EventTarget | null): boolean {
  return (
    target instanceof Element && target.closest("[data-radix-popper-content-wrapper]") !== null
  );
}

/** `onInteractOutside` for `Dialog.Content`/`AlertDialog.Content` — ignores outside-interactions landing inside a nested Radix popper popup (e.g. `Select`) instead of closing the dialog. */
export function ignoreNestedPopperInteraction(event: {
  target: EventTarget | null;
  preventDefault: () => void;
}) {
  if (isInsideRadixPopper(event.target)) {
    event.preventDefault();
  }
}
