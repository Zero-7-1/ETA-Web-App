const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const cors = require('cors');

// env variables from config.env 
dotenv.config({ path: './config/config.env' });

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(morgan('dev')); // Logging middleware

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// CORS middleware to allow requests from localhost:5173
app.use(cors({
  origin: 'http://localhost:5173', // frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // necessary methods
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}));

// Routes
app.use('/api/v1/transactions', require('./routes/transactions'));

// Server settings
const PORT = process.env.PORT || 5001;

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});
