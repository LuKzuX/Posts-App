import { useParams } from "react-router-dom"
import { useFetch } from "../hooks/fetchData"
import axios from "axios"
import { useState, useEffect } from "react"
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"

const Post = () => {
  const { user } = useAuth()
  const { id } = useParams()
  const navigate = useNavigate()
  const { data } = useFetch(`/api/${id}`)
  const [desc, setDesc] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editingComment, setEditingComment] = useState(null)
  const [commentDesc, setCommentDesc] = useState(desc)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("desc", desc)
    console.log(formData.get("desc"))
    try {
      const response = await axios.post("/api/" + id, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete("/api/" + id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateComment = async (id) => {
    try {
      await axios.patch("/api/comment/" + id, commentDesc, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteComment = async (id) => {
    try {
      await axios.delete("/api/comment/" + id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-gray-100 p-4 rounded-lg max-w-4xl mx-auto shadow-md'>
      {data &&
        data.map((item) => (
          <div key={item.post_id} className='bg-white p-4 rounded-lg shadow-md'>
            <div className='flex items-center space-x-4'>
              <img
                src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
                alt='Profile'
                className='w-12 h-12 rounded-full'
              />
              <h3 className='text-lg font-semibold text-blue-700'>
                {item.creator.username}
              </h3>
            </div>

            <img
              src={item.postPic}
              alt='Post'
              className='w-full h-auto rounded-lg mt-4'
            />

            <p className='mt-4 text-base text-gray-700'>{item.desc}</p>
            {user && item.author === user.decoded.data[0].user_id && (
              <div className='flex items-center justify-between mt-6 space-x-2'>
                <button
                  onClick={() => {
                    handleDelete(item.post_id)
                  }}
                  className='text-red-600 hover:text-red-800'
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    navigate("/update-post/" + item.post_id)
                  }}
                  className='text-blue-600 hover:text-blue-800'
                >
                  Edit
                </button>
              </div>
            )}
            <form onSubmit={handleSubmit} className='mt-4'>
              <textarea
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value)
                }}
                className='w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500'
              ></textarea>
              <button
                type='submit'
                className='mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
              >
                Post Comment
              </button>
            </form>
            {item.comments.map((comment) => (
              <div
                key={comment.comment_id}
                className='flex items-start space-x-4 mt-4 border-b '
              >
                <img
                  src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
                  alt='Profile'
                  className='w-12 h-12 rounded-full'
                />
                <div className='flex flex-col'>
                  <h3 className='font-semibold text-md text-blue-700'>
                    {comment.commentAuthor.username}
                  </h3>
                  {isEditing && comment.comment_id === editingComment ? (
                    <textarea
                      className='text-sm text-gray-600 border-2 border-black'
                      value={commentDesc}
                      onChange={(e) => {
                        setCommentDesc(e.target.value)
                      }}
                    />
                  ) : (
                    <p className='text-sm text-gray-600'>{comment.desc}</p>
                  )}
                </div>
                {user &&
                  comment.comment_user_id === user.decoded.data[0].user_id && (
                    <div className='mt-4 pt-2 mr-auto'>
                      {!isEditing && (
                        <button
                          onClick={() => {
                            setIsEditing(!isEditing)
                            setEditingComment(comment.comment_id)
                          }}
                          className='border border-blue-600 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-100 focus:outline-none'
                        >
                          Edit
                        </button>
                      )}
                      {isEditing && comment.comment_id === editingComment ? (
                        <div className='space-x-1'>
                          <button
                            className='border border-green-600 text-green-600 px-3 py-1 rounded-lg hover:bg-green-100 focus:outline-none'
                            onClick={() => {
                              handleUpdateComment(comment.comment_id)
                              setIsEditing(false)
                            }}
                          >
                            Save
                          </button>
                          <button
                            className='border border-red-600 text-red-600 px-3 py-1 rounded-lg hover:bg-red-100 focus:outline-none'
                            onClick={() => {
                              setIsEditing(false)
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                      <button
                        onClick={() => {
                          handleDeleteComment(comment.comment_id)
                        }}
                        className='border border-red-600 text-red-600 px-3 py-1 rounded-lg hover:bg-red-100 focus:outline-none'
                      >
                        Delete
                      </button>
                    </div>
                  )}
              </div>
            ))}
          </div>
        ))}
    </div>
  )
}

export default Post
