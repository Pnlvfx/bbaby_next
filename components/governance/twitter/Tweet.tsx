import TweetContent from "./TweetContent"

type TweetPageProps = {
  tweet: TweetProps
  language: string
}

const Tweet = ({tweet,language}:TweetPageProps) => {
  const postClasses = 'block border border-reddit_border rounded-md hover:border-reddit_text mb-3'
  return (
      <div className={postClasses}>
          <TweetContent tweet={tweet} language={language} />
      </div>
  )
}

export default Tweet;
