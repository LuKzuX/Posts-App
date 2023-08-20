const query = require("../utils/promisify")
const connection = require("../db")

const getPosts = async (req, res) => {
  try {
    const posts = await query("SELECT * FROM posts ORDER BY createdAt DESC")
    const comments = await query("SELECT comments.* FROM comments ")
    const author = await query(
      `SELECT user_id, username, email, profilePic FROM users INNER JOIN posts ON users.user_id = posts.author WHERE users.user_id = posts.author`
    )

    for (let i = 0; i < posts.length; i++) {
      posts[i].comments = []
      for (let j = 0; j < comments.length; j++) {
        if (comments[j].from_post_id == posts[i].post_id) {
          posts[i].comments.push(comments[j])
        }
      }
      for (let k = 0; k < author.length; k++) {
        if (author[k].user_id == posts[i].author) {
          posts[i].creator = author[k]
        }
      }
    }
    res.json(posts)
  } catch (error) {
    return res.status(500).json("Internal server error")
  }
}

const getPost = async (req, res) => {
  const postId = req.params.id

  try {
    const post = await query("SELECT * FROM posts WHERE post_id = ?", [postId])
    const comments = await query(
      "SELECT * FROM comments WHERE from_post_id = ?",
      [postId]
    )
    const author = await query(
      `SELECT users.user_id, username, email, profilePic 
       FROM users INNER JOIN posts ON users.user_id = posts.author 
       WHERE users.user_id = ?`,
      [post[0].author]
    )
    const users = await query("SELECT * FROM users")

    post[0].comments = comments
    post[0].creator = author[0]

    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < post[0].comments.length; j++) {
        if (users[i].user_id === post[0].comments[j].comment_user_id) {
          post[0].comments[j].commentAuthor = users[i]
        }
      }
    }

    res.json(post)
  } catch (error) {
    console.error(error)
    return res.status(500).json("Internal server error")
  }
}

const createPost = async (req, res) => {
  const result = req.user
  const { desc, postPic = req.file.path } = req.body
  const date = new Date()
  if (!desc) {
    return res
      .status(400)
      .json({ error: "Please provide a description for the post." })
  }
  connection.query(
    "INSERT INTO posts (`desc`, `postPic`, `likes`, `createdAt`, `author`) VALUES (?, ?, ?, ?, ?)",
    [desc, postPic, 0, date, result.data[0].user_id],
    (err, data) => {
      if (err) {
        console.log(err)
        return res
          .status(500)
          .json({ error: "Error adding post to the database." })
      }
      res.status(201).json({ message: "Post added successfully." })
    }
  )
}

module.exports = { createPost }

const updatePost = async (req, res) => {
  const id = req.params.id
  const result = req.user
  const { desc, postPic } = req.body
  try {
    await query(
      "UPDATE posts SET `desc` = ?, `postPic` = ? WHERE `author` = ? AND `post_id` = ?",
      [desc, (postPic = req.file.path), result.data[0].user_id, id]
    )
    if (!desc) return res.status(409).send("please insert a description")
    res.send("post updated!")
  } catch (error) {
    return res.status(500).json("Internal server error")
  }
}

const deletePost = async (req, res) => {
  const result = req.user
  const id = req.params.id
  try {
    const deletedPost = await query(
      `DELETE FROM posts WHERE \`author\` = ${result.data[0].user_id} AND \`post_id\` = ${id}`
    )
    const deletedCommentsWithPost = await query(
      `DELETE FROM comments WHERE \`from_post_id\` = ${id}`,
      [id]
    )
    res.json({ deletedPost, deletedCommentsWithPost })
  } catch (error) {
    return res.status(500).json("Internal server error")
  }
}

const createComment = async (req, res) => {
  try {
    const result = req.user
    const { desc } = req.body
    const commentedPostId = req.params.id
    const date = new Date()

    await query(
      "INSERT INTO comments (`desc`,`createdAt`,`comment_user_id`,`from_post_id`) VALUES (?,?,?,?)",
      [desc, date, result.data[0].user_id, commentedPostId]
    )
    if (!desc) return res.status(409).send("please insert a comment")
    return res.send("comment added")
  } catch (error) {
    return res.status(500).json("Internal server error")
  }
}

const updateComment = async (req, res) => {
  try {
    const id = req.params.id
    const { result } = req.user
    const { desc } = req.body
    await query(
      `UPDATE comments SET  \`desc\` = ? WHERE \`comment_user_id\` = ${result[0].user_id} AND  \`comment_id\` = ${id}`,
      [desc]
    )
    if (!desc) return res.ststus(409).send("please insert a comment")
    res.send("comment updated")
  } catch (error) {
    return res.status(500).json("Internal server error")
  }
}

const deleteComment = async (req, res) => {
  try {
    const id = req.params.id
    const { result } = req.user
    await query(
      `DELETE FROM comments WHERE \`comment_user_id\` = ${result[0].user_id} AND \`comment_id\` = ${id}`
    )
    res.send("comment deleted")
  } catch (error) {
    return res.status(500).json("Internal server error")
  }
}

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  createComment,
  updateComment,
  deleteComment,
}
