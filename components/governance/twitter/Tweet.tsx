import TweetContent from "./TweetContent"

type TweetProps = {
  tweet: {}
  setTranslatedTweet: any,
  language: string
}

const Tweet = ({tweet,setTranslatedTweet,language}:TweetProps) => {
  const postClasses = 'block border border-reddit_border rounded-md hover:border-reddit_text'
  return (
    <div className="pb-3">
      <div className={postClasses}>
        <div>
          <TweetContent {...tweet} setTranslatedTweet={setTranslatedTweet} language={language} />
        </div>
      </div>
    </div>
  )
}

export default Tweet