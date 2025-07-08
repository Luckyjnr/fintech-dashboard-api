const express = require('express');
const router = express.Router();
const { makeTransaction } = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, makeTransaction);

module.exports = router;
