import { describe, expect, it } from "vitest";
import { calculateSocialImpact } from "./impactLogic";

describe("calculateSocialImpact", () => {
  it("applies the local independent multiplier and tax estimates", () => {
    const result = calculateSocialImpact(25000, true);

    expect(result).toEqual({
      normalizedAmount: 25,
      isLocal: true,
      multiplier: 1.43,
      totalEconomicOutput: 35.75,
      lostValue: 0,
      fiscalRoi: {
        betterStreets: 0.125,
        reidParkZoo: 0.025,
        generalFund: 0.5,
      },
    });
  });

  it("calculates lost local value for national chain spending", () => {
    const result = calculateSocialImpact(50000, false);

    expect(result.normalizedAmount).toBe(50);
    expect(result.isLocal).toBe(false);
    expect(result.multiplier).toBe(0.43);
    expect(result.totalEconomicOutput).toBe(21.5);
    expect(result.lostValue).toBe(50);
  });
});
