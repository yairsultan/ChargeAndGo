require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', (error) => console.log('connected to Database'))

const order = require('./routes/order')
const user = require('./routes/user')
const station = require('./routes/station')
const home = require('./routes/home')
const req = require('express/lib/request')
const app = express()

app.use(express.json())

app.use('/order',order)
app.use('/user',user)
app.use('/station',station)
app.use('/', home)

app.listen(3000, () => console.log('Server Started'))