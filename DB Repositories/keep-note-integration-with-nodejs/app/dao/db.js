const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

initializeConnection = () => {
  var connection =  mysql.createConnection({
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    database: dbConfig.DB,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD
  });

  return connection;
}
module.exports = initializeConnection;
