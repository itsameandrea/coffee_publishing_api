const { Post, validate } = require('../../models/post')
const { User } = require('../../models/user')
const Fawn = require('fawn')
const mongoose = require('mongoose')
const authMiddleware = require('../../middlewares/auth')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  const posts = await Post.find().populate('author', 'email')
  res.send(posts)
})

router.post('/', authMiddleware, async (req, res) => {
  const postData = {
    ...req.body,
    author: { _id: req.user._id }
  }

  const { error } = validate(postData)

  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  let post = new Post(postData)
  const task = Fawn.Task()

  task
    .save('posts', post)
    .update('users', { _id: req.user._id }, { $push: { posts: post._id } })
    .run({ useMongoose: true })
    .then(() => res.send(post))
    .catch((err) => {
      throw err
    })

  
})

module.exports = router