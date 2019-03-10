const express = require('express')
const startupDebug = require('debug')('app:startup')
const app = express()

require('./startup/db')()
require('./startup/logging')()
require('./startup/config')()
require('./startup/middlewares')(app)
require('./startup/routes')(app)


const port = process.env.PORT || 8000

app.listen(port, () => {
  startupDebug(`Listening on ${port}`)
})