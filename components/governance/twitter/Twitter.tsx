import { useContext, useEffect, useState } from 'react';
import Skeleton from './Skeleton';
import { anonList, getMyListTweets } from './APItwitter';
import Tweet from './Tweet';
import TwMainMenu from './TwMainMenu';
import { TimeMsgContext, TimeMsgContextProps } from '../../main/TimeMsgContext';

const Twitter = () => {
  const [tweets, setTweets] = useState<TweetProps[]>([])
  const [language, setLanguage] = useState('en')
  const {setMessage} = useContext(TimeMsgContext) as TimeMsgContextProps;

  useEffect(() => {
    getMyListTweets(anonList).then(res => {
      setTweets(res.data)
    }).catch((err) => {
      err && err.response.data.msg && (
        setMessage({value: err.response.data.msg, status: 'error'})
      )
    })
  }, [])

  return (
    <div id="diplay_tweets" className="mx-0 flex justify-center lg:mx-10">
      <div className="w-full lg:w-7/12 xl:w-5/12 2xl:w-[650px]">
        <div className="mb-4">
          <TwMainMenu
            setLanguage={setLanguage}
            setTweets={setTweets}
          />
        </div>
        <ul>
          {tweets.length >= 1
            ? tweets.map((tweet) => (
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
