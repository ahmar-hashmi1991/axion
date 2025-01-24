const jwt = require('jsonwebtoken');

// Authentication Middleware
const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// Role-Based Access Control Middleware
const authorizeSuperAdmin = (req, res, next) => {
    if (req.user.role !== 'superAdmin') return res.status(403).json({ message: 'Access denied.' });

    next();
};

const authorizeSchoolAdmin = (req, res, next) => {
    if (req.user.role !== 'schoolAdmin') return res.status(403).json({ message: 'Access denied.' });

    if (req.user.schoolId !== req.params.schoolId) {
        return res.status(403).json({ message: 'Access restricted to assigned school.' });
    }

    next();
};


module.exports = { authenticate, authorizeSuperAdmin, authorizeSchoolAdmin };
