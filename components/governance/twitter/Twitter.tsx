import { useEffect, useState } from 'react'
import Skeleton from '../../utils/Skeleton'
import { anonList, getMyListTweets } from './APItwitter'
import Tweet from './Tweet'
import TwMainMenu from './TwMainMenu'

const Twitter = () => {
  const [tweets, setTweets] = useState<any[]>([])
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    getMyListTweets(anonList).then(res => {
      setTweets(res)
    })
  }, [])

  return (
    <div id="diplay_tweets" className="mx-0 flex justify-center pt-5 lg:mx-10">
      <div className="w-full lg:w-7/12 xl:w-5/12 2xl:w-[650px]">
        <div className="mb-4">
          <TwMainMenu
            setLanguage={setLanguage}
            setTweets={setTweets}
          />
        </div>
        <ul>
          {tweets.length >= 1
            ? tweets.map((tweet: any) => (
                <Tweet key={tweet.id} tweet={tweet} language={language} />
              ))
            : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((_, idx) => (
                <Skeleton key={idx} />
              ))}
        </ul>
      </div>
    </div>
  )
}

export default Twitter
