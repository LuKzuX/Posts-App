import { useState } from "react"
import PostList from "./components/postList"
import { useFetch } from "./hooks/fetchData"
import axios from "axios"
import { useAuth } from "./context/authContext"
const Home = () => {
  const { user } = useAuth()
  const { data: posts } = useFetch("/api/")
  const [desc, setDesc] = useState("")
  const [postPic, setPostPic] = useState("")
  const [isPosting, setIsPosting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("desc", desc)
    formData.append("postPic", postPic)
    try {
      await axios.post("/api/", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex flex-col items-center p-4 max-w-4xl mx-auto'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-md p-4 mb-4'>
        <form className='space-y-4' encType='multipart/form-data'>
          <textarea
            onClick={() => {
              setIsPosting(true)
            }}
            placeholder='What is happening?'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-200'
          ></textarea>
          <label className='relative border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 cursor-pointer'>
            <input
              onChange={(e) => setPostPic(e.target.files[0])}
              type='file'
              name='postPic'
              className='hidden'
            />
            <svg
              className='w-6 h-6 absolute left-3 top-2 text-gray-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              ></path>
            </svg>
            <span className='ml-10'>Upload Image</span>
          </label>
          <div className='flex space-x-4'>
            {isPosting && (
              <div>
                <button
                  onClick={handleSubmit}
                  className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
                >
                  Post
                </button>
                <button
                  onClick={() => {
                    setIsPosting(false)
                    setDesc("")
                  }}
                  className='border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:border-gray-400'
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
      <PostList props={posts} />
    </div>
  )
}

export default Home
