const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');

// Signup route
router.post('/signup', register);

module.exports = router;
