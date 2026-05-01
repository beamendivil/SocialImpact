/**
 * API utilities for Stage 1.2
 * Uses real YNAB backend proxy requests where available.
 * Simulates auth and saved community goals until the full backend/database is ready.
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const REQUEST_ERROR_MESSAGE =
  "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.";

const MOCK_TOKEN = "mock-token-123";

const MOCK_USER = {
  _id: "user-001",
  name: "Demo User",
  email: "demo@example.com",
};

let savedGoals = [
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
];

function delay(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 500);
  });
}

async function fetchApi(pathname) {
  try {
    const response = await fetch(`${API_BASE_URL}${pathname}`);

    if (!response.ok) {
      throw new Error(REQUEST_ERROR_MESSAGE);
    }

    return response.json();
  } catch {
    throw new Error(REQUEST_ERROR_MESSAGE);
  }
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

// Simulates login until real auth is available
export function login({ email, password }) {
  if (!email || !password) {
    return Promise.reject(new Error(REQUEST_ERROR_MESSAGE));
  }

  return delay({
    token: MOCK_TOKEN,
    user: MOCK_USER,
  });
}

// Simulates token validation until real auth is available
export function checkToken(token) {
  if (token !== MOCK_TOKEN) {
    return Promise.reject(new Error(REQUEST_ERROR_MESSAGE));
  }

  return delay(MOCK_USER);
}

// Simulates fetching saved community goals from future MongoDB
export function getSavedGoals() {
  return delay(savedGoals);
}

// Simulates saving a new goal to the database
export function saveGoal(goalData) {
  const newGoal = {
    ...goalData,
    _id: crypto.randomUUID(),
  };

  savedGoals = [newGoal, ...savedGoals];

  return delay(newGoal);
}

// Simulates deleting a saved goal from the database
export function deleteGoal(goalId) {
  savedGoals = savedGoals.filter((goal) => goal._id !== goalId);

  return delay({
    message: "Goal deleted successfully",
  });
}
