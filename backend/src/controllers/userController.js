const User = require('../models/User');
const bcrypt = require('bcrypt');

// Register user
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered', userId: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

// Add other methods (getUserProfile, updateUserProfile, deleteUser)...