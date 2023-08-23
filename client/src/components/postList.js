import { useState } from "react"
import { useAuth } from "../context/authContext"
import { Link, useNavigate } from "react-router-dom"
import Post from "../pages/post"
import axios from "axios"
import UpdatePost from "../pages/updatePost"

const PostList = ({ props }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
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

  return (
    <div className='mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6'>
      {props &&
        props.map((item) => (
          <div
            className='bg-white p-4 shadow-md rounded-lg relative'
            key={item.post_id}
          >
            <div className='flex items-center mb-2'>
              <img
                src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
                alt='Profile'
                className='w-10 h-10 rounded-full mr-2'
              />
              <h3 className='font-semibold text-lg'>{item.creator.username}</h3>
            </div>
            <Link to={`/${item.post_id}`}>
              <h2 className='text-xl font-semibold mb-2'>{item.desc}</h2>
              <img
                src={item.postPic}
                alt='Post'
                className='w-full h-auto mb-2 rounded-lg'
              />
              <p className='text-gray-600'>Comments: {item.comments.length}</p>
            </Link>
            {user && item.author === user.decoded.data[0].user_id && (
              <div className='flex items-center justify-between mt-4'>
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
          </div>
        ))}
    </div>
  )
}

export default PostList
