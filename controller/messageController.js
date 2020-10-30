const Message = require('../model/message')

const insert = async (req,res)=>{
    const message = new Message({
      _idSender   : req.user._id,
      phoneNumber : req.body.phoneNumber,
      message     : req.body.message       
    })
   
    try {
        const insertMessage = await message.save()
        if(insertMessage) return res.status(201).send({message:'message sent!'})
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports.insert = insert