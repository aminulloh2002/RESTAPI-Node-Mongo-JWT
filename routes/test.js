const router = require('express').Router()
const {verify} = require('../controller/tokenController')
const User = require('../model/user')

router.get('/',verify,async(req,res)=>{
    //res.send(req.user)
    let datauser = await User.findOne({_id:req.user._id})
    res.send(datauser)
})

module.exports = router