const Joi = require('joi')

module.exports = {
    // query: {

    // },
    body: {
        ad: Joi.string().required(),
        content: Joi.string().required()
    }
}
