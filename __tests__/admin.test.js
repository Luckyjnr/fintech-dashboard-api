const request = require('supertest');
     const app = require('../app');
     const User = require('../models/User');
     const jwt = require('jsonwebtoken');

     describe('Admin Only Route', () => {
       let userToken, adminToken;

       beforeEach(async () => {
         const user = await User.create({
           username: 'normaluser',
           password: '$2a$10$exampleHash',
           role: 'user',
         });
         const admin = await User.create({
           username: 'adminuser',
           password: '$2a$10$exampleHash',
           role: 'admin',
         });
         userToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
         adminToken = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET);
       }, 15000);

       it('should allow admin to access route', async () => {
         const res = await request(app)
           .get('/api/admin') // Verify correct route
           .set('Authorization', `Bearer ${adminToken}`);
         expect(res.statusCode).toEqual(200);
       });

       it('should block regular user from accessing route', async () => {
         const res = await request(app)
           .get('/api/admin')
           .set('Authorization', `Bearer ${userToken}`);
         expect(res.statusCode).toEqual(403);
       });
     });