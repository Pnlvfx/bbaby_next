import Router from "next/router";
import { useEffect } from "react";
import { useSession } from "../../auth/UserContext";

interface Props {
  children : React.ReactNode
}

const UserSecurity = ({children}:Props) => {
  const {session} = useSession();

  useEffect(() => {
    if(!session) {
      Router.push('/');
    }
  },[session])

  if (!session) return null;

  return (
        <>
          {children}
        </>
  )
}

export default UserSecurity;