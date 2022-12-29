import { FaSpaceShuttle } from 'react-icons/fa'
import { Dispatch, SetStateAction, useState } from 'react'
import {
  anonList,
  bbabyList,
  getAnonHome,
  getMyListTweets,
  query,
} from '../../API/governance/twitterAPI'
import { useMessage } from '../../main/TimeMsgContext'
import { catchErrorWithMessage } from '../../API/common'

interface TwMainMenuProps {
  setLanguage: Dispatch<SetStateAction<string>>
  setTweets: Dispatch<SetStateAction<TweetProps[]>>
}

const TwMainMenu = ({ setLanguage, setTweets }: TwMainMenuProps) => {
  const [active, setActive] = useState(0)
  const message = useMessage()

  const changeTweet = async (lang: string, list: query) => {
    try {
      setTweets([])
      setLanguage(lang)
      const res = await getMyListTweets(list)
      setTweets(res)
    } catch (err) {
      catchErrorWithMessage(err, message)
    }
  }

  const getHome = async () => {
    try {
      setTweets([])
      const data = await getAnonHome()
      setTweets(data)
    } catch (err) {
      catchErrorWithMessage(err, message)
    }
  }

  return (
    <div className="flex space-x-3 rounded-md border border-reddit_border bg-reddit_dark-brighter py-[13px] px-2">
      <button
        className={`rounded-full py-1 px-3 hover:bg-reddit_dark-brightest ${
          active === 0 && 'bg-reddit_dark-brightest'
        }`}
        onClick={() => {
          setActive(0)
          getHome()
        }}
      >
        <div className="flex h-5 items-center space-x-1">
          <FaSpaceShuttle className="h-5 w-5 -rotate-90" />
          <p className="text-sm font-bold">Home</p>
        </div>
      </button>
      <button
        className={`rounded-full py-1 px-3 hover:bg-reddit_dark-brightest ${
          active === 1 && 'bg-reddit_dark-brightest'
        }`}
        onClick={() => {
          setActive(1)
          changeTweet('en', anonList)
        }}
      >
        <div className="flex h-5 items-center space-x-1">
          <FaSpaceShuttle className="h-5 w-5 -rotate-90" />
          <p className="text-sm font-bold">English</p>
        </div>
      </button>
      <button
        className={`rounded-full py-1 px-3 hover:bg-reddit_dark-brightest ${
          active === 2 && 'bg-reddit_dark-brightest'
        }`}
        onClick={() => {
          setActive(2)
          changeTweet('it', bbabyList)
        }}
      >
        <div className="flex h-5 items-center space-x-1">
          <FaSpaceShuttle className="h-5 w-5 -rotate-90" />
          <p className="text-sm font-bold">Italian</p>
        </div>
      </button>
    </div>
  )
}

export default TwMainMenu
