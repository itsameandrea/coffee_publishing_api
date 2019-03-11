const { User, validate } = require('../../models/user')
const authMiddleware = require('../../middlewares/auth')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user._id).populate('posts', 'title').select('-password')
  res.send(user)
})

router.post('/', async (req, res) => {

  const { error } = validate(req.body)
  
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  let user = await User.findOne({ email: req.body.email })

  if (user) {
    return res.status(400).send('There is already a user registered with this email')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  user = new User({
    ...req.body,
    password: hashedPassword
  })

  user = await user.save()
  const token = user.generateAuthToken()

  res
    .header({
      'x-auth-token': token
    })
    .send({
      name: user.name,
      email: user.email,
      id: user._id 
    })
})

module.exports = router