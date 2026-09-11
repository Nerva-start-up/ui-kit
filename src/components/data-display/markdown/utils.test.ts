import { describe, expect, it } from "vitest";
import { slugifyHeadingText } from "./utils";

describe("slugifyHeadingText", () => {
  it("lowercases and joins words with a dash", () => {
    expect(slugifyHeadingText("Getting Started")).toBe("getting-started");
  });

  it("preserves cyrillic letters", () => {
    expect(slugifyHeadingText("Отчёт по практике")).toBe("отчёт-по-практике");
  });

  it("strips punctuation", () => {
    expect(slugifyHeadingText("Что нового? (v2.0)")).toBe("что-нового-v20");
  });

  it("collapses repeated whitespace", () => {
    expect(slugifyHeadingText("Один   Два")).toBe("один-два");
  });

  it("trims leading/trailing whitespace", () => {
    expect(slugifyHeadingText("  Заголовок  ")).toBe("заголовок");
  });
});
