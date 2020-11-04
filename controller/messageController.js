const Message = require('../model/message')

const insertMessage = async (req,res)=>{
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

module.exports.insertMessage = insertMessage

const updateMessage = async (req,res)=>{
    Message.findByIdAndUpdate( req.params.id, { $set:
        {
            phoneNumber : req.body.phoneNumber,
            message     : req.body.message   
        }}).then(response=>{ 
            if (response != null) {     
                res.send('update success!')
            }
        }).catch(err=>{
            if(err){
                res.status(400).send('update fail')
            }
        })
}

module.exports.updateMessage = updateMessage

const getMessage = async (req,res)=>{

    try {
        const data = await Message.find({_idSender:req.user._id},{__v:0})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports.getMessage = getMessage

const deleteMessage = async (req,res)=>{

        Message.findByIdAndDelete(req.params.id).then(response=>{ 
            if (response != null) {     
                res.send('delete success!')
            } else {
                res.send('delete fail!')
            }
        }).catch(err=>{
            res.send({err})
        })
  
}

module.exports.deleteMessage = deleteMessage