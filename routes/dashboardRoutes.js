const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getDashboard, getTransactions } = require('../controllers/dashboardController');

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: User dashboard and transaction history
 */

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get user dashboard summary (balance and total transactions)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       500:
 *         description: Server error
 */
router.get('/dashboard', protect, getDashboard);

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions for the logged-in user
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions retrieved successfully
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       500:
 *         description: Server error
 */
router.get('/transactions', protect, getTransactions);

module.exports = router;
