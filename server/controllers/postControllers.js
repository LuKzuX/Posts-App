const query = require("../utils/promisify")

const getPosts = async (req, res) => {
  try {
    const posts = await query("SELECT * FROM posts")
    const comments = await query("SELECT comments.* FROM comments ")

    for (let i = 0; i < posts.length; i++) {
      posts[i].comments = []
      for (let j = 0; j < comments.length; j++) {
        if (comments[j].from_post_id == posts[i].post_id) {
          posts[i].comments.push(comments[j])
        }
      }
    }
    res.json(posts)
  } catch (error) {
    return res.status(500).json("Internal server error")
  }
}

const getPost = async (req, res) => {
  try {
    const id = req.params.id
    const post = await query(`SELECT * FROM posts WHERE post_id = ${id}`)
    const comments = await query("SELECT comments.* FROM comments ")
    for (let i = 0; i < post.length; i++) {
      post[i].comments = []
      for (let j = 0; j < comments.length; j++) {
        if (comments[j].from_post_id == post[i].post_id) {
          post[i].comments.push(comments[j])
        }
      }
    }
    res.send(post)
  } catch (error) {
    return res.status(500).json("Internal server error")
  }
}

const createPost = async (req, res) => {
  try {
    const { result } = req.user
    const { desc, postPic } = req.body
    const date = new Date()

    await query(
      "INSERT INTO posts (`desc`,`postPic`,`likes`,`createdAt`,`author`) VALUES (?,?,?,?,?)",
      [desc, postPic, 0, date, result[0].user_id]
    )
    if (!desc) return res.status(409).send("please insert a comment")
    res.send("post added")
  } catch (error) {
    return res.status(500).json("Internal server error")
  }
}

const updatePost = async (req, res) => {
  const id = req.params.id
  const result = req.user
  const { desc, postPic } = req.body
  try {
    await query(
      "UPDATE posts SET `desc` = ?, `postPic` = ? WHERE `author` = ? AND `post_id` = ?",
      [desc, postPic, result.data[0].user_id, id]
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
    const { result } = req.user
    const { desc } = req.body
    const commentedPostId = req.params.id
    const date = new Date()

    await query(
      "INSERT INTO comments (`desc`,`createdAt`,`comment_user_id`,`from_post_id`) VALUES (?,?,?,?)",
      [desc, date, result[0].user_id, commentedPostId]
    )
    if (!desc) return res.ststus(409).send("please insert a comment")
    res.send("comment added")
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
