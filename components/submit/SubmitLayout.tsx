import Router from "next/router";
import { useContext, useEffect } from "react";
import UserContext from "../auth/UserContext";
import Submit from "./Submit";
import { SubmitContextProvider } from "./SubmitContext";

export interface newTweetProps {
  title: string
  image?: string
  width?: number
  height?: number
  video?: string
  type?: 'video' | 'photo'
}

interface SubmitLayoutProps {
  newTweet?: newTweetProps
  community?: string
}

const SubmitLayout = ({newTweet, community}: SubmitLayoutProps) => {
  const {session} = useContext(UserContext) as SessionProps;

  useEffect(() => {
    if (!session) {
      Router.push('/')
    }
  },[session])

  return (
    <SubmitContextProvider>
        <Submit newTweet={newTweet} community={community} />
    </SubmitContextProvider>
  )
}

export default SubmitLayout;
