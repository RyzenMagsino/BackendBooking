// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// FIXED: just '/test' (NOT '/api/test')
router.get('/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

module.exports = router;
