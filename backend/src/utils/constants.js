/** * SOCIAL IMPACT: TUCSON ECONOMIC CONSTANTS
 * These values are derived from the "Regional Economic Value of Local Currency"
 * research for the Tucson, Arizona MSA.
 */

// 1. YNAB API CONFIGURATION
export const YNAB_BASE_URL = "https://api.ynab.com/v1";
export const YNAB_MILLIUNIT_CONVERSION = 1000; // YNAB stores $1.00 as 1000

// 2. ECONOMIC MULTIPLIER CONSTANTS (Total local activity generated per $1.00)
export const MULTIPLIER_LOCAL_INDEPENDENT = 1.43;
export const MULTIPLIER_NATIONAL_CHAIN = 0.43;

// 3. REVENUE RETENTION RATES (Percentage of dollar that stays in Tucson)
export const RETENTION_LOCAL_RETAIL = 0.52; // 52% remains local
export const RETENTION_CHAIN_RETAIL = 0.14; // 14% remains local
export const RETENTION_LOCAL_RESTAURANT = 0.79; // 79% remains local
export const RETENTION_CHAIN_RESTAURANT = 0.3; // 30% remains local

// 4. FISCAL ROI (Tucson Transaction Privilege Tax - TPT Rates)
export const TAX_RATE_TOTAL = 0.026; // 2.6% total city tax
export const TAX_RATE_GENERAL_FUND = 0.02; // 2.0% for Police, Fire, Parks
export const TAX_RATE_BETTER_STREETS = 0.005; // 0.5% for Capital Improvements
export const TAX_RATE_REID_PARK_ZOO = 0.001; // 0.1% for Zoo operations

// 5. SOCIAL ROI IMPACT RATIOS
export const POVERTY_REDUCTION_RATIO = 2.0; // 1% entrepreneurial growth = 2% poverty decline
export const HOUSEHOLD_INCOME_BOOST = 485.0; // Boost per 100 local businesses

// 6. UI & ANIMATION CONSTANTS (As per Stage 1.1 Instructions)
export const PRELOADER_SPIN_DURATION = "75s"; // Animation speed for circle-preloader
