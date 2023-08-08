const express = require("express")
const router = express.Router()
const { login, signup } = require("../controllers/userControllers")
const { verifyAdmin, authMiddleware} = require("../middlewares/authMiddleware")

router.use(`/api`, router)

const {
  getPosts,
  createPost,
  createComment,
  updatePost,
  deletePost,
} = require("../controllers/postControllers")

router.post("/signup", signup)
router.post("/login", login)


router.get("/", getPosts)
router.post("/", authMiddleware, createPost)
router.post("/:id", authMiddleware, createComment)


router.get("/", getPosts)

module.exports = router
