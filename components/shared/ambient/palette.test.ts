import { describe, expect, it } from "vitest";
import { AMBIENT_COLORS, AMBIENT_PALETTE, GRADIENT_STOPS } from "./palette";

const HEX = /^#[0-9A-Fa-f]{6}$/;

describe("AMBIENT_COLORS", () => {
  it("has 5 valid 6-digit hex colors", () => {
    const values = Object.values(AMBIENT_COLORS);
    expect(values).toHaveLength(5);
    for (const v of values) expect(v).toMatch(HEX);
  });

  it("matches the documented module palette exactly", () => {
    expect(AMBIENT_COLORS).toEqual({
      blue: "#10B981",
      violet: "#6366F1",
      teal: "#0EA5E9",
      amber: "#F59E0B",
      rose: "#EF4444",
    });
  });
});

describe("AMBIENT_PALETTE", () => {
  it("lists the 5 colors in blue/violet/teal/amber/rose order", () => {
    expect(AMBIENT_PALETTE).toEqual([
      AMBIENT_COLORS.blue,
      AMBIENT_COLORS.violet,
      AMBIENT_COLORS.teal,
      AMBIENT_COLORS.amber,
      AMBIENT_COLORS.rose,
    ]);
  });
});

describe("GRADIENT_STOPS", () => {
  it("is blue -> violet -> teal, matching the headline gradient", () => {
    expect(GRADIENT_STOPS).toEqual([
      AMBIENT_COLORS.blue,
      AMBIENT_COLORS.violet,
      AMBIENT_COLORS.teal,
    ]);
  });
});
