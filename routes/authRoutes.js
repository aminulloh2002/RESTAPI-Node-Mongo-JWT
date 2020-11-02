const router = require('express').Router()
const {register,login} = require('../controller/authController')
const {refresh} = require('../controller/tokenController')
//register
router.post('/register', (req,res)=>{
    register(req,res)
})
//login
router.post('/login', (req,res)=>{
    login(req,res)
})
//refresh
router.post('/refresh',(req,res)=>{
    refresh(req,res)
})

module.exports = router