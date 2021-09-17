const Joi = require('joi');

const schema = Joi.object({
    firstName: Joi.string().alphanum().required(),
    lastName: Joi.string().alphanum().required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().min(8),
    password2: Joi.ref('password'),
    email: Joi.string()
        .email().required()
})

module.exports = schema;