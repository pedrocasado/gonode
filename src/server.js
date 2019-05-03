require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')
const validate = require('express-validation')
const Youch = require('youch')
const Sentry = require('@sentry/node')

class App {
    constructor () {
        this.express = express()
        this.isDev = process.env.NODE_ENV !== 'production'

        this.sentry()
        this.database()
        this.middlewares()
        this.routes()
        this.exception() // after routes always
    }

    sentry () {
        Sentry.init({
            dsn: process.env.SENTRY_DSN
        })
    }
    database () {
        mongoose.connect(databaseConfig.uri, {
            useCreateIndex: true,
            useNewUrlParser: true
        })
    }

    middlewares () {
        this.express.use(express.json())
        this.express.use(Sentry.Handlers.requestHandler())
    }

    routes () {
        this.express.use(require('./routes.js'))
    }

    exception () {
        if (process.env.NODE_ENV == 'production') {
            this.express.use(Sentry.Handlers.errorHandler())
        }

        // 4 parameters means error handling
        this.express.use(async (err, req, res, next) => {
            if (err instanceof validate.ValidationError) {
                return res.status(err.status).json(err)
            }

            if (process.env.NODE_ENV != 'production') {
                const youch = new Youch(err, req)

                // return res.send(await youch.toHTML())
                return res.json(await youch.toJSON())
            }

            return res
                .status(err.status || 500)
                .json({ error: 'Internal error' })
        })
    }
}

module.exports = new App().express