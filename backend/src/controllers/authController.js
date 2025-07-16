const User = require('../models/User');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

// Signup
const register = async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;

        if (!username || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const user = new User({
            name: username,  // default name = username
            username,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// Login with validation
const login = [
  // Validation rules
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required'),

  body('password')
    .trim()
    .notEmpty().withMessage('Password is required'),

  // Your existing login logic
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array().map(err => err.msg) 
      });
    }

    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({ 
          success: false,
          message: 'Invalid username or password' 
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ 
          success: false,
          message: 'Invalid username or password' 
        });
      }

      res.status(200).json({
        success: true,
        message: 'Login successful',
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
        }
      });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ 
        success: false,
        message: 'Server error during login' 
      });
    }
  }
];

module.exports = { register, login };
