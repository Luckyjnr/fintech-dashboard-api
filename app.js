const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Security Middleware
app.use(helmet()); // Secure HTTP headers
app.use(cors()); // Enable CORS
app.use(xss()); // Prevent XSS attacks
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.get('/', (req, res) => {
  res.send('Fintech Dashboard API is running...');
});

module.exports = app;
