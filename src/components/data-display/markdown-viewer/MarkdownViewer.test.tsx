// @vitest-environment happy-dom
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { MarkdownViewer } from "./MarkdownViewer";

beforeAll(() => {
  // happy-dom не реализует ResizeObserver (используется в useReadingProgress)
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

afterEach(() => cleanup());

describe("MarkdownViewer", () => {
  it("рендерит документ и собирает заголовки без бесконечного цикла ререндеров", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const blob = new Blob(["# Заголовок один\n\nТекст.\n\n## Заголовок два\n\nЕщё текст."], {
      type: "text/markdown",
    });

    render(<MarkdownViewer src={blob} />);

    await waitFor(() => {
      expect(screen.getByText("Заголовок один")).toBeTruthy();
    });
    expect(screen.getByText("Заголовок два")).toBeTruthy();

    const loopErrors = errorSpy.mock.calls.filter((call) =>
      String(call[0]).includes("Maximum update depth exceeded")
    );
    expect(loopErrors).toHaveLength(0);

    errorSpy.mockRestore();
  });
});
