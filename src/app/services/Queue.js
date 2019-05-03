const kue = require('kue')

const redisConfig = require('../../config/redis')
const jobs = require('../jobs')
const Queue = kue.createQueue({ redis: redisConfig })
const Sentry = require('@sentry/node')

/**
 * Process jobs with specified key (eg. PurchaseMail) by using the following method (PurchaseMail.handle)
 */
Queue.process(jobs.PurchaseMail.key, jobs.PurchaseMail.handle)

// error handling
Queue.on('error', Sentry.captureException)

module.exports = Queue
