const express = require('express')
const app = express()
require('./database/database')
const authRoute = require('./routes/authRoutes')
const test = require('./routes/test')
const message = require('./routes/messageRoutes');

//Middleware
app.use(express.json())

//routemiddleware (prefix)
app.use('/api/user',authRoute)
app.use('/api/test',test)
app.use('/api/message',message)

app.listen(3000,() => console.log('server running on port 3000'))
