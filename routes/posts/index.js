const { Post, validate } = require('../../models/post')
const { User } = require('../../models/user')
const authMiddleware = require('../../middlewares/auth')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  const posts = await Post.find()
  res.send(posts)
})

router.post('/', authMiddleware, async (req, res, next) => {
  const user = await User.findById(req.user._id).select('-password')
  const postData = {
    ...req.body,
    author: user
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