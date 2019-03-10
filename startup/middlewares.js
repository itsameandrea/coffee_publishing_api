const express = require('express')
const errorMiddleware = require('../middlewares/error')
const morgan = require('morgan')
const cors = require('cors')

module.exports = function (app) {
  app.use(cors({
    exposedHeaders: ['x-auth-token']
  }))
  app.use(express.json())
  app.use(morgan('dev'))
  app.use(errorMiddleware)
}