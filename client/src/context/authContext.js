import {useState, createContext, useContext} from "react"

const MyContext = createContext();

export const useMyContext = () => {
  return useContext(MyContext);
};
 
export const MyContextProvider = ({children}) => {
  const [authUser, setAuthUser] = useState(undefined)
  const user = JSON.parse(localStorage.getItem("user"))
  
  return(
    <MyContext.Provider value={user}>
      {children}
    </MyContext.Provider>
  )
}
export default useMyContext;