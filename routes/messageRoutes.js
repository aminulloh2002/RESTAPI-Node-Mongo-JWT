const router = require('express').Router()
const {verify} = require('../controller/tokenController')
const {insert,getMessage,deleteMessage} = require('../controller/messageController')

//insert
router.post('/send',verify,(req,res)=>{
    insert(req,res)
})

router.get('/',verify,(req,res)=>{
    getMessage(req,res)
})

router.delete('/delete/:id',verify,(req,res)=>{
    deleteMessage(req,res)
})

module.exports = router