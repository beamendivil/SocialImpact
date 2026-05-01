function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

export function generateImpactNarrative(summary) {
  const {
    transactionCount,
    localShare,
    spend,
    totalEconomicOutput,
    lostValue,
    betterStreets,
    reidParkZoo,
    generalFund,
  } = summary;

  if (!transactionCount) {
    return {
      heading: "No transactions yet",
      body: "Connect YNAB or add transactions to generate your local impact story.",
      callout:
        "Once data is available, this section will translate spending into a civic impact narrative.",
    };
  }

  const localTone =
    localShare >= 65
      ? "strong local-first spending pattern"
      : localShare >= 45
        ? "balanced spending pattern"
        : "chain-heavy spending pattern";

  return {
    heading: `Your latest spending shows a ${localTone}.`,
    body: `Across ${transactionCount} tracked transactions, ${formatCurrency(spend)} in spending generated an estimated ${formatCurrency(totalEconomicOutput)} in community economic activity. ${formatCurrency(lostValue)} in potential value was diverted away from local circulation by non-local purchases.`,
    callout: `Estimated Tucson tax support from this activity: Better Streets ${formatCurrency(betterStreets)}, Reid Park Zoo ${formatCurrency(reidParkZoo)}, and General Fund ${formatCurrency(generalFund)}.`,
  };
}
