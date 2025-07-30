const Transaction = require('../models/Transaction');

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log('Fetching dashboard for user:', userId); // Debug

    const transactions = await Transaction.find({ user: userId }).sort({ createdAt: -1 });
    console.log('Transactions found:', transactions.length); // Debug

    let balance = 0;
    transactions.forEach((tx) => {
      balance += tx.type === 'credit' ? tx.amount : -tx.amount;
    });

    res.status(200).json({
      username: req.user.username,
      role: req.user.role,
      balance,
      totalTransactions: transactions.length,
      profileImage: req.user.profileImage, // Include profile image
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Failed to load dashboard data' });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const userId = req.user._id;

    const transactions = await Transaction.find({ user: userId })
      .sort({ createdAt: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Transactions error:', error);
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
};