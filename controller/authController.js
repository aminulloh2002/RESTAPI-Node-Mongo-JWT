const User = require('../model/user')
const {registerValidation, loginValidation} = require('../validation/authValidation')
const bcrypt = require('bcryptjs')
const {generateToken} = require('./tokenController')

//registration
const register = async(req,res)=>{
    //validate
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    //checking if the email already in database
    const emailExist = await User.findOne({email:req.body.email})
    if(emailExist) return res.status(400).send('Email already exist')

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(req.body.password,salt)

    //prepare for insert into database
    const insertUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedpassword
    })
    //try to insert it
    try {
        const user = await insertUser.save()
        res.status(201).send({message:'register success!',token:generateToken(user)})
    } catch (error) {
        if(error.code == 11000){
        res.status(400).send('email already registered')
        }
    }
}

module.exports.register = register

//login
const login = async(req,res)=>{
    //validate
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //checking if the email already in database
    const user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('Email not found!')
    // check password
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.status(400).send('Invalid email or password')
    res.status(200).send({message:'auth success!',token:generateToken(user)})
}

module.exports.login = login