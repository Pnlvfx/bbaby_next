import Submit from "./Submit"
import { SubmitContextProvider } from "./SubmitContext"

const SubmitLayout = ({newTweet}:any) => {
  return (
    <SubmitContextProvider>
        <Submit newTweet={newTweet} />
    </SubmitContextProvider>
  )
}

export default SubmitLayout;
