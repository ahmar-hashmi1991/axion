const express = require('express');
const { authenticate, authorizeSuperAdmin } = require('../../mws/Middleware.manager');
const schoolManager = require('../entities/models/School.manager');
const { validateSchoolProfile } = require('../../validators/school.validator');

const router = express.Router();

// Create a new school (Superadmin only)
router.post('/schools', authenticate, authorizeSuperAdmin, async (req, res) => {
    try {
        const result = await schoolManager.createSchool(req.body, req.user.id);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error creating school', error: err.message });
    }
});

// Get all schools (Superadmin only)
router.get('/schools', authenticate, authorizeSuperAdmin, async (req, res) => {
    try {
        const result = await schoolManager.getAllSchools();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching schools', error: err.message });
    }
});

// Get a particular school by id (Superadmin only)
router.get('/schools/:id', authenticate, authorizeSuperAdmin, async (req, res) => {
    try {
        const result = await schoolManager.getSchoolById(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching schools', error: err.message });
    }
});

// Update a school profile (Superadmin only)
router.patch('/schools/:id/profile', authenticate, authorizeSuperAdmin, validateSchoolProfile, async (req, res) => {
    try {
        const result = await schoolManager.updateSchoolProfile(req.params.id, req.body);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error updating school profile', error: err.message });
    }
});

// Delete a particular school by id (Superadmin only)
router.delete('/schools/:id', authenticate, authorizeSuperAdmin, async (req, res) => {
    try {
        const result = await schoolManager.deleteSchool(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching schools', error: err.message });
    }
});

module.exports = router;
