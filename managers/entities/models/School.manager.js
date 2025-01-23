const { School } = require('./Models.manager');

module.exports = {
    async createSchool(data, createdBy) {
        const school = new School({ ...data, createdBy });
        return await school.save();
    },

    async getAllSchools() {
        return await School.find();
    },

    async getSchoolById(id) {
        return await School.findById(id);
    },

    async updateSchoolProfile(id, data) {
        return await School.findByIdAndUpdate(id, data, { new: true });
    },

    async deleteSchool(id) {
        return await School.findByIdAndDelete(id);
    },
};
