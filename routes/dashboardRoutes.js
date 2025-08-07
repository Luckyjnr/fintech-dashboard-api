const express = require('express');
   const router = express.Router();
   const { protect } = require('../middleware/authMiddleware');
   const Transaction = require('../models/Transaction');

   router.get('/dashboard', protect, async (req, res) => {
     try {
       const transactionCount = await Transaction.countDocuments({ user: req.user._id });
       res.status(200).json({
         message: 'Dashboard data retrieved',
         transactionCount,
         user: {
           username: req.user.username,
           role: req.user.role
         }
       });
     } catch (error) {
       res.status(500).json({ error: 'Server error' });
     }
   });

   module.exports = router;