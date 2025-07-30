const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const jwt = require('jsonwebtoken');

describe('Transaction Route', () => {
  let token;
  let user;

  beforeEach(async () => {
    user = await User.create({ username: 'transuser', password: '123456' });
    token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  });

  it('should perform credit transaction', async () => {
    const res = await request(app)
      .post('/api/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({ type: 'credit', amount: 5000 });

    expect(res.statusCode).toBe(201);
    expect(res.body.transaction).toHaveProperty('balanceAfter');
  });

  it('should fail transaction with missing amount', async () => {
    const res = await request(app)
      .post('/api/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({ type: 'debit' });

    expect(res.statusCode).toBe(400);
  });
});
