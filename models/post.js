const mongoose = require('mongoose')
const Joi = require('joi')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5
  },
  content: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: false
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const Post = mongoose.model('Post', postSchema)

const validatePost = (post) => {
  const schema = {
    title: Joi.string().min(5).required(),
    content: Joi.string().required(),
    tags: Joi.array(),
    author: Joi.object().required()
  }
  return Joi.validate(post, schema)
}

exports.Post = Post
exports.postSchema = postSchema
exports.validate = validatePost