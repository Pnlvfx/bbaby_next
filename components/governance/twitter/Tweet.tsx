import TweetContent from "./TweetContent"

const Tweet = (props:any) => {
  const postClasses = 'block border border-reddit_border rounded-md hover:border-reddit_text'
  const tweet = props
  const {setTranslatedTweet,language} = props
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