const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const jwt = require('jsonwebtoken');

describe('Dashboard Route', () => {
  let token;

  beforeEach(async () => {
    const user = await User.create({ username: 'dashuser', password: '123456' });
    token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  });

  it('should access dashboard with valid token', async () => {
    const res = await request(app)
      .get('/api/dashboard')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('balance');
  });

  it('should block dashboard without token', async () => {
    const res = await request(app).get('/api/dashboard');
    expect(res.statusCode).toBe(401);
  });
});
