import UserSecurity from "../utils/security/UserSecurity";
import Submit from "./Submit";
import { SubmitContextProvider } from "./SubmitContext";

export interface newTweetProps {
  title: string
  body?: string
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
  return (
    <SubmitContextProvider>
      <UserSecurity>
        <Submit newTweet={newTweet} community={community} />
      </UserSecurity>
    </SubmitContextProvider>
  )
}

export default SubmitLayout;
