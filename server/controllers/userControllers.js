const connection = require("../db")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const query = require("../utils/promisify")

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const data = await query("SELECT * FROM users WHERE email = ?", [email])

    if (!username||!email||!password) {
      return res.status(401).json("please fill all the fields")
    }

    if (data.length)
      return res.status(409).json("An user with this email already exists.")

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    await query(
      "INSERT INTO users (`username`,`email`,`password`) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    )

    return res.status(200).json("User has been added.")
  } catch (error) {
    return res.status(500).send(error)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    connection.query(
      `SELECT * FROM users WHERE email=?`,
      email,
      (err, data) => {
        if (err) return res.status(500).send(err)

        if (data.length === 0) {
          return res.status(401).json("email or password incorrect")
        }

        const isMatch = bcrypt.compareSync(password, data[0].password)
        if (!isMatch) {
          return res.status(401).json("email or password incorrect")
        }

        const token = jwt.sign({ data }, process.env.SECRET)
        const decoded = jwt.decode(token)
        res.json({ decoded, token })
      }
    )
  } catch (error) {
    return res.status(500).send(error)
  }
}

const logout = (req, res) => {}
//
module.exports = {
  signup,
  login,
}
