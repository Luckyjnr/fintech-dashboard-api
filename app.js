const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const { swaggerUi, swaggerSpec } = require('./swagger');

dotenv.config();

const app = express();

// Create uploads folder in /tmp for Render
const uploadsDir = path.join('/tmp', 'Uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads/ folder in /tmp');
}

// Security Middleware with CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'script-src': ["'self'", "'unsafe-inline'"],
        'script-src-attr': ["'unsafe-inline'"],
        'default-src': ["'self'"],
        'img-src': ["'self'", "data:", "https://*.onrender.com"],
        'media-src': ["'self'", "https://*.onrender.com"],
        'style-src': ["'self'", "'unsafe-inline'"],
      },
    },
  })
);

// CORS Configuration
const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:3000'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW || 15 * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX || 100,
});
app.use(limiter);

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/Uploads', express.static(path.join('/tmp', 'Uploads')));

// Health check route for Task 49A
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// API Routes
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const profileRoutes = require('./routes/profileRoutes');

app.use('/api/auth', authRoutes);
app.use('/api', dashboardRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/profile', profileRoutes);

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Default Route
app.get('/', (req, res) => {
  res.send('Fintech Dashboard API is running on Render...');
});

// Error Handler Middleware
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;