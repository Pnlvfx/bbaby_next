import { CSSProperties, useContext, useState } from "react";
import TimeAgo from "timeago-react";
import { catchErrorWithMessage, urlisImage } from "../../API/common";
import { translate } from "../../API/governance/governanceAPI";
import { TimeMsgContext, TimeMsgContextProps } from "../../main/TimeMsgContext";
import SubmitLayout, { newTweetProps } from "../../submit/SubmitLayout";
import Video from "../../utils/video/Video";

interface ExtendRedditPosts {
    post: RedditPostsProps['data']
}

const RedditPost = ({post}: ExtendRedditPosts) => {
  const message = useContext(TimeMsgContext) as TimeMsgContextProps;
  const [newReddit, setNewReddit] = useState<newTweetProps | undefined>(undefined);
  const [showSubmit, setShowSubmit] = useState(false);

  //if (!urlisImage(post.url)) return null

  const titleStyle: CSSProperties = {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: '22px',
    wordWrap: 'break-word',
    display: 'inline'
   }

   const doTranslate = async () => {
    try {
      const res = await translate(post.title, 'en');
      if (res.ok) {
        const newTitle = await res.json();
        if (post.selftext) { 
          await translate(post.selftext, 'en');
          const body = await res.json();
        }
        const isImage = urlisImage(post.url)
        const type = post.is_video ? 'video' : urlisImage(post.url) ? 'photo' : undefined
        setNewReddit({
          ...newReddit,
          title: newTitle,
          image: post.url ? post.url : undefined,
          video: post.is_video ? post?.media?.reddit_video.dash_url : undefined,
          width: type === 'video' ? post.media?.reddit_video.width : post.preview.images[0].source.width,
          height: type === 'video' ? post.media?.reddit_video.height : post.preview.images[0].source.height,
          type
        })
        setShowSubmit(true);
      }
    } catch (err) {
      catchErrorWithMessage(err, message)
    }
   }

   //if (!post.is_video) return null
  return (
    <div>
      <div
        className={`bg-[#141415] w-full mb-3 border border-reddit_border rounded-md hover:border-reddit_text cursor-pointer`}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <div className='md:pl-10 flex max-h-[800px] relative rounded-[6px]' >
          {/* <div className="w-10 flex-none bg-[#141415]">
            <Voting ups={post.ups} postId={post._id} liked={post.liked} />
          </div> */}
          <div className="bg-reddit_dark-brighter pt-2 w-full">
            <div className='text-[12px] items-start flex mx-2 mb-2 relative leading-4'>
            <div className="flex items-center space-x-2"
                onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                }}
            >
                {/* {post.sr_detail.community_icon && (
                <div className="h-5 w-5 rounded-full bg-reddit_dark-brightest">
                    <img
                    role={'presentation'}
                    src={post.sr_detail.community_icon}
                    alt=''
                    className='rounded-full'
                    height={20}
                    width={20}
                    />
                </div>
                )} */}
                <span className={`text-xs font-bold hover:underline`}>{' '}
                  {post.subreddit ? 'r/' + post.subreddit + ' ' + '-' + ' ' : null}
                </span>
            </div>
              <div className="ml-1 truncate text-xs text-reddit_text-darker flex">
                <span>{post.title && 'Posted by'}</span>{' '}
                  <div
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                    }}
                  >
                    <span className="hover:underline">
                      {post.author && 'u/' + post.author}
                    </span>
                  </div>
                {post.created_utc && (
                  <TimeAgo datetime={post.created_utc} className="truncate ml-1" />
                )}
              </div>
            </div>
            <div className="mx-2">
              <div className="inline align-baseline">
                <p className={`text-[#D7DADC] whitespace-pre-wrap`} style={titleStyle}>
                  {post.title}
                </p>
              </div>
            </div>
            <div className="mt-2">
              <div className="max-h-[512px] relative overflow-hidden">
                  {post?.url && (
                  <div className="flex max-h-[500px] w-full items-center justify-center overflow-hidden">
                    <img
                      src={`${post.url}`}
                      alt="Reddit Image"
                    />
                  </div>
                )}
                {post?.is_video && post?.media?.reddit_video.dash_url && post.thumbnail && (
                  <>
                    <div className="pb-[105.35%] w-full" />
                    <div className="absolute top-0 left-0 bottom-0 right-0">
                      <Video
                        url={post.media?.reddit_video.fallback_url}
                        poster={post.thumbnail}
                        scroll={true}
                      />
                    </div>
                  </>
                )}
                {post.selftext && (
                  <div className="resize-x-none flex-none break-words text-sm leading-6">
                    <p className="whitespace-pre-wrap">{post.selftext}</p>
                  </div>
                )}
              </div>
              <div className="flex h-[40px] px-[2px]">
                <div className='text-[12px] text-reddit_text-darker font-bold leading-4 flex overflow-hidden flex-grow pr-2 pl-1 items-stretch'>
                  <div className="mr-1 flex items-center">
                    <button 
                      className='hover:bg-reddit_dark-brightest p-2 flex h-full items-center rounded-[2px]' type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        doTranslate();
                      }}

                    >
                      <span>Magic</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showSubmit && <SubmitLayout newTweet={newReddit} />}
      </div>
    </div>
  )
}

export default RedditPost;
