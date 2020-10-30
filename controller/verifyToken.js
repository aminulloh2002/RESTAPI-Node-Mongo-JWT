const jwt = require('jsonwebtoken')

module.exports = function (req,res,next) {
    const token = req.header('token')
    if(!token) return res.status(401).send('access denied')

    try {
        const verified = jwt.verify(token,process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.status(401).send('invalid token')
    }
}
