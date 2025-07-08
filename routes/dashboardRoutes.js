const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getDashboard, getTransactions } = require('../controllers/dashboardController');

// Protected routes
router.get('/dashboard', protect, getDashboard);
router.get('/transactions', protect, getTransactions);

module.exports = router;
