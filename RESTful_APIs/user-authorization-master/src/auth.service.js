const axios = require('axios');
const https = require('https');
const config = require("../config");

// function to get the access token
function getGithubAccessToken(code, done) {
  const body = {
    client_id: config.CLIENT_ID,
    client_secret: config.CLIENT_SECRET,
    code: code
  };
  const opts = {
    headers: { accept: 'application/json' },
  };
  axios.post("https://github.com/login/oauth/access_token", body, opts)
       .then((token) => {
         if(token && token.data && token.data.access_token) {
           done(null, token.data.access_token);
         } else if(token && token.data && token.data.error) {
           done(token.data.error);
         } else {
           throw new Error('Inconsistent authentication data!');
         }
       })
       .catch((err) => {
         done(err);
       });
}


// Function to get the user profile for the token provided
function getAccessTokenOfUser(token, done) {
  // Github APIs are authenticated and we have to share the token in headers
  // The token is same as what we recieved in the previous step

}

module.exports = {
  getGithubAccessToken,
  getAccessTokenOfUser
}
