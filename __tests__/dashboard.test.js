const request = require('supertest');
     const app = require('../app');
     const User = require('../models/User');
     const jwt = require('jsonwebtoken');

     describe('Dashboard Route', () => {
       let token;

       beforeEach(async () => {
         const user = await User.create({
           username: 'dashuser',
           password: '$2a$10$exampleHash',
           role: 'user',
         });
         token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
       }, 15000);

       it('should access dashboard with valid token', async () => {
         const res = await request(app)
           .get('/api/dashboard')
           .set('Authorization', `Bearer ${token}`);
         expect(res.statusCode).toEqual(200);
       });

       it('should block dashboard without token', async () => {
         const res = await request(app).get('/api/dashboard');
         expect(res.statusCode).toEqual(401);
       });
     });