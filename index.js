const express = require('express')
const app = express()
require('./database/database')
const authRoute = require('./routes/routes')
const test = require('./routes/test')

//Middleware
app.use(express.json())

//routemiddleware (prefix)
app.use('/api/user',authRoute)
app.use('/api/test',test)

app.listen(3000,() => console.log('server running on port 3000'))
