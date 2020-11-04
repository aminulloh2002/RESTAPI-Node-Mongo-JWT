const router = require('express').Router()
const {verify} = require('../controller/tokenController')
const {insertMessage,getMessage,deleteMessage,updateMessage} = require('../controller/messageController')

//insertMessage
router.post('/send',verify,(req,res)=>{
    insertMessage(req,res)
})

router.get('/',verify,(req,res)=>{
    getMessage(req,res)
})

router.put('/update/:id',verify,(req,res)=>{
    updateMessage(req,res)
})

router.delete('/delete/:id',verify,(req,res)=>{
    deleteMessage(req,res)
})

module.exports = router