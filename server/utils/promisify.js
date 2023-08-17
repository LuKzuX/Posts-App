const connection = require("../db")

 const query = (sqlCommand, param1 = undefined) => {
  return new Promise((resolve, reject) => {
    connection.query(sqlCommand, param1, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

module.exports = query