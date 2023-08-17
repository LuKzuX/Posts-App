import PostList from "./components/postList"
import { useFetch } from "./hooks/fetchData"
import { useAuth } from "./context/authContext"
import axios from "axios"
const Home = () => {
  const {data: posts} = useFetch("/api/")
  const {user} = useAuth()
  return (
    <div>
      <PostList props={posts}/>
    </div>
  ) 
}

export default Home
