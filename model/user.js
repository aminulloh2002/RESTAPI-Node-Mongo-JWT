const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        // unique: true,
        trim: true    
    },
    password:{
        type: String,
        required: true,
        max: 1024,
        trim: true    
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User',userSchema);