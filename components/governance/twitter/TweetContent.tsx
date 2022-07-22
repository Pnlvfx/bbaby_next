import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import TimeAgo from 'timeago-react'
import SubmitLayout from '../../submit/SubmitLayout'

interface TweetContent {
  tweet: any
  language: string
}

const TweetContent = ({ tweet, language }: TweetContent) => {
  const type = tweet?.extended_entities?.media[0]?.type
  const video = tweet?.extended_entities?.media[0]?.video_info?.variants[0].url
  const image = video ? null : tweet?.extended_entities?.media[0]?.media_url_https
  const height = tweet?.extended_entities?.media[0]?.sizes.large.h
  const width = tweet?.extended_entities?.media[0]?.sizes.large.w
  const [newTweet, setNewTweet] = useState({})
  const [showSubmit, setShowSubmit] = useState(false)

  const translate = async () => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const data = { text: tweet.full_text }
    const res = await axios.post(
      `${server}/governance/translate-tweet?lang=${language}`,
      data
    )
    setNewTweet({
      title: res.data,
      image: image ? image : null,
      width: width ? width : null,
      height: height ? height : null,
      video: video ? video : null,
    })
  }

  return (
    <div className="flex overflow-hidden rounded-md bg-reddit_dark-brighter">
      <div className="p-2 w-full">
        <div className="mb-3 flex w-full h-[24px]">
          <div className="h-5 w-5 overflow-hidden rounded-full">
            <Image
              src={tweet.user.profile_image_url_https}
              alt="twitter_user_image"
              width={'20px'}
              height={'20px'}
            />
          </div>
          <span className="ml-1 self-center text-sm font-bold leading-6">
            {tweet.user.name}
          </span>
          <span className="px-1">-</span>
          <span className="ml-1 self-center text-xs font-bold leading-6 text-reddit_text-darker">
            @{tweet.user.screen_name}
          </span>
          <TimeAgo
            datetime={tweet.created_at}
            className="ml-1 self-center text-ellipsis text-xs text-reddit_text-darker"
          />
        </div>
        <div>
          <h3 className="mb-4 break-words text-lg">{tweet.full_text}</h3>
        </div>
        <div className="max-h-[500px] overflow-hidden">
          {type === 'photo' && (
            <Image
              src={image}
              height={height}
              alt="twitter_image"
              width={width}
            />
          )}
          {type === 'video' && (
            <video
              className={`aspect-video`}
              src={video}
              poster={image}
              controls
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
              translate()
              setShowSubmit(true)
            }
          }}
        >
          <div className="flex rounded-sm p-2 text-sm text-[#717273] hover:bg-reddit_hover">
            <h1>Magic</h1>
          </div>
        </button>
        {showSubmit && <SubmitLayout newTweet={newTweet} />}
      </div>
    </div>
  )
}

export default TweetContent
