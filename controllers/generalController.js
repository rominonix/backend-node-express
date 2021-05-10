const User = require('../models/User')
const { InvalidBody } = require('../errors/index')

module.exports = {
    async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email || !password) { throw new InvalidBody() }
            const token = await User.authenticate(email, password)
            res.json({ token, email })
        } catch (error) { next(error) }
    },

    async me(req, res, next) {
        const email = res.user.email
        const user = await User.findOne({ where: { email } })
        const name = user.name  
        res.json({ "email": email, "name": name})
    },  

    async update( req, res, next){
        const email = res.user.email
        try {
            const { newPassword } = req.body
            if(!email || !newPassword) {
                throw new InvalidBody()
            }
            const newProfile = await User.updateProfile(email, newPassword)
            res.json({newProfile, msn: "Your profile was updated successfully"})
        } catch(error) {next(error)}   
    }
}