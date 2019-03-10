const mongoose = require('mongoose')
const dbDebug = require('debug')('app:db')
const Fawn = require('fawn')

module.exports = function () {
  mongoose.connect('mongodb://localhost/coffeepublishing')
    .then(() => dbDebug('Connected to Mongo'))
  Fawn.init(mongoose)
}


