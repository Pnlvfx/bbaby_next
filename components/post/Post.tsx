import PostContent from './PostContent'
import { isMobile } from 'react-device-detect'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface ExtendPostProps {
  post: PostProps
  isListing?: boolean
  open?: boolean
  index?: number
}

const Post = ({ post, isListing, open, index }: ExtendPostProps) => {
  const router = useRouter()
  const url = isMobile
    ? `/b/${post.community}/comments/${post._id}`
    : router.pathname
  const query = isMobile
    ? undefined
    : { postId: post._id, community: post.community, username: post.author }
  const as = isMobile ? undefined : `/b/${post.community}/comments/${post._id}`

  const [isAds, setIsAds] = useState(false)

  // useEffect(() => {
  //     if (index === 3) {
  //         setIsAds(true);
  //     }
  // }, [index])

  return (
    <div>
      <div>
        {open && (
          <div className={`rounded-md border border-none`}>
            <PostContent post={post} />
          </div>
        )}
        {!open && (
          <div
            className={`mb-3 w-full cursor-pointer rounded-md border border-reddit_border bg-[#141415] hover:border-reddit_text`}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              router.push(
                {
                  pathname: url,
                  query,
                },
                as,
                { scroll: false }
              )
            }}
          >
            {<PostContent post={post} isListing={isListing} />}
          </div>
        )}
      </div>
    </div>
  )
}

export default Post;
