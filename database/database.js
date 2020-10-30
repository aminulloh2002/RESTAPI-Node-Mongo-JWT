const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()

//mongoose opt
mongoose.set('useUnifiedTopology', true)
// mongoose.set('useCreateIndex', true)
//connect to db
module.exports = mongoose.connect(process.env.DB_CONNECT,
        {useNewUrlParser: true}).then( response => {
            console.log('Database Connected!')
        }).catch(error =>{
    console.log('Database '+error.message)
  })