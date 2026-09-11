// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useRef, useState } from "react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { Tour } from "./Tour";
import { TourDescription } from "./TourDescription";
import { TourStep } from "./TourStep";
import { TourTitle } from "./TourTitle";

beforeAll(() => {
  // happy-dom не реализует ResizeObserver/scrollIntoView
  // biome-ignore lint/suspicious/noExplicitAny: тестовый полифилл
  (globalThis as any).ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  Element.prototype.scrollIntoView = vi.fn();
});

afterEach(() => cleanup());

function Demo() {
  const [open, setOpen] = useState(true);
  const targetRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button ref={targetRef} type="button">
        Target 1
      </button>
      <button type="button" id="target-2">
        Target 2
      </button>
      <Tour open={open} onOpenChange={setOpen}>
        <TourStep target={targetRef}>
          <TourTitle>Шаг 1</TourTitle>
          <TourDescription>Описание 1</TourDescription>
        </TourStep>
        <TourStep target={() => document.getElementById("target-2")}>
          <TourTitle>Шаг 2</TourTitle>
          <TourDescription>Описание 2</TourDescription>
        </TourStep>
      </Tour>
    </>
  );
}

describe("Tour", () => {
  it("не уходит в бесконечный цикл ререндеров и проходит шаги без падений", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<Demo />);

    expect(screen.getByText("Шаг 1")).toBeTruthy();

    fireEvent.click(screen.getByText("Далее"));
    expect(screen.getByText("Шаг 2")).toBeTruthy();

    fireEvent.click(screen.getByText("Готово"));
    expect(screen.queryByText("Шаг 2")).toBeNull();

    const loopErrors = errorSpy.mock.calls.filter((call) =>
      String(call[0]).includes("Maximum update depth exceeded")
    );
    expect(loopErrors).toHaveLength(0);

    errorSpy.mockRestore();
  });
});
