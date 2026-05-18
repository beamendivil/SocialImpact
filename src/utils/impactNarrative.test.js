import { describe, expect, it } from "vitest";
import { generateImpactNarrative } from "./impactNarrative";

describe("generateImpactNarrative", () => {
  it("returns an empty-state narrative when there are no transactions", () => {
    const narrative = generateImpactNarrative({ transactionCount: 0 });

    expect(narrative.heading).toBe("No transactions yet");
    expect(narrative.body).toContain("Connect YNAB");
    expect(narrative.callout).toContain("Once data is available");
  });

  it("describes a strong local-first spending pattern", () => {
    const narrative = generateImpactNarrative({
      transactionCount: 4,
      localShare: 75,
      spend: 100,
      totalEconomicOutput: 143,
      lostValue: 0,
      betterStreets: 0.5,
      reidParkZoo: 0.1,
      generalFund: 2,
    });

    expect(narrative.heading).toContain("strong local-first spending pattern");
    expect(narrative.body).toContain("$100.00 in spending");
    expect(narrative.body).toContain("$143.00 in community economic activity");
    expect(narrative.callout).toContain("Better Streets $0.50");
  });

  it("describes a chain-heavy spending pattern when local share is low", () => {
    const narrative = generateImpactNarrative({
      transactionCount: 3,
      localShare: 20,
      spend: 80,
      totalEconomicOutput: 34.4,
      lostValue: 80,
      betterStreets: 0.4,
      reidParkZoo: 0.08,
      generalFund: 1.6,
    });

    expect(narrative.heading).toContain("chain-heavy spending pattern");
    expect(narrative.body).toContain("$80.00 in potential value");
  });
});
