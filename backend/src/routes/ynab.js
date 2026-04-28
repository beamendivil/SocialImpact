const express = require("express");

const router = express.Router();

async function ynabFetch(pathname, apiKey) {
  const response = await fetch(`https://api.ynab.com/v1${pathname}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error("Unable to fetch data from YNAB");
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return data;
}

router.get("/budgets", async (req, res) => {
  const apiKey = process.env.YNAB_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "YNAB_API_KEY is not configured" });
  }

  try {
    const data = await ynabFetch("/budgets", apiKey);
    return res.json(data);
  } catch (error) {
    return res.status(error.status || 502).json({
      error: "Unable to fetch budgets from YNAB",
      details: error.details || error.message,
    });
  }
});

router.get("/transactions/:budgetId", async (req, res) => {
  const apiKey = process.env.YNAB_API_KEY;
  const { budgetId } = req.params;
  const { sinceDate } = req.query;

  if (!apiKey) {
    return res.status(500).json({ error: "YNAB_API_KEY is not configured" });
  }

  if (!budgetId) {
    return res.status(400).json({ error: "budgetId is required" });
  }

  const sinceDateQuery = sinceDate
    ? `?since_date=${encodeURIComponent(sinceDate)}`
    : "";

  try {
    const data = await ynabFetch(
      `/budgets/${encodeURIComponent(budgetId)}/transactions${sinceDateQuery}`,
      apiKey,
    );
    return res.json(data);
  } catch (error) {
    return res.status(error.status || 502).json({
      error: "Unable to fetch transactions from YNAB",
      details: error.details || error.message,
    });
  }
});

module.exports = router;
