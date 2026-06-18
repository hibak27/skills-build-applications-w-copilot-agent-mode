import express from 'express';
import apiRouter from './routes/api.js';
import { connectDatabase, getDatabaseUri } from './config/database.js';

const app = express();
const port = 8000;
const codespace = process.env.CODESPACE_NAME;
const host = codespace ? `${codespace}-8000.githubpreview.dev` : 'localhost';
const apiUrl = `http://${host}:${port}/api`;

app.use(express.json());
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.json({
    status: 'OctoFit Tracker API',
    version: '0.0.1',
    apiUrl,
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

connectDatabase()
  .then(() => {
    console.log('Connected to MongoDB at', getDatabaseUri());
    app.listen(port, () => {
      console.log(`Backend listening on http://${host}:${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
