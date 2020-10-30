const router = require('express').Router()
const {register,login} = require('../controller/authController')

//register
router.post('/register', (req,res)=>{
    register(req,res)
})
//login
router.post('/login', (req,res)=>{
    login(req,res)
})

module.exports = router