require('dotenv').config(); // ✅ Load environment variables

const mongoose = require('mongoose');
const app = require('./app');

// Set Mongoose strictQuery to suppress deprecation warning
mongoose.set('strictQuery', true);

const PORT = process.env.PORT || 5000;

// Optional: log URI for debugging (do NOT log in production)
console.log('\n🔍 MONGO_URI:', process.env.MONGO_URI);

// Validate MONGO_URI
if (!process.env.MONGO_URI) {
  console.error('❌ Error: MONGO_URI is not defined in environment variables');
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
