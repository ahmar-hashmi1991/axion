const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../config/index.config.js');
const userManager = require('../entities/models/User.manager');
const router = express.Router();

// Token generation endpoint
router.post('/auth/token', async (req, res) => {
    const { userId, role, schoolId } = req.body;

    if (!userId || !role) {
        return res.status(400).json({ message: 'userId and role are required.' });
    }

    if (role === 'schoolAdmin' && !schoolId) {
        return res.status(400).json({ message: 'schoolId is required for schoolAdmin role.' });
    }

    try {
        const tokenPayload = { id: userId, role };
        if (role === 'schoolAdmin') {
            tokenPayload.schoolId = schoolId;
        }

        const token = jwt.sign(
            tokenPayload, // Payload with user details
            config.dotEnv.JWT_SECRET, // Secret key from environment variables
            { expiresIn: '1h' } // Token validity of 1 hour
        );

        // Store token, userId, role, and schoolId in the User table
        const updateData = { role, token };
        if (role === 'schoolAdmin') {
            updateData.schoolId = schoolId;
        }

        const result = await userManager.updateUser(userId, updateData);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error generating token', error: error.message });
    }
});

module.exports = router;
