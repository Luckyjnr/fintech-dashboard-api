const request = require('supertest');
   const app = require('../app');
   const User = require('../models/User');

   describe('Auth Routes', () => {
     beforeEach(async () => {
       await User.create({
         username: 'authuser',
         password: '$2a$10$exampleHash', // Pre-hashed password (use bcrypt.hashSync('123456', 10) if needed)
         role: 'user',
       });
     }, 15000);

     it('should login successfully with valid credentials', async () => {
       const res = await request(app)
         .post('/api/auth/login')
         .send({ username: 'authuser', password: '123456' });
       expect(res.statusCode).toEqual(200);
       expect(res.body).toHaveProperty('token');
     });

     it('should fail login with invalid credentials', async () => {
       const res = await request(app)
         .post('/api/auth/login')
         .send({ username: 'authuser', password: 'wrongpass' });
       expect(res.statusCode).toEqual(401); // Ensure controller returns 401
     });
   });