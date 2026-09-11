import { describe, expect, it } from "vitest";
import { toDisplayJson } from "./utils";

describe("toDisplayJson", () => {
  it("passes strings through unchanged", () => {
    expect(toDisplayJson("raw text")).toBe("raw text");
  });

  it("pretty-prints objects with 2-space indent", () => {
    expect(toDisplayJson({ a: 1 })).toBe('{\n  "a": 1\n}');
  });

  it("pretty-prints arrays and primitives", () => {
    expect(toDisplayJson([1, 2])).toBe("[\n  1,\n  2\n]");
    expect(toDisplayJson(42)).toBe("42");
    expect(toDisplayJson(null)).toBe("null");
  });
});
