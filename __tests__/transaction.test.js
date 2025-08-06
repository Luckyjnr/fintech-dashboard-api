const request = require('supertest');
     const app = require('../app');
     const User = require('../models/User');
     const jwt = require('jsonwebtoken');

     describe('Transaction Route', () => {
       let token;

       beforeEach(async () => {
         const user = await User.create({
           username: 'transuser',
           password: '$2a$10$exampleHash',
           role: 'user',
         });
         token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
       }, 15000);

       it('should perform credit transaction', async () => {
         const res = await request(app)
           .post('/api/transactions')
           .set('Authorization', `Bearer ${token}`)
           .send({ type: 'credit', amount: 100 });
         expect(res.statusCode).toEqual(200);
       });

       it('should fail transaction with missing amount', async () => {
         const res = await request(app)
           .post('/api/transactions')
           .set('Authorization', `Bearer ${token}`)
           .send({ type: 'credit' });
         expect(res.statusCode).toEqual(400);
       });
     });