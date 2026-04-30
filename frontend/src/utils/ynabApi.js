// Handles fetch requests to the backend proxy for YNAB transactions
// Only native fetch is allowed

const YNAB_API_URL = import.meta.env.VITE_YNAB_API_URL;
const YNAB_API_KEY = import.meta.env.VITE_YNAB_API_KEY;

export async function fetchTransactions() {
  try {
    // Fetch budgets from YNAB API
    const budgetsRes = await fetch(`${YNAB_API_URL}/budgets`, {
      headers: {
        Authorization: `Bearer ${YNAB_API_KEY}`,
      },
    });
    if (!budgetsRes.ok)
      throw new Error("Network response was not ok (budgets)");
    const budgetsData = await budgetsRes.json();
    const budgetId = budgetsData?.data?.budgets?.[0]?.id;
    if (!budgetId) throw new Error("No YNAB budgets available");

    // Get transactions for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const sinceDate = thirtyDaysAgo.toISOString().split("T")[0];
    const txRes = await fetch(
      `${YNAB_API_URL}/budgets/${encodeURIComponent(budgetId)}/transactions?since_date=${encodeURIComponent(sinceDate)}`,
      {
        headers: {
          Authorization: `Bearer ${YNAB_API_KEY}`,
        },
      },
    );
    if (!txRes.ok)
      throw new Error("Network response was not ok (transactions)");
    const txData = await txRes.json();
    // Return only outflow transactions, mapped for DashboardPage
    return (txData?.data?.transactions || [])
      .filter((transaction) => (transaction.amount || 0) < 0)
      .map((transaction) => ({
        id: transaction.id,
        description:
          transaction.payee_name || transaction.memo || "YNAB Transaction",
        amount: Math.abs(transaction.amount || 0) / 1000,
        isLocal: true, // You may want to improve this with isLikelyLocal
        milliunits: Math.abs(transaction.amount || 0),
        date: transaction.date,
      }));
  } catch (error) {
    throw error;
  }
}
