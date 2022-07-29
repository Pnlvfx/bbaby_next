import { useContext } from "react";
import UserContext from '../auth/UserContext';
import GovernanceMainMenù from "./GovernanceMainMenù";

interface GovernanceCtrlProps {
  children: React.ReactNode
}

const GovernanceCtrl = ({children} : GovernanceCtrlProps) => {
  const {session} = useContext(UserContext)

  return (
    <>
      {!session && (
        <div className="absolute top-0 bottom-0 left-0 right-0 m-auto h-[100px] w-[100%]">
          <div className="text-center">
            <p className="text-lh font-bold text-reddit_red">Sorry, this is a governance-only page</p>
          </div>
        </div>
      )}
      {!session || session?.user?.role === 0 && (
         <div className="absolute top-0 bottom-0 left-0 right-0 m-auto h-[100px] w-[100%]">
         <div className="text-center">
           <p className="text-lh font-bold text-reddit_red">Sorry, this is a governance-only page</p>
         </div>
       </div>
      )}
      {session?.user?.role === 1 && (
      <div className="w-full">
        {children}
      </div>
      )}
    </>
  )
}

export default GovernanceCtrl;


