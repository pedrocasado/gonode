const express = require('express')
const validate = require('express-validation')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const controllers = require('./app/controllers')
const validators = require('./app/validators')
const handle = require('express-async-handler')

/**
 * Middleware validators
 */
routes.post(
    '/users',
    validate(validators.User),
    handle(controllers.UserController.store)
)
routes.post(
    '/sessions',
    validate(validators.Session),
    handle(controllers.SessionController.store)
)

routes.use(authMiddleware)
// every routes below this line will need authentication
// because the use of authMiddleware

/**
 * Ads
 */
routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post(
    '/ads',
    validate(validators.Ad),
    handle(controllers.AdController.store)
)
routes.put(
    '/ads/:id',
    validate(validators.Ad),
    handle(controllers.AdController.update)
)
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

/**
 * Purchase
 */
routes.post(
    '/purchase',
    validate(validators.Purchase),
    handle(controllers.PurchaseController.store)
)

routes.post(
    '/purchase/:purchaseId/accept',
    validate(validators.PurchaseAccept),
    handle(controllers.PurchaseController.accept)
)

routes.get('/purchases', handle(controllers.PurchaseController.index))

module.exports = routes
