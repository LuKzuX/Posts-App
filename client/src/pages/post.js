import { useParams } from "react-router-dom"
import { useFetch } from "../hooks/fetchData"

const Post = () => {
  const { id } = useParams()
  const { data } = useFetch(`/api/${id}`)
  return (
  
<div className='flex flex-col space-y-4'>
  {data &&
    data.map((item) => (
      <div
        key={item.post_id}
        className='bg-white p-4 rounded-lg max-w-4xl mx-auto'
      >
        <div className='flex items-center space-x-2'>
          <img
            src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
            alt='Profile'
            className='w-10 h-10 rounded-full'
          />
          <h3 className='text-lg font-semibold'>{item.creator.username}</h3>
        </div>

        <img
          src={item.postPic}
          alt='Post'
          className='w-full h-auto rounded-lg'
        />

        <div className='mt-2'>
          <p className='text-base'>{item.desc}</p>
        </div>

        {item.comments.map((comment) => (
          <div
            key={comment.comment_id}
            className='flex items-start space-x-2 mt-4'
          >
            <img
              src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
              alt='Profile'
              className='w-10 h-10 rounded-full'
            />
            <div className='flex flex-col'>
              <div className='flex items-center'>
                <h3 className='font-semibold text-md'>
                  {comment.commentAuthor.username}
                </h3>
              </div>
              <p className='text-sm'>{comment.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ))}
</div>

  )
}

export default Post
