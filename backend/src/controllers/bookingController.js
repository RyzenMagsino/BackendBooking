const Booking = require('../models/Booking');

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json({ message: 'Booking created', booking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all bookings for a user
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }); // Assume auth middleware adds req.user
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add other methods (getBookingById, updateBooking, cancelBooking)...