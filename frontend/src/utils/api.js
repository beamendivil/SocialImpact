/**
 * SIMULATED DATABASE API
 * Since Stage 1 requires real YNAB API but also allows saving items (simulated),
 * this file handles "Saved Community Goals" that will eventually go to MongoDB.
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

async function fetchApi(pathname) {
  const response = await fetch(`${API_BASE_URL}${pathname}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "API request failed");
  }

  return data;
}

export async function getYnabBudgets() {
  const payload = await fetchApi("/api/ynab/budgets");
  return payload?.data?.budgets || [];
}

export async function getYnabTransactions(budgetId, sinceDate) {
  if (!budgetId) {
    throw new Error("budgetId is required to fetch transactions");
  }

  const sinceDateQuery = sinceDate
    ? `?sinceDate=${encodeURIComponent(sinceDate)}`
    : "";

  const payload = await fetchApi(
    `/api/ynab/transactions/${encodeURIComponent(budgetId)}${sinceDateQuery}`,
  );

  return payload?.data?.transactions || [];
}

// This simulates fetching "Saved Community Goals" from your future MongoDB
export function getSavedGoals() {
  return new Promise((resolve) =>
    resolve([
      {
        _id: "65f7371e7bce9e7d331b11a0",
        name: "Reid Park Zoo Expansion",
        targetAmount: 5000,
        currentImpact: 1250.5,
        description: "Community-funded improvements for local wildlife.",
      },
      {
        _id: "66fae3a5488272ac5507672d",
        name: "Better Streets Fund",
        targetAmount: 10000,
        currentImpact: 4300.75,
        description: "Pothole repair and bike lane expansion in Tucson.",
      },
    ]),
  );
}

// This simulates saving a new goal to the database
export function saveGoal(goalData) {
  return new Promise((resolve) => {
    resolve({
      ...goalData,
      _id: "65f7371e7bce9e7d331b11b1", // Mocked ID
    });
  });
}
