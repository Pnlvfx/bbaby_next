import { useContext, useEffect, useRef, useState } from 'react';
import Skeleton from './Skeleton';
import { getAnonHome } from '../../API/governance/twitterAPI';
import Tweet from './Tweet';
import TwMainMenu from './TwMainMenu';
import { TimeMsgContext, TimeMsgContextProps } from '../../main/TimeMsgContext';
import { catchErrorWithMessage } from '../../API/common';
import TwitterWidget from './TwitterWidget';

const Twitter = () => {
  const [tweets, setTweets] = useState<TweetProps[]>([]);
  const [language, setLanguage] = useState('en');
  const message = useContext(TimeMsgContext) as TimeMsgContextProps;
  const messageRef = useRef(message);

  useEffect(() => {
    const get = async () => {
      try {
        const data = await getAnonHome()
        setTweets(data);
      } catch (err) {
        catchErrorWithMessage(err, messageRef.current);
      }
    }
    get();
  }, [])

  return (
    <div id="diplay_tweets" className="mx-[2px] lg:mx-10 flex justify-center">
      <div className="w-full lg:w-[640px]">
        <div className='mb-4'>
          <TwMainMenu setLanguage={setLanguage} setTweets={setTweets} />
        </div>
        <ul>
          {tweets.length >= 1 ? 
          tweets.map((tweet) => (
                <Tweet
                  key={tweet.id}
                  username={tweet?.user.name}
                  screen_name={tweet.user.screen_name}
                  created_at={tweet.created_at}
                  title={tweet.full_text}
                  type={tweet?.extended_entities?.media[0]?.type}
                  videoInfo={tweet?.extended_entities?.media[0]?.video_info}
                  image={tweet?.extended_entities?.media[0]?.media_url_https}
                  width={tweet?.extended_entities?.media[0]?.sizes.large.w}
                  height={tweet?.extended_entities?.media[0]?.sizes.large.h}
                  user_avatar={tweet.user.profile_image_url_https}
                  language={language}
                />
              ))
            : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((_, idx) => (
                <Skeleton key={idx} />
              ))}
        </ul>
        <div className='hidden lg:block'>
          <TwitterWidget />
        </div>
      </div>
    </div>
  )
}

export default Twitter;

