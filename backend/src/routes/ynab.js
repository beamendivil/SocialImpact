const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/budgets', async (req, res) => {
  const apiKey = process.env.YNAB_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'YNAB_API_KEY is not configured' });
  }

  try {
    const response = await axios.get('https://api.ynab.com/v1/budgets', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    return res.json(response.data);
  } catch (error) {
    const statusCode = error.response?.status ?? 502;
    return res.status(statusCode).json({
      error: 'Unable to fetch budgets from YNAB',
      details: error.response?.data ?? error.message,
    });
  }
});

module.exports = router;
