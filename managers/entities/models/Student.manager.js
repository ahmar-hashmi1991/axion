const { Student } = require('./Models.manager');

module.exports = {
    async createStudent(data, schoolId) {
        const student = new Student({ ...data, school: schoolId });
        return await student.save();
    },

    async getStudentProfile(studentId) {
        return await Student.findById(studentId).populate(['school', 'enrolledClassroom']);
    },

    async updateStudentProfile(studentId, data) {
        return await Student.findByIdAndUpdate(studentId, data, { new: true });
    },

    async transferStudent(studentId, newClassroomId) {
        return await Student.findByIdAndUpdate(studentId, { enrolledClassroom: newClassroomId }, { new: true });
    },
};
