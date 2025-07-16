const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Signup
router.post('/signup', register);

// Login
router.post('/login', login);

module.exports = router;
