import Submit from "./Submit"
import { SubmitContextProvider } from "./SubmitContext"

const SubmitLayout = ({newTweet,community}:any) => {
  return (
    <SubmitContextProvider>
        <Submit newTweet={newTweet} community={community} />
    </SubmitContextProvider>
  )
}

export default SubmitLayout;
