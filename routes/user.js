const express = require('express');
const router = express.Router()
var bcrypt = require("bcrypt");
const UserSchema = require('../models/user');
const {verify_token,generateAccessToken}  = require('../middleware/jwt');


router.post('/register', (req, res) => {
  const newUser = new UserSchema({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
  })
  
  newUser.save(err => {
    if (err) {
      return res.status(400).json({
        title: 'Error',
        body: { 
          msg: 'Email in use'
        }
      })
    }
    return res.status(200).json({
        title: 'Status',
        body:{
          msg: 'Register complete',
          jwt: generateAccessToken(newUser._id)
        },
    })
  })
})

router.post('/login', async (req, res) => {
    UserSchema.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).json({
        title: 'Error',
        body:{
          msg: err
        }
        
      })
      if (!user) {
        return res.status(401).json({
          title: 'Error - user not found',
          body:{
            msg: 'invalid credentials'
          }
        })
      }
      //incorrect password
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json({
          tite: 'Error - login failed',
          body:{
            msg: 'invalid credentials'
          }
        })
      }
      return res.status(200).json({
        title: 'Status',
        body:{
          msg: 'Login complete',
          jwt: generateAccessToken(user._id)
        },
    })
  })
})

router.get('/',verify_token, (req, res) =>{
  UserSchema.findOne({_id: req.token_payload._id}, (err, user) => {
    if (err) return res.status(500).json({
      title: 'Error',
      body:{
        msg: err
      }
    })
    return res.status(200).json({
      title: 'User information',
      body:{
        user: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone
        }
      }
    })
  })
})

router.put('/',verify_token, (req, res) =>{
  UserSchema.findOne({_id: req.token_payload._id}, (err, user) => {
    if (err) return res.status(500).json({
      title: 'Error',
      body:{
        msg: err
      }
    })
    user.email = req.body.email
    user.firstName = req.body.firstName
    user.password = bcrypt.hashSync(req.body.password, 10)
    user.phone = req.body.phone
    
    user.save(err => {
      if (err) {
        return res.status(400).json({
          title: 'Error',
          body: { 
            msg: err
          }
        })
      }
      return res.status(200).json({
          title: 'Status',
          body:{
            msg: 'User was update'
          },
      })
    })
  })
})

router.delete('/',verify_token, (req, res) =>{
// TODO: delete account
// TODO: add this route to swagger
})
module.exports = router