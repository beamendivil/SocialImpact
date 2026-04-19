const express = require("express");

const router = express.Router();

router.get("/budgets", async (req, res) => {
  const apiKey = process.env.YNAB_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "YNAB_API_KEY is not configured" });
  }

  try {
    const response = await fetch("https://api.ynab.com/v1/budgets", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Unable to fetch budgets from YNAB",
        details: data,
      });
    }

    return res.json(data);
  } catch (error) {
    return res.status(502).json({
      error: "Unable to fetch budgets from YNAB",
      details: error.message,
    });
  }
});

module.exports = router;
