const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi')


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
})

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
}

const User = mongoose.model('User', userSchema)

const validateUser = (user) => {
  const schema = {
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required()
  }
  return Joi.validate(user, schema)
}

exports.User = User
exports.validate = validateUser