import { useContext} from "react"
import UserContext from '../auth/UserContext'
import GovernanceMainMenù from "./GovernanceMainMenù"

const GovernanceCtrl = ({children} : any) => {
  const provider = useContext(UserContext)
  const {session}:any = provider


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
      <div className="pl-[30px] pt-5 block lg:flex" id="main">
        <GovernanceMainMenù />
        {children}
      </div>
      )}
    </div>
  )
}

export default GovernanceCtrl;


