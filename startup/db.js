const mongoose = require('mongoose')
const dbDebug = require('debug')('app:db')

module.exports = function () {
  mongoose.connect('mongodb://localhost/coffeepublishing')
    .then(() => dbDebug('Connected to Mongo'))
}


