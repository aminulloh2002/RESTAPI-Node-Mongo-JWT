const User = require('../model/user')
const {registerValidation, loginValidation} = require('../validation/validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    const hashedpassword = await bcrypt.hash(req.body.password,salt);

    //prepare for insert into database
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedpassword
    })
    //try to insert it
    try {
        const insertuser = await user.save()
        if(insertuser) return res.status(201).send({user_id:user._id,message:'register success'})
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

    //create and assign jwt
    const token = jwt.sign({_id: user._id,name:user.name}, process.env.JWT_SECRET,{ expiresIn: '1h' })
    res.header('token',token).send(token)
}

module.exports.login = login