import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 8000;
const mongoUri = 'mongodb://127.0.0.1:27017/octofit_tracker';

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'OctoFit Tracker API', version: '0.0.1' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB at', mongoUri);
    app.listen(port, () => {
      console.log(`Backend listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
