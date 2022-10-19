

//import jsonwebtoken and config
const jwt = require('jsonwebtoken');
const config = require('../../config')

//This function verifyToken will verify the token coming from headers
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if(!token) return res.status(403).send({error: 'A token is required for authentication!'});
  try {
    const decoded = jwt.verify(token, config.AUTH_SECRET);
    req.claims = decoded;
  } catch(err) {
    return res.status(401).send({error: 'Invalid token'});
  }
  return next();
};

module.exports = verifyToken;
