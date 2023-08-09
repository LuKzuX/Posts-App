const connection = require("../db")

const query = (sqlCommand) => {
  return new Promise((resolve, reject) => {
    connection.query(sqlCommand, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

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
    res.status(500).json(error)
  }
}

const createPost = async (req, res) => {
  const { result } = req.user
  const { desc, postPic } = req.body
  const date = new Date()

  connection.query(
    "INSERT INTO posts (`desc`,`postPic`,`likes`,`createdAt`,`author`) VALUES (?,?,?,?,?)",
    [desc, postPic, 0, date, result[0].user_id],
    (err, data) => {
      if (err) return res.status(500).json(err)
      res.send("success")
    }
  )
}

const createComment = async (req, res) => {
  const { result } = req.user
  const { desc } = req.body
  const commentedPostId = req.params.id
  const date = new Date()

  connection.query(
    "INSERT INTO comments (`desc`,`createdAt`,`comment_user_id`,`from_post_id`) VALUES (?,?,?,?)",
    [desc, date, result[0].user_id, commentedPostId],
    (err, data) => {
      if (err) return res.status(500).json(err)
      res.send("success")
    }
  )
}

module.exports = {
  getPosts,
  createPost,
  createComment,
}
