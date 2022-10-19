//import the modules that are required
const express = require('express');
const router = express.Router();
const authController = require('./authController');


//This method post will regiater the use
router.post('/register',(req, res) => {
  try {
    console.log(req.body);
    if(!(req.name && req.email && req.password)) {
      res.status(400).send({error: 'Required inputs are missing !!'});
    } else {
      authController.registerUser(req.body, (err, result) => {
        if(err) {
          console.log("Error while registering new user, Error: ", err);
          res.status(400).send({error: 'Error while registering the user'});
        } else {
          res.status(200).send({ STATUS: 'OK', data: result });
        }
      });
    }
  } catch(err) {
    console.log("Unexpected error while registering new user, Error: ", err);
    res.status(500).send({error: 'Unexpected error while registering the user'});
  }
})

//This method post will login the user once they are registered
router.post('/login',(req,res)=>{
  try {
    const { email, password } = req.body;
    if(!(email && password)) {
      res.status(400).send({error: 'All imputs are required !!'});
    } else {
      authController.loginUser({email, password}, (err, result) => {
        if(err) {
          console.log("Error while registering new user, Error: ", err);
          res.status(401).send({error: 'Invalid credentials'});
        } else {
          res.status(200).send({ STATUS: 'OK', data: result });
        }
      });
    }
  } catch(err) {
    console.log("Unexpected error while authenticating user, Error: ", err);
    res.status(500).send({error: 'Unexpected error while authenticating the user'});
  }
})

module.exports = router
