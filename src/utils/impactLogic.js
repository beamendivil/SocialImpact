import {
  YNAB_MILLIUNIT_CONVERSION,
  MULTIPLIER_LOCAL_INDEPENDENT,
  MULTIPLIER_NATIONAL_CHAIN,
  TAX_RATE_BETTER_STREETS,
  TAX_RATE_REID_PARK_ZOO,
  TAX_RATE_GENERAL_FUND,
} from "./constants";

export function calculateSocialImpact(milliunits, isLocal) {
  const normalizedAmount = milliunits / YNAB_MILLIUNIT_CONVERSION;
  const multiplier = isLocal
    ? MULTIPLIER_LOCAL_INDEPENDENT
    : MULTIPLIER_NATIONAL_CHAIN;

  const totalEconomicOutput = normalizedAmount * multiplier;
  const lostValue = isLocal
    ? 0
    : normalizedAmount *
      (MULTIPLIER_LOCAL_INDEPENDENT - MULTIPLIER_NATIONAL_CHAIN);

  const betterStreets = normalizedAmount * TAX_RATE_BETTER_STREETS;
  const reidParkZoo = normalizedAmount * TAX_RATE_REID_PARK_ZOO;
  const generalFund = normalizedAmount * TAX_RATE_GENERAL_FUND;

  return {
    normalizedAmount,
    isLocal,
    multiplier,
    totalEconomicOutput,
    lostValue,
    fiscalRoi: {
      betterStreets,
      reidParkZoo,
      generalFund,
    },
  };
}
