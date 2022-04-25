require('dotenv').config()

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const order = require('./routes/order')
const user = require('./routes/user')
const station = require('./routes/station')
const admin = require('./routes/admin')
const db = mongoose.connection

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})

db.once('open', (error) => console.log('connected to Database'))

app.use(express.json())

app.use('/order',order)
app.use('/user',user)
app.use('/station',station)
app.use('/admin',admin)
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(3000, () => console.log('Server Started'))