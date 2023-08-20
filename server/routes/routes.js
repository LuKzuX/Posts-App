const express = require("express")
const router = express.Router()
const { login, signup } = require("../controllers/userControllers")
const { verifyAdmin, authMiddleware } = require("../middlewares/authMiddleware")
const {
  getPosts,
  getPost,
  createPost,
  createComment,
  updatePost,
  deletePost,
  updateComment,
  deleteComment,
} = require("../controllers/postControllers")

router.post("/signup", signup)
router.post("/login", login)

const multer = require("multer")
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storage })


router.get("/", getPosts) 
router.get("/:id", getPost)
router.post("/", upload.single("postPic"), authMiddleware, createPost)
router.patch("/:id", upload.single("postPic"), authMiddleware, updatePost)
router.delete("/:id", authMiddleware, deletePost)

router.post("/:id", authMiddleware, createComment)
router.patch("/comment/:id", authMiddleware, updateComment)
router.delete("/comment/:id", authMiddleware, deleteComment)

router.get("/", getPosts)

module.exports = router
 