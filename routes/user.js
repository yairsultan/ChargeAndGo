const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const UserSchema = require('../models/user')

function generateAccessToken(username) {
  return jwt.sign({username: username}, process.env.TOKEN_SECRET, { expiresIn: '60d' });
}


router.post('/register', (req, res) => {
  user = new UserSchema({ ...req.body});
  user.validateSync();
  res.json({jwt: generateAccessToken(user.email)});
})

module.exports = router