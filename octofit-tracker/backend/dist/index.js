import express from 'express';
import mongoose from 'mongoose';
import apiRouter from './routes/api.js';
const app = express();
const port = 8000;
const codespace = process.env.CODESPACE_NAME;
const host = codespace ? `${codespace}-8000.githubpreview.dev` : 'localhost';
const apiUrl = `http://${host}:${port}/api`;
const mongoUri = 'mongodb://127.0.0.1:27017/octofit_db';
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
mongoose.connect(mongoUri)
    .then(() => {
    console.log('Connected to MongoDB at', mongoUri);
    app.listen(port, () => {
        console.log(`Backend listening on http://${host}:${port}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
