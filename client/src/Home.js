import PostList from "./components/postList"
import { useFetch } from "./hooks/fetchData"
const Home = () => {
  const {data: posts} = useFetch("/api/")
  return (
    <div>
      <div>
        <textarea placeholder="what is happening?"></textarea>
        <button>Post</button>
        <button>Cancel</button>
      </div>
      <PostList props={posts}/>
    </div>
  ) 
}

export default Home
