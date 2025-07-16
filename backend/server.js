const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');  // Importing the authRoutes
const bookingRoutes = require('./routes/bookingRoutes');  // Import the bookingRoutes

dotenv.config();

const app = express();

app.use(express.json());

// Use the authRoutes for routes starting with '/api'
app.use('/api/auth', authRoutes);  // Mounting the auth routes
app.use('/api/bookings', bookingRoutes);  // Mounting the booking routes

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error'
  });

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/';

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.log('Error connecting to MongoDB:', err));

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
