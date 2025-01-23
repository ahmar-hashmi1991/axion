const express = require('express');
const { authenticate, authorizeSchoolAdmin } = require('../../mws/Middleware.manager');
const studentManager = require('../entities/models/Student.manager');
const { validateTransfer } = require('../../validators/student.validator');

const router = express.Router();

// Enroll a student (School Admin only)
router.post('/schools/:schoolId/students', authenticate, authorizeSchoolAdmin, async (req, res) => {
    try {
        const result = await studentManager.createStudent(req.body, req.params.schoolId);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error enrolling student', error: err.message });
    }
});

// Get a particular student (School Admin only)
router.get('/schools/:schoolId/students/:id', authenticate, authorizeSchoolAdmin, async (req, res) => {
    try {
        const result = await studentManager.getStudentProfile(req.params.id);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching student', error: err.message });
    }
});


// Update student profile (School Admin only)
router.patch('/schools/:schoolId/students/:id/profile', authenticate, authorizeSchoolAdmin, async (req, res) => {
    try {
        const result = await studentManager.updateStudentProfile(req.params.id, req.body);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error updating student profile', error: err.message });
    }
});


// Transfer a student (School Admin only)
router.patch('/schools/:schoolId/students/:id/transfer', authenticate, authorizeSchoolAdmin, validateTransfer, async (req, res) => {
    try {
        const result = await studentManager.transferStudent(req.params.id, req.body.newClassroomId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error transferring student', error: err.message });
    }
});


module.exports = router;
