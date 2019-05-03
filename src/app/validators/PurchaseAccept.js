var Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
    params: {
        p: Joi.objectId()
    }
    // body: {
    //     p: Joi.objectId()
    // }
}
