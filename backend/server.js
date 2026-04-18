import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL || 'https://vaibhav-0924.github.io',
  'http://localhost:5173',
];
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (curl, Postman)
    if (!origin || allowedOrigins.some(o => origin.startsWith(o))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Serve static assets in production (optional, as per PRD "Express server must serve the React app's index.html")
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('(.*)', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Database Connection
let isDbConnected = false;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    isDbConnected = true;
  })
  .catch(err => {
    console.error('MongoDB connection error. Switching to Mock Fallback.');
    isDbConnected = false;
  });

// Inject connection status into request for controllers
app.use((req, res, next) => {
  req.isDbConnected = isDbConnected;
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
