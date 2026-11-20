import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import api from './routes/api.js';

const app = express();

const PORT = process.env.PORT || 5000;

const origins = (
  process.env.CLIENT_ORIGIN || 'http://localhost:5173'
)
  .split(',')
  .map(s => s.trim());

// Middleware
app.use(cors({ origin: origins }));
app.use(express.json({ limit: '10kb' }));

// Root Route
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to Archana's Portfolio API!</h1>
    <p>Server is running successfully.</p>
  `);
});

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Portfolio API is running successfully'
  });
});

// API Routes
app.use('/api', api);

// API Not Found
app.use('/api', (req, res) => {
  res.status(404).json({
    error: 'API route not found'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'Invalid ID'
    });
  }

  res.status(500).json({
    error: 'Something went wrong on the server.'
  });
});

// Connect Database and Start Server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log('--------------------------------');
      console.log('Portfolio Backend Started!');
      console.log(`Server: http://localhost:${PORT}`);
      console.log(`Health: http://localhost:${PORT}/api/health`);
      console.log('--------------------------------');
    });
  })
  .catch(err => {
    console.error('Database Connection Failed:', err.message);
    process.exit(1);
  });
