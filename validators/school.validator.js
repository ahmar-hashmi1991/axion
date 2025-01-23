const Joi = require('joi');

const validateSchoolProfile = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).optional(),
        address: Joi.string().min(5).optional(),
        contact: Joi.string().regex(/^[0-9-]+$/).optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

module.exports = { validateSchoolProfile };
