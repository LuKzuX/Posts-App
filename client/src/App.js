import "./styles.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import PostList from "./components/postList"

import Home from "./Home"
import Login from "./Login"

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
