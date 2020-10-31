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

const getMessage = async (req,res)=>{

    try {
        const doc = await Message.find({},{__v:0})
        res.status(200).send(doc)
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports.getMessage = getMessage

const deleteMessage = async (req,res)=>{

    // try {
        Message.findByIdAndDelete(req.params.id).then(response=>{ 
            if (response != null) {     
                res.send('delete success!')
            } else {
                res.send('delete fail!')
            }
        }).catch(err=>{
            res.send({err})
        })
    // } catch (error) {
    //     res.status(400).send(error)
    // }
}

module.exports.deleteMessage = deleteMessage