const express = require('express');
const Booking = require('../models/booking');  // Assuming your models are in 'models/booking.js'
const router = express.Router();

// POST route to create a new booking
router.post('/bookings', async (req, res) => {
  try {
    const { carType, services, firstName, lastName, phone, plate, date, time, userId } = req.body;

    // Create a new booking document
    const newBooking = new Booking({
      carType,
      services,
      firstName,
      lastName,
      phone,
      plate,
      date,
      time,
      userId
    });

    // Save the booking to the database
    await newBooking.save();

    // Send response
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// GET route to retrieve all bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

module.exports = router;
