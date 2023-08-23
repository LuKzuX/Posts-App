import axios from "axios"
import { useEffect, useState } from "react"

export const useFetch = (url) => {
  const [data, setData] = useState("")
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(url)
        setData(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])
  return { data }
}


