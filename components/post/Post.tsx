import PostContent from './PostContent'
import { useSession } from '../auth/UserContext'
import { openPost } from './postutils/hooks'
import Link from 'next/link'

interface ExtendPostProps {
  post: PostProps
  isListing: boolean
}

const Post = ({ post, isListing }: ExtendPostProps) => {
  const { session } = useSession()
  const containerClass = `rounded-md border ${
    isListing
      ? 'mb-3 w-full border-reddit_border bg-[#141415] hover:border-reddit_text'
      : 'border-none'
  }`
  
  return (
    <div>
      <div>
        {!session?.device?.mobile ? (
          <div
            className={`${containerClass} ${isListing && 'cursor-pointer'}`}
            onClick={(e) => {
              if (isListing) {
                openPost(e, false, post)
              }
            }}
          >
            <PostContent post={post} isListing={isListing} />
          </div>
        ) : (
          <>
            {isListing ? (
              <article className={`${containerClass} article`} id={post._id}>
                <Link
                  href={`/b/${post.community.toLowerCase()}/comments/${
                    post._id
                  }`}
                />
                <PostContent post={post} isListing={isListing} />
              </article>
            ) : (
              <PostContent post={post} isListing={isListing} />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Post
