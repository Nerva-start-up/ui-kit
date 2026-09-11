import { describe, expect, it } from "vitest";
import {
  clampPdfPage,
  clampPdfScale,
  getDefaultPdfWorkerSrc,
  zoomInPdfScale,
  zoomOutPdfScale,
} from "./utils";

describe("getDefaultPdfWorkerSrc", () => {
  it("points to jsdelivr, pinned to the given pdfjs-dist version", () => {
    expect(getDefaultPdfWorkerSrc("4.7.76")).toBe(
      "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.7.76/build/pdf.worker.min.mjs"
    );
  });
});

describe("clampPdfScale", () => {
  it("clamps below the minimum", () => {
    expect(clampPdfScale(0.1)).toBe(0.5);
  });

  it("clamps above the maximum", () => {
    expect(clampPdfScale(10)).toBe(3);
  });

  it("leaves an in-range value untouched", () => {
    expect(clampPdfScale(1.5)).toBe(1.5);
  });
});

describe("zoomInPdfScale / zoomOutPdfScale", () => {
  it("steps by a fixed increment", () => {
    expect(zoomInPdfScale(1)).toBe(1.25);
    expect(zoomOutPdfScale(1)).toBe(0.75);
  });

  it("does not exceed the min/max bounds", () => {
    expect(zoomInPdfScale(3)).toBe(3);
    expect(zoomOutPdfScale(0.5)).toBe(0.5);
  });
});

describe("clampPdfPage", () => {
  it("clamps below page 1", () => {
    expect(clampPdfPage(0, 10)).toBe(1);
  });

  it("clamps above numPages", () => {
    expect(clampPdfPage(99, 10)).toBe(10);
  });

  it("leaves an in-range page untouched", () => {
    expect(clampPdfPage(5, 10)).toBe(5);
  });

  it("never returns less than 1 even when numPages is 0", () => {
    expect(clampPdfPage(5, 0)).toBe(1);
  });
});
