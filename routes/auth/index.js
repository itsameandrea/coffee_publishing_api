const { User } = require('../../models/user')

const express = require('express')
const Joi = require('joi')
const router = express.Router()
const bcrypt = require('bcrypt')

router.post('/login', async (req, res) => {

  const { error } = validate(req.body)
  
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  let user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Invalid email or password')

  const validPassword  = await bcrypt.compare(req.body.password, user.password)
  if(!validPassword) return res.status(400).send('Invalid email or password')

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

const validate = (user) => {
  const schema = {
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required()
  }
  return Joi.validate(user, schema)
}

module.exports = router