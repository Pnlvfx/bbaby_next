import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import UserContext from "../../auth/UserContext"

interface Props {
  children : React.ReactNode
}

const UserSecurity = ({children}:Props) => {
  const {session} = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    if(!session?.user && !session?.user.username) {
      router.push('/')
    }
  },[session])
  return (
        <>
        {children}
        </>
  )
}

export default UserSecurity;