import Image from 'next/image'
import Voting from './Voting'
import { useSession } from '../auth/UserContext'
import PostHeader from './postutils/PostHeader'
import PostTitle from './postutils/PostTitle'
import PostButtons from './postutils/PostButtons'
import { Video } from '@bbabystyle/next-video-player'
import { LOGO } from '../main/config'

export type PostContentProps = {
  post: PostProps
  isListing: boolean
}

const PostContent = ({ post, isListing }: PostContentProps) => {
  const { session } = useSession()
  return (
    <div className={`${session?.device?.mobile && isListing && 'pointer-events-none'} relative flex max-h-[800px] rounded-md md:pl-10`}>
      <div className="absolute left-0 top-0 box-border hidden w-10 flex-col items-center border-l-4 border-solid border-transparent py-2 pr-1 md:flex">
        <div className="hidden flex-col items-center md:flex">
          <Voting ups={post.ups} postId={post._id} liked={post.liked} />
        </div>
      </div>
      <div className="w-full bg-reddit_dark-brighter pt-2">
        {session?.device?.mobile && isListing ? (
          <header>
            <PostHeader post={post} isListing={isListing} />
          </header>
        ) : (
          <PostHeader post={post} />
        )}
        <PostTitle isListing={isListing} post={post} />
        <div className="mt-2">
          <div className="relative max-h-[512px] overflow-hidden">
            {post?.mediaInfo?.isImage && post?.mediaInfo?.image && (
              <Image src={`${post.mediaInfo.image}`} alt="Post image" height={post.mediaInfo.dimension[0]} width={post.mediaInfo.dimension[1]} />
            )}
            {post?.mediaInfo?.isVideo && post?.mediaInfo?.video && (
              <>
                <div className="w-full pb-[105.35%]" />
                <div className="absolute top-0 left-0 bottom-0 right-0">
                  <Video url={post.mediaInfo.video.url} poster={post.mediaInfo.video.url.replace('mp4', 'jpg')} scroll={isListing} Logo={LOGO} />
                </div>
              </>
            )}
            {post.body && (
              <div className="resize-x-none flex-none break-words text-sm leading-6">
                <p className="whitespace-pre-wrap">{post.body}</p>
              </div>
            )}
          </div>
        </div>
        {session?.device?.mobile ? (
          <>
            {isListing ? (
              <footer className="pointer-events-none">
                <PostButtons post={post} isListing={isListing} />
              </footer>
            ) : (
              <PostButtons post={post} isListing={isListing} />
            )}
          </>
        ) : (
          <PostButtons post={post} isListing={isListing} />
        )}
      </div>
    </div>
  )
}

export default PostContent
