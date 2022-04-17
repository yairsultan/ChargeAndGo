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

async function userExist(email) {
  flag = true
  console.log(await UserSchema.findOne({ 'email': email}))
  if(await UserSchema.findOne({ 'email': email}) === null){
    flag = false
  }
  return flag;
}

router.post('/register', async(req, res) => {
  try {
    if(await userExist(req.body.email) === true){
        res.json({msg:"User alrady exist!"})
    }
    user = new UserSchema({ ...req.body});
    user.validateSync();
    user.password = bcrypt.hashSync(user.password, 8);
    user.save()
    res.json({msg:"User was registered successfully!",token:generateAccessToken(user.email)});
  } catch (error) {
      res.status(400).json({msg:"format is not good"})
  }
});

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
  res.json({
    firstName:user.firstName,
    lastName: user.lastName,
    email:user.email,
    phone:user.phone
  })
})

router.put('/:id',validate_token,async (req, res) =>{
  var user_db = await UserSchema.findOne({ 'email': req.params.id})
  



})
module.exports = router