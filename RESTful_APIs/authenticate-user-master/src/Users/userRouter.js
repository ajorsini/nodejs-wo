

//import the required module
const express = require('express');
const router = express.Router();
const userController = require('./userController');

//This get method will get the user with token
router.post('/', (req, res) => {
  userdata = req.claims;
  if(!userdata.email) {
    return res.status(400).send({error: 'user email not available'});
  }
  userController.findUser(userdata.email, (err, result) => {
    if(err) {
      return res.status(400).send({error: 'error getting the user'}, err);
    } else {
      return res.status(200).send(result);
    }
  });
})


module.exports = router
