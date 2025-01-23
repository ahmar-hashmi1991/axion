const mongoose = require('mongoose');

// School Schema
const schoolSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

// Classroom Schema
const classroomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    resources: { type: [String], default: [] },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
}, { timestamps: true });

// Student Schema
const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    enrolledClassroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
}, { timestamps: true });


const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true, // Ensures userId is unique
    },
    role: {
        type: String,
        enum: ['superAdmin', 'schoolAdmin'], // Define allowed roles
        required: true,
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School', // References the School model
        required: function () {
            return this.role === 'schoolAdmin'; // Only required for school_admin
        },
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre('save', function (next) {
    this.updatedAt = Date.now(); // Automatically update the `updatedAt` field
    next();
});

//userSchema.index({ userId: 1 }); // Index for faster lookups on userId
//userSchema.index({ role: 1 });  // Index for role-based queries


const models = {
    School: mongoose.model('School', schoolSchema),
    Classroom: mongoose.model('Classroom', classroomSchema),
    Student: mongoose.model('Student', studentSchema),
    User: mongoose.model('User', userSchema)
};

module.exports = models;
