import { useAuth } from "../context/authContext"
import { Link } from "react-router-dom"

const PostList = ({ props }) => {
  const { user } = useAuth()

  return (
    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-20'>
      {props &&
        props.map((item) => (
          <div className='bg-white p-4 shadow-md rounded-lg' key={item.post_id}>
            <div className='flex items-center mb-2'>
              <img
                src={item.creator.profilePic}
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
          </div>
        ))}
    </div>
  )
}

export default PostList
