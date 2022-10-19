const express = require('express');
const config = require("../config");
const router = express.Router();
const oauthCtrl = require("./auth.controller");

// redirects the login to consent authorization screen from github
router.get('/login', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${config.CLIENT_ID}`);
});


// Callback url to which github oauth code is sent
router.get('/callback', (req, res) => {
  try {
    oauthCtrl.oauthProcessor(req.query.code, (err, data) => {
      if(err) {
        res.status(401).send({ error: `Bad Request: ${err}` });
      } else {
        res.redirect(`/?token=${data}`);
      }
    });
  } catch(err) {
    res.status(500).send({ error: `Internal error: ${err}`});
  }
});

module.exports = router;
