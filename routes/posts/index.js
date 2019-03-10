const { Post, validate } = require('../../models/post')
const { User } = require('../../models/user')
const authMiddleware = require('../../middlewares/auth')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  const posts = await Post.find().populate('author', 'email')
  res.send(posts)
})

router.post('/', authMiddleware, async (req, res, next) => {
  const postData = {
    ...req.body,
    author: req.user._id
  }

  const { error } = validate(postData)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  let post = new Post(postData)
  post = await post.save()

  res.send(post) 
})

module.exports = router