const router = require('express').Router()
const verify = require('../controller/verifyToken')
const {insert} = require('../controller/messageController')

//insert
router.post('/send',verify,(req,res)=>{
    insert(req,res)
})


module.exports = router