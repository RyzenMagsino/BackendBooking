const express = require('express');
const router = express.Router();
const { register, login, changePassword } = require('../controllers/authController');

// Signup
router.post('/signup', register);

// Login
router.post('/login', login);

router.post('/change-password', changePassword);

module.exports = router;
