const users = require('./users')
// Define a function that returns a promise to get all users and return a promise
const getAllUsers = () => {
    return new Promise((rs, rj) => {
      return rs(users);
    });
}
//Define a function to create a new user and return a promise
const createUser = (user) => {
    return new Promise((rs, rj) => {
      if(user) {
          users.push(user);
          return rs(user);
      } else
          return rj('No user to be added');
    });
 }
// Define a function to get a user by id and return a promise
const getAUserByID = (id) => {
    return new Promise((rs, rj) => {
        let u = users.filter(u => u.id === id);
        if(u)
            return rs(u);
        else
            return rj('User does not exist');
    });
}
// Define an async function that calls the createUser and getAllUsers function using await
// and returns all users
const displayUsers = async (user) => {
   const allUsers = null;
   try {
       await createUser(user);
       allUsers = await getAllUsers();
   } catch(err) {
       console.log(err);
   }
   return allUsers;
}
//Define a async function to display a specific user by Id
// return the user
const displayAUser = async(id) => {
    const user = null;
    try {
        user = await getAUserByID(id);
        console.log(user);
    } catch(err) {
        console.log(err);
    }
    return user;
}

module.exports = {
    getAllUsers, getAUserByID, createUser, displayAUser, displayUsers
}
