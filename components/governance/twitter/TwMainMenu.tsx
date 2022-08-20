import { FaSpaceShuttle } from 'react-icons/fa'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { anonList, bbabyList, getMyListTweets, query } from './APItwitter'
import { TimeMsgContext, TimeMsgContextProps } from '../../main/TimeMsgContext'

interface TwMainMenuProps {
  setLanguage: Dispatch<SetStateAction<string>>
  setTweets: Dispatch<SetStateAction<TweetProps[]>>
}

const TwMainMenu = ({ setLanguage, setTweets }: TwMainMenuProps) => {
  const [active, setActive] = useState(0)
  const {setMessage} = useContext(TimeMsgContext) as TimeMsgContextProps;

  const changeTweet = async (lang:string,list:query) => {
    try {
      setTweets([])
      setLanguage(lang)
      getMyListTweets(list).then(res => {
        res.json().then((_tweets) => {
          if (res.ok) {
            setTweets(_tweets)
            setActive(0)
          } else {
            setMessage({value: _tweets.msg, status: 'error'})
          }
        })
      })
    } catch (err:any) {
      err && err.response.data.msg && (
        setMessage({value: err.response.data.msg, status: 'error'})
      )
    }
  }

  return (
    <div className="">
      <div className="flex space-x-3 rounded-md border border-reddit_border bg-reddit_dark-brighter py-[13px] px-2">
        <button
          onClick={() => {
            changeTweet('en', anonList)
          }}
          className={`rounded-full py-1 px-3 hover:bg-reddit_dark-brightest ${
            active === 0 && 'bg-reddit_dark-brightest'
          }`}
        >
          <div className="flex h-5 items-center space-x-1">
            <FaSpaceShuttle className="h-5 w-5 -rotate-90" />
            <p className="text-sm font-bold">English</p>
          </div>
        </button>
        <button
          onClick={() => {
            changeTweet('it', bbabyList)
          }}
          className={`rounded-full py-1 px-3 hover:bg-reddit_dark-brightest ${
            active === 1 && 'bg-reddit_dark-brightest'
          }`}
        >
          <div className="flex h-5 items-center space-x-1">
            <FaSpaceShuttle className="h-5 w-5 -rotate-90" />
            <p className="text-sm font-bold">Italian</p>
          </div>
        </button>
      </div>
    </div>
  )
}

export default TwMainMenu;
