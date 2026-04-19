import {
  MULTIPLIER_LOCAL_INDEPENDENT,
  MULTIPLIER_NATIONAL_CHAIN,
  TAX_RATE_BETTER_STREETS,
  TAX_RATE_REID_PARK_ZOO,
  TAX_RATE_GENERAL_FUND,
  POVERTY_REDUCTION_RATIO,
  YNAB_MILLIUNIT_CONVERSION,
} from "./constants";

/**
 * THE SOCIAL IMPACT ALGORITHM
 * @param {number} milliunits - Raw currency value from YNAB API
 * @param {boolean} isLocal - Classification based on merchant memo/flag
 * @returns {Object} - Enriched impact data for the UI
 */
export const calculateSocialImpact = (milliunits, isLocal) => {
  // 1. DATA NORMALIZATION
  // We divide by 1000 to convert YNAB's integer-based milliunits to standard USD.
  const amount = milliunits / YNAB_MILLIUNIT_CONVERSION;

  // 2. THE MULTIPLIER SELECTION
  // We choose the multiplier based on the 'isLocal' classification research.
  const multiplier = isLocal
    ? MULTIPLIER_LOCAL_INDEPENDENT
    : MULTIPLIER_NATIONAL_CHAIN;

  // 3. IMPACT CALCULATIONS
  const totalEconomicOutput = amount * multiplier;

  // 4. FISCAL ROI (Tucson Tax breakdown)
  const streetsContribution = amount * TAX_RATE_BETTER_STREETS;
  const zooContribution = amount * TAX_RATE_REID_PARK_ZOO;
  const publicSafetyContribution = amount * TAX_RATE_GENERAL_FUND;

  // 5. SOCIAL ROI (Poverty Reduction Logic)
  // Based on research: 1% entrepreneurial growth = 2% poverty decline.
  // We model this as a 'Community Score' impact.
  const povertyImpactScore = isLocal
    ? (amount * POVERTY_REDUCTION_RATIO) / 100
    : 0;

  return {
    originalAmount: amount.toFixed(2),
    localRecirculation: totalEconomicOutput.toFixed(2),
    streets: streetsContribution.toFixed(4), // High precision for small tax amounts
    zoo: zooContribution.toFixed(4),
    safety: publicSafetyContribution.toFixed(2),
    povertyScore: povertyImpactScore.toFixed(2),
    isLocal: isLocal,
  };
};
