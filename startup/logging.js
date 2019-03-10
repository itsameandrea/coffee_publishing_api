require('express-async-errors')
const winston = require('winston')

module.exports = function () {
  winston.add(new winston.transports.File({ filename: 'logfile.log' }))

  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'exceptions.log' })
  )

  process.on('unhandledRejection', (error) => {
    throw(error)
  })
}