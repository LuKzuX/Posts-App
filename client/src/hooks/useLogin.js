import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../context/authContext"

export const useLogin = () =>{
  const {setUser} = useAuth()
  const navigate = useNavigate()
  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/login", {email, password})
      localStorage.setItem("user", JSON.stringify(response))
      setUser(response)
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }
  return {login}
}