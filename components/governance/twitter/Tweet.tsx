import Image from 'next/image';
import { useContext, useState } from 'react';
import TimeAgo from 'timeago-react'
import { translate } from '../../API/governance/governanceAPI';
import { TimeMsgContext, TimeMsgContextProps } from '../../main/TimeMsgContext';
import SubmitLayout from '../../submit/SubmitLayout';
import Video from '../../utils/video/Video';

type TweetPageProps = {
  user_avatar: string
  language: string
  username: string
  screen_name: string
  created_at: string
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
    if (res?.ok) {
      if (res instanceof Response) {
        const tweetTitle = await res.json()
        setNewTweet({
          title: tweetTitle,
          image: image ? image : null,
          width: width ? width : null,
          height: height ? height : null,
          video: video ? video : null,
          type: type ? type : null
        })
        setShowSubmit(true)
      }
    } else {
        const data:any = await res?.json()
        setMessage({ value: data.msg, status: 'error' });
    }
  }

  //if (!video) return null;

  return (
      <div>
        <div>
          <div className="bg-[#141415] w-full mb-3 border border-reddit_border rounded-md hover:border-reddit_text cursor-pointer">
            <div className='md:pl-10 flex max-h-[800px] relative' style={{borderRadius: 6}}>
              <div className="w-10 md:flex flex-col items-center box-border left-0 absolute py-2 pr-1 top-0 hidden" style={{borderLeft: '4px solid transparent'}}>
                <div className='md:flex items-center flex-col hidden'>
                  
                </div>
              </div>
              <div className="bg-reddit_dark-brighter pt-2 w-full">
                <div className="text-[12px] items-start flex mx-2 mb-2 relative leading-4">
                  <div className="flex-none align-baseline">
                    <div className='mr-1 bg-[#4c075a] rounded-full w-5 h-5 inline-block align-middle'>
                      <Image
                        role={'presentation'}
                        src={user_avatar}
                        alt="twitter_user_image"
                        className='rounded-full'
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                  <div className='flex items-center flex-wrap flex-grow flex-shrink overflow-hidden'>
                    <div className='inline items-center leading-4'>
                      <div className='inline-block flex-none'>
                        <span className="ml-1 text-sm font-bold leading-6">{username}{` - `}</span>
                      </div>
                      <span className="ml-1 text-xs font-bold leading-6 text-reddit_text-darker">@{screen_name}</span>
                      <TimeAgo datetime={created_at} className="ml-1 text-ellipsis text-xs text-reddit_text-darker leading-6" />
                    </div>
                  </div>
                </div>
                <div className='mx-2'>
                  <div className='inline align-baseline'>
                    <h1 className="mb-4 break-words text-lg">{title}</h1>
                  </div>
                </div>
                <div className="mt-2 max-h-[512px] relative overflow-hidden">
                  {type === 'photo' && image && width && height && (
                    <Image
                      src={image}
                      height={height}
                      alt=""
                      width={width}
                    />
                  )}
                  {type === 'video' && video && image && width && height && (
                    <div className='pb-[105.35%] w-full'>
                      <div className='absolute top-0 left-0 bottom-0 right-0'>
                        <Video
                          url={video}
                          poster={image}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className='flex h-[40px] flex-row px-2[2px]'>
                  <div className='text-[12px] text-reddit_text-darker font-bold leading-4 flex overflow-hidden flex-grow pr-2 pl-1' style={{alignItems: 'stretch'}}>
                    <div className='mr-1 flex items-center'>
                      <button className='hover:bg-reddit_dark-brightest p-2 flex h-full items-center' style={{borderRadius: '2px'}} type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          if (showSubmit) {
                            setShowSubmit(false)
                          } else {
                            doTranslate()
                          }
                        }}
                      >
                        <span className='text-left overflow-hidden text-ellipsis leading-3 max-h-[36px]'>Magic</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {showSubmit && <SubmitLayout newTweet={newTweet} />}
          </div>
        </div>
      </div>
  )
}

export default Tweet
