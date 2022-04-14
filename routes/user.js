const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router()
const jwt = require('jsonwebtoken');
var bcrypt = require("bcryptjs");
const UserSchema = require('../models/user');
const { remove } = require('../models/user');

function generateAccessToken(email) {
  return jwt.sign({email: email}, process.env.TOKEN_SECRET, { expiresIn: '1800m' });
}

function validate_token(req,res,next){
  let token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err || req.params.id !== decoded.email) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    next();
  });
}

router.post('/register', (req, res) => {
  reg_user  = { ...req.body}
  reg_user.password = bcrypt.hashSync(reg_user.password, 8);
  // TODO: chack email if exist || add role default regular
  user = new UserSchema(reg_user);
  user.validateSync();
  user.save(function(err,result){
    if (err){
        console.log(err);
    }
    else{
        console.log(result)
    }
  });
  res.json({msg:"User was registered successfully!",token:generateAccessToken(user.email)});
})

router.post('/login', async (req, res) => {
  var user = await UserSchema.findOne({ 'email': req.body.email})
  .exec((err, user) => {
    if (err) {
      res.status(500).send({ message: "Unexpected error." });
      return;
    }
    if (!user) {
      return res.status(404).send({ message: "Invalid username/password supplied." });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid username/password supplied." });
    }
    res.json({jwt: generateAccessToken(user.email)});
  });
})

router.get('/:id',validate_token,async (req, res) =>{
  var user = await UserSchema.findOne({ 'email': req.params.id})
  // TODO: continue
})

module.exports = router