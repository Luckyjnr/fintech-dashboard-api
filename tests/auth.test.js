const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const jwt = require('jsonwebtoken');

describe('Auth Routes', () => {
  beforeEach(async () => {
    await User.create({ username: 'authuser', password: '123456' });
  });

  it('should login successfully with valid credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: 'authuser',
      password: '123456',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty('token');
  });

  it('should fail login with invalid credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: 'authuser',
      password: 'wrongpassword',
    });

    expect(res.statusCode).toBe(400);
  });
});
