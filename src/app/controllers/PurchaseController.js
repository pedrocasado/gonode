const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
    async store (req, res) {
        const { ad, content } = req.body

        // author - owner of Ad
        const purchaseAd = await Ad.find(
            {
                _id: ad,
                purchasedBy: null
            },
            {
                limit: 1
            }
        ).populate('author')

        if (purchaseAd.length == 0) {
            return res.json({ error: 'Produto não existe ou já foi vendido' })
        }

        // logged user
        const user = await User.findById(req.userId)

        Queue.create(PurchaseMail.key, {
            ad: purchaseAd,
            user,
            content
        }).save()

        const purchase = await Purchase.create({
            ad: purchaseAd[0],
            user: user
        })

        return res.json(purchase)
    }

    async accept (req, res) {
        const purchase = await Purchase.findById(
            req.params.purchaseId
        ).populate({
            path: 'ad'
        })

        if (!purchase) {
            return res.json({ error: 'Ad inválido.' })
        }

        if (!purchase.ad.author._id.equals(req.userId)) {
            return res.status(401).json({ error: "You're not the ad author" })
        }

        if (purchase.ad.purchasedBy) {
            return res
                .status(400)
                .json({ error: 'This ad had already been purchased' })
        }

        const ad = await Ad.findByIdAndUpdate(
            purchase.ad,
            {
                purchasedBy: purchase._id
            },
            {
                new: true // auto updates ad const within new values
            }
        )

        // shorter way
        // purchase.ad.purchasedBy = purchase._id
        // await ad.save()

        return res.json(ad)
    }

    async index (req, res) {
        const purchases = await Purchase.find()

        return res.json(purchases)
    }
}

module.exports = new PurchaseController()
