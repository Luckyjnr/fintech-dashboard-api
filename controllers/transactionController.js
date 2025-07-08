const Transaction = require('../models/Transaction');
const User = require('../models/User');

exports.makeTransaction = async (req, res) => {
  try {
    const userId = req.user._id;
    const { type, amount } = req.body;

    // Validate
    if (!['credit', 'debit'].includes(type)) {
      return res.status(400).json({ message: 'Invalid transaction type' });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be greater than zero' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check balance for debit
    if (type === 'debit' && user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Update balance
    const newBalance = type === 'credit'
      ? user.balance + amount
      : user.balance - amount;

    user.balance = newBalance;
    await user.save();

    // Log transaction
    const transaction = await Transaction.create({
      user: user._id,
      type,
      amount,
      balanceAfter: newBalance
    });

    res.status(201).json({
      message: `${type} transaction successful`,
      transaction
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
