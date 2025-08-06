const mongoose = require('mongoose');
   const { MongoMemoryServer } = require('mongodb-memory-server');

   jest.setTimeout(20000); // Increase timeout to 20s

   let mongo;

   beforeAll(async () => {
     mongo = await MongoMemoryServer.create();
     const mongoUri = mongo.getUri();
     await mongoose.connect(mongoUri, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     });
   });

   beforeEach(async () => {
     await mongoose.connection.db.dropDatabase(); // Clear database before each test
   });

   afterAll(async () => {
     await mongoose.connection.close();
     await mongo.stop();
   });