import Image from "next/image";
import TimeAgo from "timeago-react";
import { COLORS } from "../../main/config";
import VideoPlayer from "../../utils/video/VideoPlayer";

interface ExtendRedditPosts {
    post: RedditPosts['data']
}

const RedditPost = ({post}: ExtendRedditPosts) => {
    const postClasses = `border rounded-md hover:border-reddit_text border-reddit_border cursor-pointer`;
    console.log(post)
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        className={postClasses}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <div
          style={{
            backgroundColor: COLORS.brighter,
            display: 'flex',
            maxHeight: 800,
            overflow: 'hidden',
            borderRadius: 6,
          }}
        >
          {/* <div className="w-10 flex-none bg-[#141415]">
            <Voting ups={post.ups} postId={post._id} liked={post.liked} />
          </div> */}
          <div style={{ width: '100%', padding: 8 }}>
            <div
              className={`mb-3 flex h-5 w-full items-center ${
                !post.subreddit &&
                !post.thumbnail &&
                !post.author &&
                'loading overflow-hidden'
              }`}
            >
            <div
                className="flex items-center space-x-2"
                onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                }}
            >
                {/* {post.thumbnail && (
                <div className="h-5 w-5 rounded-full bg-reddit_dark-brightest">
                    <img
                    role={'presentation'}
                    src={post.thumbnail}
                    alt=""
                    style={{ borderRadius: 9999 }}
                    height={20}
                    width={20}
                    />
                </div>
                )} */}
                <span className={`text-xs font-bold hover:underline`}>{' '}
                {post.subreddit ? 'b/' + post.subreddit + ' ' + '-' + ' ' : null}
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
              <p
                className={`mb-4 min-h-[24px] overflow-hidden whitespace-pre-wrap break-words font-extrabold leading-6 ${
                  !post.title && 'loading'
                }`}
              >
                {post.title}
              </p>
            {post?.url && (
              <div className="flex max-h-[500px] w-full items-center justify-center overflow-hidden">
                <img
                  src={`${post.url}`}
                  alt=""
                  style={{
                    maxWidth: '100%',
                    position: 'relative',
                    display: 'block'
                  }}
                />
              </div>
            )}
            {post?.is_video && post?.media?.reddit_video.dash_url && post.thumbnail && (
              <VideoPlayer
                src={post.media?.reddit_video.fallback_url}
                poster={post.thumbnail}
                height={post.media.reddit_video.height}
                width={post.media.reddit_video.width}
              />
            )}
            {post.selftext && (
              <div className="resize-x-none flex-none break-words text-sm leading-6">
                <p className="whitespace-pre-wrap">{post.selftext}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RedditPost
