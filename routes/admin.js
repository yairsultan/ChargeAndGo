const express = require('express');
const {verify_token,generateAccessToken,verify_admin}  = require('../middleware/jwt');
const router = express.Router()

router.post('/block_user',verify_token,verify_admin, (req, res) =>{
// TODO: Add to swagger
// TODO: Block spesific user or meny
})

router.post('/send_notifications',verify_token,verify_admin, (req, res) =>{
// TODO: Add to swagger
// TODO: Send notifications spesific user or meny

})
router.post('/change_role',verify_token,verify_admin, (req, res) =>{
// TODO: Add to swagger
// TODO: Change role to spesific user or meny
})
router.get('/users_inquiries',verify_token,verify_admin, (req, res) =>{
// TODO: Add To Swagger

})

module.exports = router