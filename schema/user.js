const Joi = require('@hapi/joi');
module.exports = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required().min(6).email(),
    password: Joi.string().required().min(6),
});