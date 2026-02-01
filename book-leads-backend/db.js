const mysql = require("mysql2");

let db = null;

function createDB() {
  if (!db) {
    db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
  }
  return db;
}

module.exports = createDB;
