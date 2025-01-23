const { Classroom } = require('./Models.manager');

module.exports = {
    async createClassroom(data, schoolId) {
        const classroom = new Classroom({ ...data, school: schoolId });
        return await classroom.save();
    },

    async updateCapacityAndResources(id, data) {
        return await Classroom.findByIdAndUpdate(id, data, { new: true });
    },

    async getClassroomById(id) {
        return await Classroom.findById(id).populate('school');
    },
};
