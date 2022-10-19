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
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });
  const opts = {
    headers: { accept: 'application/json' },
    httpsAgent
  };
  console.log('body: \n', body);
  console.log('opts: \n', opts);
  axios.post("https://github.com/login/oauth/access_token", body, opts)
       .then((token) => {
         done(null, token);
       })
       .catch((err) => {
         console.log('err: ', err.response.data);
         done({error: err.response.data});
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
