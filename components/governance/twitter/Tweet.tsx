import { Dispatch, SetStateAction } from "react"
import TweetContent from "./TweetContent"

type TweetProps = {
  tweet: {}
  language: string
}

const Tweet = ({tweet,language}:TweetProps) => {
  const postClasses = 'block border border-reddit_border rounded-md hover:border-reddit_text'
  return (
    <div className="pb-3">
      <div className={postClasses}>
          <TweetContent tweet={tweet} language={language} />
      </div>
    </div>
  )
}

export default Tweet