const User = require('../models/User');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;

        // Check for missing fields
        if (!username || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Validate password strength (no special character required)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters and include uppercase, lowercase, and a number',
            });
        }

        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user
        const user = new User({
            name: username, // Default name is username
            username,
            password: hashedPassword,
        });

        await user.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Signup error:', err);
        return res.status(500).json({ message: 'Server error during registration' });
    }
};

module.exports = { register };



// Login
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error during login' });
    }
};

const changePassword = async (req, res) => {
    try {
        const { username, oldPassword, newPassword, confirmNewPassword } = req.body;

        // Basic Validation
        if (!username || !oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (typeof username !== 'string' || username.length < 3) {
            return res.status(400).json({ message: 'Username must be at least 3 characters' });
        }

        if (typeof newPassword !== 'string' || newPassword.length < 6) {
            return res.status(400).json({ message: 'New password must be at least 6 characters' });
        }

        // Strong Password: Require at least one uppercase and one number
        const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
        if (!strongPasswordRegex.test(newPassword)) {
            return res.status(400).json({ message: 'New password must contain at least one uppercase letter and one number' });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: 'New passwords do not match' });
        }

        // User Check
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 🔑 Old Password Check
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        // Update Password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;

        await user.save();
        res.status(200).json({ message: 'Password changed successfully' });

    } catch (err) {
        console.error('Change Password Error:', err);
        res.status(500).json({ message: 'Server error while changing password' });
    }
};

module.exports = { register, login, changePassword };
