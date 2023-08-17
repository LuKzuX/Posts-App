import PostList from "./components/postList"
import { useFetch } from "./hooks/fetchData"
const Home = () => {
  const {data: posts} = useFetch("/api/")
  return (
    <div>
      <PostList props={posts}/>
    </div>
  )
}

export default Home
