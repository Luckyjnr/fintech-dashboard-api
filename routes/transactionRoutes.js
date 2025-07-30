const express = require('express');
const router = express.Router();
const { makeTransaction } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Endpoints related to user transactions
 */

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a credit or debit transaction for the logged-in user
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - amount
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [credit, debit]
 *                 description: Type of the transaction
 *               amount:
 *                 type: number
 *                 minimum: 1
 *                 description: Amount to credit or debit
 *               description:
 *                 type: string
 *                 description: Optional transaction note or reason
 *     responses:
 *       201:
 *         description: Transaction processed successfully
 *       400:
 *         description: Invalid input or insufficient balance
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       500:
 *         description: Server error
 */
router.post('/', protect, makeTransaction);

module.exports = router;
