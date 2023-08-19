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

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
