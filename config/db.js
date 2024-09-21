const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env variables
dotenv.config({ path: './config/config.env' });

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error('MongoDB connection string is not defined');
}

async function connectDB() {
  try {
    // Connect to MongoDB Atlas using Mongoose
    await mongoose.connect(uri);
    console.log("Connected to MongoDB Atlas using Mongoose!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if there is a failure
  }
}

module.exports = connectDB;

