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
            <h1 className="text-lh font-bold text-reddit_red">Sorry, this is a governance-only page</h1>
          </div>
        </div>
      )}
      {session?.user?.role === 0 && (
        <div className="my-auto mx-auto text-center self-center">
          <h1 className="self-center text-sm pt-20 text-reddit_red">Sorry, this is a governance-only page</h1>
        </div>
      )}
      {session?.user?.role === 1 && (
      <div className="w-full">
        <GovernanceMainMenù />
        {children}
      </div>
      )}
    </>
  )
}

export default GovernanceCtrl;


