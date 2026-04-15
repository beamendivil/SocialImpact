const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config();

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI;

async function startServer() {
  if (mongoUri) {
    try {
      await mongoose.connect(mongoUri);
      // eslint-disable-next-line no-console
      console.log('MongoDB connected');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('MongoDB connection failed:', error.message);
    }
  }

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend listening on port ${port}`);
  });
}

startServer();
