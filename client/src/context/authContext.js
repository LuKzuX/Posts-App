import { useState, createContext, useContext, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      setUser(user.data)
    }
  }, [])
  console.log("Auth context state:", user)

  const authContextValue = {
    user,
    setUser
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}
