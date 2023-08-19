import axios from "axios"
import { useNavigate } from "react-router-dom"


export const useSignup = () => {
  const navigate = useNavigate()
  const signup = async (name, email, password) => {
    try {
      await axios.get("/api/signup", {name, email, password})
      navigate("/login")
    } catch (error) {
      console.log(error);
    }
  }
  return {signup}
}