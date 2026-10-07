import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import gatesRouter from './routes/gates.js';

const app = express();
const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',').map((url) => url.trim()) : [])
]);

// Local development uses separate frontend and backend ports. In the Vercel
// deployment both services share an origin, so cross-origin handling is not needed.
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) return callback(null, true);
      return callback(new Error('This origin is not allowed to access the LogicLab API.'));
    }
  }));
}

app.use(express.json());
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'LogicLab API is running.' }));
app.use('/api/gates', gatesRouter);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

export default app;
