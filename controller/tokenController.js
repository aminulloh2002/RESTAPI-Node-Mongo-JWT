const jwt = require('jsonwebtoken')

const generateToken = function (user) {
        //create and assign jwt
        const accessToken = jwt.sign({_id: user._id,name:user.name}, process.env.JWT_SECRET,{ expiresIn: '15m' })
        const refreshToken = jwt.sign({_id: user._id,name:user.name}, process.env.JWT_REFRESH_SECRET,{ expiresIn: '14d' })
        return ([{'access-token':accessToken,validity:'15 minutes'},{'refresh-token':refreshToken,validity:'14 days'}])
}

module.exports.generateToken = generateToken

const verify = function (req,res,next) {
    const token = req.header('access-token')
    if(!token) return res.status(401).send('access denied')

    try {
        const verified = jwt.verify(token,process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.status(401).send('invalid token')
    }
}

module.exports.verify = verify

const refresh = function (req,res,next) {
    const refresh = req.header('refresh-token')
    if (refresh == null) return res.status(401).send('access denied')
    jwt.verify(refresh,process.env.JWT_REFRESH_SECRET,(err,user)=>{
        if (err) return res.status(403).send('access denied')
        const accessToken = jwt.sign({_id: user._id,name:user.name}, process.env.JWT_SECRET,{ expiresIn: '15m' })
       res.status(200).send(accessToken)
    })
}

module.exports.refresh = refresh