const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    _idSender:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
        trim: true    
    },
    dateSent:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Message',messageSchema);