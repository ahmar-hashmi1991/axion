const { User } = require('./Models.manager');

module.exports = {

    async updateUser(userId, updateData) {
        // Store token, userId, and role in the User table
        await User.findOneAndUpdate(
            { userId },
            updateData,
            { upsert: true, new: true } // Insert if not exists, otherwise update
        );
    }

};