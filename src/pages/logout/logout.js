import { useEffect } from "react"
import { navigate } from "@reach/router"

const Logout = ({loginStorageKey}) => {
  useEffect(() => {
      localStorage.setItem(loginStorageKey, '')
      navigate('/login')
  }, [loginStorageKey])

  return null
}

export default Logout
