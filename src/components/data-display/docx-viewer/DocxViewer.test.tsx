// @vitest-environment happy-dom
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { DocxViewer } from "./DocxViewer";

vi.mock("docx-preview", () => ({
  renderAsync: vi.fn(async (_data: unknown, container: HTMLElement) => {
    // регрессия: `container` должен быть реально смонтирован в документе к этому моменту —
    // если рендер `containerRef`-узла условно убран из дерева на время статуса "loading",
    // этот вызов либо не произойдёт вовсе, либо получит отсоединённый узел
    if (!container.isConnected) {
      throw new Error("container is not connected to the document");
    }
    container.innerHTML =
      '<div class="docx-wrapper"><section class="docx" data-testid="docx-page">Контент документа</section></div>';
  }),
}));

beforeAll(() => {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  globalThis.IntersectionObserver = class {
    root = null;
    rootMargin = "";
    thresholds = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  };
  Element.prototype.scrollIntoView = vi.fn();
});

afterEach(() => cleanup());

describe("DocxViewer", () => {
  it("рендерит содержимое после загрузки — containerRef смонтирован уже во время status='loading'", async () => {
    const blob = new Blob(["docx bytes"]);

    render(<DocxViewer src={blob} />);

    await waitFor(() => {
      expect(screen.getByTestId("docx-page")).toBeTruthy();
    });
  });
});
