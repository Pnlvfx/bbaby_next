import { FaSpaceShuttle } from 'react-icons/fa'
import { Dispatch, SetStateAction, useState } from 'react'
import { anonList, bbabyList, getMyListTweets } from './APItwitter'

interface TwMainMenuProps {
  setLanguage: Dispatch<SetStateAction<string>>
  setTweets: Dispatch<SetStateAction<Array<any>>>
}

const TwMainMenu = ({ setLanguage, setTweets }: TwMainMenuProps) => {
  const [active, setActive] = useState(0)
  return (
    <div className="">
      <div className="flex space-x-3 rounded-md border border-reddit_border bg-reddit_dark-brighter py-[13px] px-2">
        <button
          onClick={() => {
            setTweets([])
            setLanguage('en')
            getMyListTweets(anonList).then(res => {
              setTweets(res)
              setActive(0)
            })
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
            setTweets([])
            setLanguage('it')
            getMyListTweets(bbabyList).then(res => {
              setTweets(res)
              setActive(1)
            })
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
