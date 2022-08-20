import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import UserContext from "../auth/UserContext";
import Submit from "./Submit";
import { SubmitContextProvider } from "./SubmitContext";

const SubmitLayout = ({newTweet,community}:any) => {
  const {session} = useContext(UserContext) as SessionProps;
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  },[])

  return (
    <SubmitContextProvider>
        <Submit newTweet={newTweet} community={community} />
    </SubmitContextProvider>
  )
}

export default SubmitLayout;
