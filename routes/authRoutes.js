// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Sample route for testing
router.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

module.exports = router;
