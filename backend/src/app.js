const express = require('express');
const cors = require('cors');
const ynabRoutes = require('./routes/ynab');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/ynab', ynabRoutes);

module.exports = app;
