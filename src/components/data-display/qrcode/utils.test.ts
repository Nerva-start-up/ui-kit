import { describe, expect, it } from "vitest";
import { buildQrMatrix, buildQrPath } from "./utils";

describe("buildQrMatrix", () => {
  it("returns a square matrix sized to the minimal QR version for short content", () => {
    const matrix = buildQrMatrix("1", "L");
    expect(matrix.length).toBe(21); // version 1 QR is always 21×21
    for (const row of matrix) {
      expect(row).toHaveLength(21);
    }
  });

  it("is deterministic for the same input", () => {
    const a = buildQrMatrix("https://ksi-ed.uz", "M");
    const b = buildQrMatrix("https://ksi-ed.uz", "M");
    expect(a).toEqual(b);
  });

  it("grows the matrix for longer content", () => {
    const short = buildQrMatrix("1", "L");
    const long = buildQrMatrix("A".repeat(200), "L");
    expect(long.length).toBeGreaterThan(short.length);
  });

  it("grows the matrix for a higher error-correction level at the same content", () => {
    const low = buildQrMatrix("https://ksi-ed.uz", "L");
    const high = buildQrMatrix("https://ksi-ed.uz", "H");
    expect(high.length).toBeGreaterThanOrEqual(low.length);
  });

  it("produces a mix of dark and light modules, not a degenerate matrix", () => {
    const matrix = buildQrMatrix("https://ksi-ed.uz", "M");
    const flat = matrix.flat();
    expect(flat.some(Boolean)).toBe(true);
    expect(flat.some((m) => !m)).toBe(true);
  });

  it("throws when content exceeds QR capacity for the chosen level", () => {
    expect(() => buildQrMatrix("x".repeat(5000), "H")).toThrow();
  });
});

describe("buildQrPath", () => {
  it("returns an empty path for a matrix with no dark modules", () => {
    expect(
      buildQrPath(
        [
          [false, false],
          [false, false],
        ],
        10
      )
    ).toBe("");
  });

  it("emits one rect command per dark module, positioned by col/row × cellSize", () => {
    const path = buildQrPath(
      [
        [true, false],
        [false, true],
      ],
      10
    );
    expect(path).toBe("M0,0h10v10h-10zM10,10h10v10h-10z");
  });

  it("applies the offset to every dark module", () => {
    expect(buildQrPath([[true]], 10, 5)).toBe("M5,5h10v10h-10z");
  });

  it("scales the rect size with cellSize", () => {
    expect(buildQrPath([[true]], 4)).toBe("M0,0h4v4h-4z");
  });
});
