const Mail = require('../services/Mail')

class PurchaseMail {
    // allow PuchaseMail.key
    get key () {
        return 'PurchaseMail'
    }

    async handle (job, done) {
        const { ad, user, content } = job.data

        await Mail.sendMail({
            from: '"Pedro Hull" <pedro@pedro.com>',
            to: ad.author.email,
            subject: `Solicitação de compra: ${ad.title}`,
            template: 'purchase',
            context: {
                user,
                content,
                ad: ad
            }
        })

        return done()
    }
}

module.exports = new PurchaseMail()
