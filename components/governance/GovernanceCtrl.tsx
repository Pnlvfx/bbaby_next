import { useContext } from "react"
import UserContext from '../auth/UserContext'

const GovernanceCtrl = ({children} : any) => {
  const provider = useContext(UserContext)
  const {session} = provider


  return (
    <div>
      {!session && (
        <div className="my-auto mx-auto text-center self-center">
          <h1 className="self-center text-sm pt-20 text-reddit_red">You cannot access this page as you are not an admin</h1>
        </div>
      )}
      {session?.user?.role === 0 && (
        <div className="my-auto mx-auto text-center self-center">
          <h1 className="self-center text-sm pt-20 text-reddit_red">You cannot access this page as you are not an admin</h1>
        </div>
      )}
      {session?.user?.role === 1 && (
      <div>
        {children}
      </div>
      )}
    </div>
  )
}

export default GovernanceCtrl;


