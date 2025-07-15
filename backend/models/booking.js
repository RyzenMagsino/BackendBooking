const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  carType: {
    type: String,
    required: true,
  },
  services: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true }
    }
  ],
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  plate: {
    type: String,
    required: true,
  },
  date: {
    type: String, // could also be Date if you use DateTime.parse()
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
