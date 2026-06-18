import express from 'express';
import apiRouter from './routes/api.js';

const app = express();
const codespace = process.env.CODESPACE_NAME;
const apiUrl = codespace
  ? `https://${codespace}-8000.app.github.dev/api`
  : `http://localhost:8000/api`;

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

export default app;
