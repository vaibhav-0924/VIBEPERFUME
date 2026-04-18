import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';

dotenv.config();



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

// Health check
app.get('/', (req, res) => {
  res.send('VIBEPERFUME API is running...');
});

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
