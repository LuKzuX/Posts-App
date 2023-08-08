let mysql = require('mysql2')

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "codeforfun12",
  database: "postsapp",
})

module.exports = connection

