const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env variables from config.env file located in config folder
dotenv.config({ path: './config/config.env' });

const app = express();


// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(morgan('dev')); // Logging middleware
app.use('/api/v1/transactions', require('./routes/transactions'));

const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});


