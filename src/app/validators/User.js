const Joi = require('joi')

module.exports = {
    // query: {

    // },
    body: {
        name: Joi.string().required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .required()
            .min(6)
    }
}
