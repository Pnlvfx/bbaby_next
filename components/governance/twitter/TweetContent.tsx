import Image from "next/image"
import TimeAgo from "timeago-react"

const TweetContent = (props:any) => {
    const tweet = props
  return (
    <div className="flex bg-reddit_dark-brighter rounded-md overflow-hidden">
        <div className="p-2 max-h-[700px]">
            <div className="flex mb-3">
                <div className="flex">
                    <div className="rounded-full overflow-hidden w-5 h-5">
                        <Image src={tweet.user.profile_image_url_https} alt='twitter_user_image' width={'20px'} height={'20px'} />
                    </div>
                    <span className="self-center ml-1 font-bold text-sm leading-6">{tweet.user.name}</span>
                    <span className="px-1">-</span>
                    <span className="self-center ml-1 font-bold text-xs text-reddit_text-darker leading-6">@{tweet.user.screen_name}</span>
                    <TimeAgo datetime={tweet.created_at} className='text-ellipsis text-xs self-center ml-1 text-reddit_text-darker'/>
                </div>
            </div>
            <div>
                <h3 className="break-words mb-4 text-lg">{tweet.text}</h3>
            </div>
        </div>
    </div>
  )
}

export default TweetContent;