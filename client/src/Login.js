import { useState } from "react"
import { useLogin } from "./hooks/useLogin"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, error, isLoading } = useLogin()
  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type='text'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id='email'
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id='password'
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Login
