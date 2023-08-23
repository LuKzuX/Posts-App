import "./styles.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Home from "./Home"
import Login from "./Login"
import { AuthProvider } from "./context/authContext"
import Signup from "./signup"
import Post from "./pages/post"
import UpdatePost from "./pages/updatePost"

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/:id' element={<Post />} />
            <Route path='/update-post/:id' element={<UpdatePost/>} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
