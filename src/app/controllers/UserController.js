const User = require('../models/User')

class UserController {
    async store (req, res) {
        const { email } = req.body

        if (await User.findOne({ email: email })) {
            return res.status(400).json({ error: 'User already in db.' }) // bad request
        }

        const user = await User.create(req.body)

        return res.json(user)
    }
}

module.exports = new UserController()
