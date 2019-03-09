require('dotenv').config()
require('express-async-errors')

const winston = require('winston')
const express = require('express')
const dbDebug = require('debug')('app:db')
const startupDebug = require('debug')('app:startup')
const errorMiddleware = require('./middlewares/error')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()
winston.add(new winston.transports.File({ filename: 'logfile.log' }))

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/', routes)

app.use(errorMiddleware)

mongoose.connect('mongodb://localhost/coffeepublishing')
  .then(() => dbDebug('Connected to Mongo'))
  .catch((err) => dbDebug(err))

const port = process.env.PORT || 8000
app.listen(port, () => {
  startupDebug(`Listening on ${port}`)
})