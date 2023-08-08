const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json("You need to be logged in")
  }
  const token = authorization.split(" ")[1]
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    req.user = decodedToken
    next()
  } catch (error) {
    return res.status(401).send(error)
  }
}

const verifyAdmin = (req, res, next) => {
  if (req.user.result[0].is_admin == 0) {
    return res.status(401).send('not an admin')
  }else{
    next() 
  }
}

module.exports = {authMiddleware, verifyAdmin}
