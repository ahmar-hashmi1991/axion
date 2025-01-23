const express = require('express');
const { authenticate, authorizeSchoolAdmin } = require('../../mws/Middleware.manager');
const classroomManager = require('../entities/models/Classroom.manager');
const { validateClassroomData } = require('../../validators/classroom.validator');

const router = express.Router();

// Create a classroom (School Admin only)
router.post('/schools/:schoolId/classrooms', authenticate, authorizeSchoolAdmin, async (req, res) => {
    try {
        const result = await classroomManager.createClassroom(req.body, req.params.schoolId);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error creating classroom', error: err.message });
    }
});

// Update classroom capacity/resources (School Admin only)
router.patch('/schools/:schoolId/classrooms/:id/resources', authenticate, authorizeSchoolAdmin, validateClassroomData, async (req, res) => {
    try {
        const result = await classroomManager.updateCapacityAndResources(req.params.id, req.body);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error updating classroom resources', error: err.message });
    }
});

// Get a particular school by id (Superadmin only)
router.get('/schools/:schoolId/classrooms/:id', authenticate, authorizeSchoolAdmin, async (req, res) => {
    try {
        const result = await classroomManager.getClassroomById(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching classroom', error: err.message });
    }
});

module.exports = router;
