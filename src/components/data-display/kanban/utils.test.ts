import { describe, expect, it } from "vitest";
import { computeDropIndexFromRects } from "./utils";

describe("computeDropIndexFromRects", () => {
  const cards = [
    { id: "a", top: 0, height: 40 }, // midpoint 20
    { id: "b", top: 40, height: 40 }, // midpoint 60
    { id: "c", top: 80, height: 40 }, // midpoint 100
  ];

  it("inserts before the first card when the pointer is above everything", () => {
    expect(computeDropIndexFromRects(cards, -10)).toBe(0);
  });

  it("inserts before a card whose midpoint the pointer is above", () => {
    expect(computeDropIndexFromRects(cards, 50)).toBe(1);
  });

  it("inserts at the end when the pointer is below every midpoint", () => {
    expect(computeDropIndexFromRects(cards, 200)).toBe(3);
  });

  it("returns 0 for an empty column", () => {
    expect(computeDropIndexFromRects([], 50)).toBe(0);
  });

  it("treats the pointer exactly at a midpoint as past it (strict less-than)", () => {
    expect(computeDropIndexFromRects(cards, 20)).toBe(1);
  });
});
