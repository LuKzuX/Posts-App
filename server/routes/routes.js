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
  updateComment,
  deleteComment
} = require("../controllers/postControllers")

router.post("/signup", signup)
router.post("/login", login)


router.get("/", getPosts)
router.post("/", authMiddleware, createPost)
router.patch("/:id", authMiddleware, updatePost)
router.delete("/:id", authMiddleware, deletePost)

router.post("/:id", authMiddleware, createComment)
router.patch("/comment/:id", authMiddleware, updateComment)
router.delete("/comment/:id", authMiddleware, deleteComment)


router.get("/", getPosts)

module.exports = router
