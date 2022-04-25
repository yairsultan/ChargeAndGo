const jwt = require('jsonwebtoken');

function verify_token(req,res,next){
    let token = req.headers['authorization'];
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.token_payload = decoded
      next();
    });
  }
  function verify_admin(req,res,next){
    //TODO: Check Role - (needed add user schema role enam)
    
      next();
    
  }
  function generateAccessToken(id) {
    return jwt.sign({_id: id}, process.env.TOKEN_SECRET, { expiresIn: '1800m' });
  }

  module.exports = {verify_token, generateAccessToken,verify_admin}