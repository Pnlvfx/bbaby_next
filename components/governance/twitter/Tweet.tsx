import Image from 'next/image';
import { useContext, useState } from 'react';
import TimeAgo from 'timeago-react'
import { translate } from '../../API/governance/governanceAPI'
import { COLORS } from '../../main/config';
import { TimeMsgContext, TimeMsgContextProps } from '../../main/TimeMsgContext'
import SubmitLayout from '../../submit/SubmitLayout'
import VideoPlayer from '../../utils/video/VideoPlayer'

type TweetPageProps = {
  user_avatar: string
  language: string
  username: string
  screen_name: string
  created_at: Date
  title: string
  type?: string
  video?: string
  image?: string
  height?: number
  width?: number
}

const Tweet = ({ username, screen_name, created_at, title, type, video, image, width, height, user_avatar, language }: TweetPageProps) => {
  const { setMessage } = useContext(TimeMsgContext) as TimeMsgContextProps
  const [newTweet, setNewTweet] = useState({});
  const [showSubmit, setShowSubmit] = useState(false);

  const doTranslate = async () => {
    const res = await translate(title , language)
    if (res.ok) {
      if (res instanceof Response) {
        const tweetTitle = await res.json()
        setNewTweet({
          title: tweetTitle,
          image: image ? image : null,
          width: width ? width : null,
          height: height ? height : null,
          video: video ? video : null,
        })
        setShowSubmit(true)
      }
    } else {
      if (res instanceof Response) {
        const error = await res.json()
        setMessage({ value: error.msg, status: 'error' })
      } else {
        setMessage({ value: res.msg })
      }
    }
  }
  return (
      <li className="mb-3 rounded-md bg-reddit_dark-brighter hover:border-reddit_text flex overflow-hidden border border-reddit_border">
        <div className="w-full p-2">
          <div className="mb-3 flex h-[24px] w-full">
            <div className="h-5 w-5 overflow-hidden rounded-full">
              <Image
                src={user_avatar}
                alt="twitter_user_image"
                width={'20px'}
                height={'20px'}
              />
            </div>
            <span className="ml-1 text-sm font-bold leading-6">{username}{` - `}</span>
            <span className="ml-1 text-xs font-bold leading-6 text-reddit_text-darker">
              @{screen_name}
            </span>
            <TimeAgo
              datetime={created_at}
              className="ml-1 text-ellipsis text-xs text-reddit_text-darker leading-6"
            />
          </div>
          <h1 className="mb-4 break-words text-lg">{title}</h1>
          <div className="max-h-[500px] overflow-hidden">
            {type === 'photo' && image && width && height && (
              <Image
                src={image}
                height={height}
                alt="twitter_image"
                width={width}
              />
            )}
            {type === 'video' && video && width && height && (
              <VideoPlayer 
                src={video}
                poster={''}
                width={width}
                height={height}
              />
            )}
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              if (showSubmit) {
                setShowSubmit(false)
              } else {
                doTranslate()
              }
            }}
          >
            <div className="flex rounded-sm p-2 text-sm text-[#717273] hover:bg-reddit_hover">
              <p>Magic</p>
            </div>
          </button>
          {showSubmit && <SubmitLayout newTweet={newTweet} />}
        </div>
      </li>
  )
}

export default Tweet
