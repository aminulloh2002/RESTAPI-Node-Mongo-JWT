//validation
const Joi = require('@hapi/joi');

//register validation
const registerValidation = (data) =>{
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().required()
    })
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation

//login validation
const loginValidation = (data) =>{
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().required()
    })
    return schema.validate(data)
}

module.exports.loginValidation = loginValidation