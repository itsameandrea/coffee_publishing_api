const express = require('express')
const router = express.Router()

const postsRoutes = require('./posts')
const userRoutes = require('./users')
const authRoutes = require('./auth'
)
router.use('/api/v1/posts', postsRoutes)
router.use('/api/v1/users', userRoutes)
router.use('/api/v1/auth', authRoutes)

module.exports = router