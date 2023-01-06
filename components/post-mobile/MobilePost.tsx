import Voting from '../post/Voting'
import PostHeader from './utils/PostHeader'
import VideoMobile from './utils/VideoMobile'

interface MobilePostProps {
  post: PostProps
}

const MobilePost = ({ post }: MobilePostProps) => {
  const isImage =
    post.mediaInfo?.isImage && post.mediaInfo.image
      ? post.mediaInfo.image
      : false
  const isVideo =
    post.mediaInfo?.isVideo && post.mediaInfo?.video
      ? post.mediaInfo?.video
      : false
  const isMedia = isImage ? true : isVideo ? true : false

  return (
    <div
      style={{ gridTemplateColumns: 'auto 1fr auto' }}
      className="mb-2 box-border block bg-reddit_dark-brighter pt-2"
    >
      <PostHeader post={post} />
      <div style={{ gridColumn: '1/4' }} className="mb-1 block px-4">
        <h1 style={{ gridColumn: 1 / 2 }} className="text-[18px] leading-6">
          {post.title}
        </h1>
      </div>
      {isMedia && (
        <div className="post-content mt-1 bg-reddit_dark">
          {isImage && post.mediaInfo?.image && (
            <div className="relative block max-h-[100%]">
              <div className="block h-full max-h-[100vw] w-full object-contain">
                <img
                  width={'100%'}
                  className="h-full max-h-[100vw] w-full object-contain"
                  alt={`r/${post.community} - ${post.title}`}
                  src={post.mediaInfo.image}
                  loading={'eager'}
                  sizes={'(min-width: 1024px) 50vw, 100vw'}
                />
              </div>
            </div>
          )}
          {isVideo && post.mediaInfo?.video && <VideoMobile post={post} />}
        </div>
      )}
      <div
        style={{
          gridColumn: 1 / 4,
          gridTemplateColumns: 'repeat(2, auto) 1fr [last-line] auto',
        }}
        className="grid gap-2 py-2 px-4"
      >
        <div className="rounded-[200px] border border-solid border-transparent leading-5  ">
          <Voting ups={post.ups} postId={post._id} liked={post.liked} />
        </div>
      </div>
    </div>
  )
}

export default MobilePost
