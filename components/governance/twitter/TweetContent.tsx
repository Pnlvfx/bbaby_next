import axios from "axios"
import Image from "next/image"
import { Dispatch, SetStateAction, useState } from "react"
import TimeAgo from "timeago-react"
import Submit from "../../submit/Submit"

interface TweetContent {
    tweet: any
    language: string
}

const TweetContent = ({tweet,language}:TweetContent) => {
    const type = tweet?.extended_entities?.media[0]?.type
    const image = tweet?.extended_entities?.media[0]?.media_url_https
    const video = tweet?.extended_entities?.media[0]?.video_info?.variants[0].url
    const height = tweet?.extended_entities?.media[0]?.sizes.large.h
    const width = tweet?.extended_entities?.media[0]?.sizes.large.w
    const [newTweet,setNewTweet] = useState({})
    const [showSubmit,setShowSubmit] = useState(false)

    const translate = async() => {
        const server = process.env.NEXT_PUBLIC_SERVER_URL
        const data = {text: tweet.full_text}
        setShowSubmit(true)
        const res = await axios.post(`${server}/governance/translate-tweet?lang=${language}`, data)
        setNewTweet({title: res.data, image: image, width: width, height: height})
    }

  return (
    <div className="flex bg-reddit_dark-brighter rounded-md overflow-hidden">
        <div className="p-2">
                <div className="flex mb-3">
                    <div className="rounded-full overflow-hidden w-5 h-5">
                        <Image src={tweet.user.profile_image_url_https} alt='twitter_user_image' width={'20px'} height={'20px'} />
                    </div>
                    <span className="self-center ml-1 font-bold text-sm leading-6">{tweet.user.name}</span>
                    <span className="px-1">-</span>
                    <span className="self-center ml-1 font-bold text-xs text-reddit_text-darker leading-6">@{tweet.user.screen_name}</span>
                    <TimeAgo datetime={tweet.created_at} className='text-ellipsis text-xs self-center ml-1 text-reddit_text-darker'/>
                </div>
            <div>
                <h3 className="break-words mb-4 text-lg">{tweet.full_text}</h3>
            </div>
                <div className="max-h-[500px] overflow-hidden">
                    {type === 'photo' &&<Image src={image} height={height} alt='twitter_image' width={width}/>}
                    {type === 'video' && 
                    <video className={`aspect-video`} 
                    src={video}
                    poster={image}
                    controls
                    width={width}
                    height={height}
                    />}
                </div>
            <button type="button" onClick={e => {
                e.preventDefault()
                translate()
            }}>
                <div className="flex text-[#717273] p-2 rounded-sm hover:bg-reddit_hover text-sm">
                    <h1>Magic</h1>
                </div>
            </button>
            {showSubmit && <Submit newTweet={newTweet} setShowSubmit={setShowSubmit}/>}
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default TweetContent;