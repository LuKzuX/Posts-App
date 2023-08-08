const connection = require("../db")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const signup = (req, res) => {
  const { username, email, password } = req.body
  const selectQuery = "SELECT * FROM users WHERE email = ?"
  connection.query(selectQuery, [email], (err, data) => {
    if (err) return res.status(500).json(err)
    if (data.length)
      return res.status(409).json("An user with this email already exists.")
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const insertQuery =
      "INSERT INTO users (`username`,`email`,`password`) VALUES (?, ?, ?)"
    connection.query(
      insertQuery,
      [username, email, hashedPassword],
      (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json("User has been added.")
      }
    )
  })
}

const login = (req, res) => {
  const { email, password } = req.body
  connection.query(
    `SELECT * FROM users WHERE email=?`,
    email,
    (err, result) => {
      if (err) {
        return res.send(err)
      }
      if (result.length === 0) {
        return res.send("email or password is incorrect")
      }
      bcrypt.compare(password, result[0].password).then((isMatch) => {
        if (isMatch === false) {
          return res.send("email or password is incorrect")
        } else {
          const token = jwt.sign({ result }, process.env.SECRET)
          const decoded = jwt.decode(token)
          return res.json({ decoded, token })
        }
      })
    }
  )
}

const logout = (req, res) => {}

module.exports = {
  signup,
  login,
}
