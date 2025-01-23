const Joi = require('joi');

const validateTransfer = (req, res, next) => {
    const schema = Joi.object({
        newClassroomId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

module.exports = { validateTransfer };