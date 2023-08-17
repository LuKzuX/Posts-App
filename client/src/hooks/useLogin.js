import { useNavigate } from "react-router-dom"
import axios from "axios"

export const useLogin = () =>{
  const navigate = useNavigate()
  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/login", {email, password})
      localStorage.setItem("user", JSON.stringify(response))
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }
  return {login}
}