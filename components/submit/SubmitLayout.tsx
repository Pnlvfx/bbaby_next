import Submit from "./Submit"
import { SubmitContextProvider } from "./SubmitContext"

const SubmitLayout = ({newTweet,communityName}:any) => {
  return (
    <SubmitContextProvider>
        <Submit newTweet={newTweet} community={communityName} />
    </SubmitContextProvider>
  )
}

export default SubmitLayout;
