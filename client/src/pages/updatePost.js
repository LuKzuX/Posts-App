import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "../context/authContext"
import { Routes, Route, useParams, useNavigate } from "react-router-dom"
import { Navigate } from "react-router-dom"
const UpdatePost = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [desc, setDesc] = useState("")
  const [postPic, setPostPic] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/" + id)
        setDesc(res.data[0].desc)
        setPostPic(res.data[0].postPic)
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [])

  const handleUpdate = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("desc", desc)
    formData.append("postPic", postPic)
    try {
      const res = await axios.patch("/api/update-post/" + id, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
    <form encType="multipart/form-data" onSubmit={handleUpdate} className="space-y-4">
      <input
        type="text"
        value={desc}
        onChange={(e) => {
          setDesc(e.target.value);
        }}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Edit your post description..."
      />
      <input
        type="file"
        onChange={(e) => setPostPic(e.target.files[0])}
        className="hidden"
      />
      <label className="block cursor-pointer">
        <span className="inline-block px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600">
          Upload Image
        </span>
        <input
          type="file"
          onChange={(e) => setPostPic(e.target.files[0])}
          className="hidden"
        />
      </label>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Update
      </button>
    </form>
    <button className="mt-4 p-2 text-gray-500 hover:text-gray-800">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={() => {
          navigate('/')
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    </button>
  </div>
  

  )
}

export default UpdatePost
