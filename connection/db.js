const connection = require ('mysql2')
require('dotenv').config()

const conn = connection.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  password: "Ammarpedia123@@@",
  dateStrings: "date"
});

module.exports = conn