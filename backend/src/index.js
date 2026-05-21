import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/index.js';
import authRoutes from './routes/authRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';
import verificationRoutes from './routes/verificationRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { generalLimiter } from './middleware/rateLimiter.js';

const app = express();

// Security middlewares
app.use(helmet());
app.use(cors({
  origin: '*', // Allow all origins for simplicity in development, configure properly in production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Apply general rate limit to all routes
app.use(generalLimiter);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// App routes
app.use('/auth', authRoutes);
app.use('/candidates', candidateRoutes);
app.use('/verify', verificationRoutes);
app.use('/verification', verificationRoutes); // Aligns with the frontend store path `/api/verification/...`
app.use('/reports', reportRoutes);

// Global Error Handler
app.use(errorHandler);

// Only start the server if we're not running in a serverless environment
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(config.port, () => {
    console.log(`[SERVER] VShield API running on port ${config.port} in ${config.nodeEnv} mode`);
  });
}

export default app;
