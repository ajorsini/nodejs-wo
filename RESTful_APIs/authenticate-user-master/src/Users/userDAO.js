

//import users.json file and fs module
const fs = require('fs');
const users = require('./users.json');
const usersFileName = './src/Users/users.json';

//This method will findUser
function findUser(email, done){
  const userFetched = users.filter((u) => u.email === email)[0];
  done(undefined, userFetched);
}

//This method will register user
function registerUser(userData, done){
  users.push(userData);
  fs.writeFileSync(usersFileName, JSON.stringify(users));
  done(undefined, userData);
}

module.exports = {
    findUser, registerUser
}
