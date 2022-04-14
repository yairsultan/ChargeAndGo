const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router()
const jwt = require('jsonwebtoken');
const UserSchema = require('../models/user')

function generateAccessToken(username) {
  return jwt.sign({username: username}, process.env.TOKEN_SECRET, { expiresIn: '1800m' });
}


router.post('/register', (req, res) => {
  console.log({ ...req.body});
  user = new UserSchema({ ...req.body});
  user.validateSync();
  user.save(function(err,result){
    if (err){
        console.log(err);
    }
    else{
        console.log(result)
    }
  });
  res.json({jwt: generateAccessToken(user.email)});
})

router.post('/login', async (req, res) => {
  var user = await UserSchema.find({ 'email': req.body.email})
  .exec((err, user) => {
    if (err) {
      res.status(500).send({ message: "Unexpected error." });
      return;
    }
    if (!user) {
      return res.status(404).send({ message: "Invalid username/password supplied." });
    }
    console.log(user[0].password, req.body.password);
    if (user[0].password !== req.body.password) {
      return res.status(401).send({ message: "Invalid username/password supplied." });
    }
    res.json({jwt: generateAccessToken(user.email)});
  });
})

module.exports = router