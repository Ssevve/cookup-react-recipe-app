const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = connectDB;
