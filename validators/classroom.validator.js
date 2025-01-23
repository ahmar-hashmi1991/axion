const Joi = require('joi');

const validateClassroomData = (req, res, next) => {
    const schema = Joi.object({
        capacity: Joi.number().integer().min(1).required(),
        resources: Joi.array().items(Joi.string()).optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

module.exports = { validateClassroomData };
