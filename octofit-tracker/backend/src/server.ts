import app from './index.js';
import { connectDatabase, getDatabaseUri } from './config/database.js';

const port = 8000;
const codespace = process.env.CODESPACE_NAME;
const host = codespace ? `${codespace}-8000.app.github.dev` : 'localhost';

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
