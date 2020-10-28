const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoute = require('./routes/routes')
const test = require('./routes/test')

dotenv.config()

//mongoose opt
mongoose.set('useUnifiedTopology', true)
// mongoose.set('useCreateIndex', true)
//connect to db
mongoose.connect(process.env.DB_CONNECT,
        {useNewUrlParser: true}).then( response => {
            console.log('Database Connected!')
        }).catch(error =>{
    console.log('Database '+error.message)
  })

//Middleware
app.use(express.json())

//routemiddleware (prefix)
app.use('/api/user',authRoute)
app.use('/api/test',test)

app.listen(3000,() => console.log('server running on port 3000'))
