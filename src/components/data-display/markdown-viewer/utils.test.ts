import { afterEach, describe, expect, it, vi } from "vitest";
import { clampMdScale, resolveMarkdownText, zoomInMdScale, zoomOutMdScale } from "./utils";

describe("resolveMarkdownText", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("reads a File/Blob source directly, without fetching", async () => {
    const file = new File(["# Заголовок"], "readme.md");
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const result = await resolveMarkdownText(file);

    expect(result).toBe("# Заголовок");
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("fetches a string source as a URL and returns its text", async () => {
    const fetchSpy = vi
      .fn()
      .mockResolvedValue({ ok: true, text: () => Promise.resolve("# Hello") });
    vi.stubGlobal("fetch", fetchSpy);

    const result = await resolveMarkdownText("https://example.com/readme.md");

    expect(fetchSpy).toHaveBeenCalledWith("https://example.com/readme.md");
    expect(result).toBe("# Hello");
  });

  it("throws when the fetch response is not ok", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 404 }));

    await expect(resolveMarkdownText("https://example.com/missing.md")).rejects.toThrow("404");
  });
});

describe("clampMdScale", () => {
  it("clamps below the minimum", () => {
    expect(clampMdScale(0.1)).toBe(0.85);
  });

  it("clamps above the maximum", () => {
    expect(clampMdScale(10)).toBe(1.5);
  });

  it("leaves an in-range value untouched", () => {
    expect(clampMdScale(1.1)).toBe(1.1);
  });
});

describe("zoomInMdScale / zoomOutMdScale", () => {
  it("steps by a fixed increment", () => {
    expect(zoomInMdScale(1)).toBeCloseTo(1.1);
    expect(zoomOutMdScale(1)).toBeCloseTo(0.9);
  });

  it("does not exceed the min/max bounds", () => {
    expect(zoomInMdScale(1.5)).toBe(1.5);
    expect(zoomOutMdScale(0.85)).toBe(0.85);
  });
});
