import { afterEach, describe, expect, it, vi } from "vitest";
import {
  clampDocxPage,
  clampDocxScale,
  resolveDocxBlob,
  zoomInDocxScale,
  zoomOutDocxScale,
} from "./utils";

describe("resolveDocxBlob", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns a File/Blob source as-is, without fetching", async () => {
    const file = new File(["docx bytes"], "report.docx");
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const result = await resolveDocxBlob(file);

    expect(result).toBe(file);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("fetches a string source as a URL and returns its blob", async () => {
    const blob = new Blob(["docx bytes"]);
    const fetchSpy = vi.fn().mockResolvedValue({ ok: true, blob: () => Promise.resolve(blob) });
    vi.stubGlobal("fetch", fetchSpy);

    const result = await resolveDocxBlob("https://example.com/report.docx");

    expect(fetchSpy).toHaveBeenCalledWith("https://example.com/report.docx");
    expect(result).toBe(blob);
  });

  it("throws when the fetch response is not ok", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 404 }));

    await expect(resolveDocxBlob("https://example.com/missing.docx")).rejects.toThrow("404");
  });
});

describe("clampDocxScale", () => {
  it("clamps below the minimum", () => {
    expect(clampDocxScale(0.1)).toBe(0.5);
  });

  it("clamps above the maximum", () => {
    expect(clampDocxScale(10)).toBe(2);
  });

  it("leaves an in-range value untouched", () => {
    expect(clampDocxScale(1.2)).toBe(1.2);
  });
});

describe("zoomInDocxScale / zoomOutDocxScale", () => {
  it("steps by a fixed increment", () => {
    expect(zoomInDocxScale(1)).toBeCloseTo(1.1);
    expect(zoomOutDocxScale(1)).toBeCloseTo(0.9);
  });

  it("does not exceed the min/max bounds", () => {
    expect(zoomInDocxScale(2)).toBe(2);
    expect(zoomOutDocxScale(0.5)).toBe(0.5);
  });
});

describe("clampDocxPage", () => {
  it("clamps below page 1", () => {
    expect(clampDocxPage(0, 10)).toBe(1);
  });

  it("clamps above totalPages", () => {
    expect(clampDocxPage(99, 10)).toBe(10);
  });

  it("leaves an in-range page untouched", () => {
    expect(clampDocxPage(5, 10)).toBe(5);
  });

  it("never returns less than 1 even when totalPages is 0", () => {
    expect(clampDocxPage(5, 0)).toBe(1);
  });
});
