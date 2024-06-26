const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createPool({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  insecureAuth : true,
  multipleStatements: true
});

// open the MySQL connection
connection.getConnection(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;