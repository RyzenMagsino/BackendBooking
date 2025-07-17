const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookingsByUser,
  deleteBooking
} = require('../controllers/bookingController');

router.post('/bookings', createBooking);
router.get('/bookings/:userId', getBookingsByUser);
router.delete('/bookings/:id', deleteBooking);
router.get('/bookings/:userId', getBookingsByUser);

module.exports = router;
