const Joi = require('joi')

module.exports = {
    // query: {

    // },
    body: {
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string().required()
    }
}
