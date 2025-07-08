const Transaction = require('../models/Transaction');

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const transactions = await Transaction.find({ user: userId });

    let balance = 0;
    transactions.forEach((tx) => {
      balance += tx.type === 'credit' ? tx.amount : -tx.amount;
    });

    res.status(200).json({
      username: req.user.username,
      role: req.user.role,
      balance,
      totalTransactions: transactions.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load dashboard data' });
  }
};

// Get all user transactions sorted by newest
exports.getTransactions = async (req, res) => {
  try {
    const userId = req.user._id;

    const transactions = await Transaction.find({ user: userId })
      .sort({ createdAt: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
};
