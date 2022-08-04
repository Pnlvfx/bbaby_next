import TimeAgo from 'timeago-react'
import ShareButton from './postutils/ShareButton'
import { useRouter } from 'next/router'
import MoreButton from './postutils/MoreButton'
import Image from 'next/image'
import Voting from './Voting'
import { CommentIcon } from '../utils/SVG'
import Link from 'next/link'
import { isMobile } from 'react-device-detect'

type PostContentProps = {
  post: PostProps
  isListing?: Boolean
}

const PostContent = ({ post, isListing }: PostContentProps) => {
  const router = useRouter()

  let height: number | undefined = 0
  let width = 0

  if (post?.mediaInfo?.isImage || post?.mediaInfo?.isVideo) {
    height = post.mediaInfo.dimension[0]
    width = post.mediaInfo.dimension[1]
  }

  return (
    <div className="flex max-h-[800px] overflow-hidden rounded-md bg-reddit_dark-brighter">
      <div className="w-10 flex-none bg-[#141415]">
        <Voting
          ups={post.ups}
          postId={post._id}
          liked={post.liked}
          author={post.author}
        />
      </div>
      <div className="w-full p-2">
        <div id='post_header' className="mb-3 flex w-full items-center h-5">
          <Link href={`/b/${post.community}`}>
            <a
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                router.push({
                  pathname: '/b/' + post.community,
                })
              }}
              className="flex items-center space-x-2"
            >
                <Image
                  src={post.communityIcon}
                  alt=""
                  className="rounded-full"
                  height={20}
                  width={20}
                />
              <span className="text-xs font-bold hover:underline">
                b/{post.community}
              </span>
            </a>
          </Link>
          <span className="mx-1 text-sm">-</span>
          <div className="truncate text-xs text-reddit_text-darker">
            <span>Posted by</span>{' '}
            <Link href={`/user/${post.author}`}>
              <a
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  router.push(`/user/${post.author}`)
                }}
              >
                <span className="hover:underline">
                  b/{post.author}
                </span>
              </a>
            </Link>{' '}
            <TimeAgo datetime={post.createdAt} className="truncate" />
          </div>
        </div>
          {isListing ? 
          <p className="whitespace-pre-wrap mb-4 break-words font-extrabold leading-6">{post.title}</p>
           : 
           <h1 className="whitespace-pre-wrap mb-4 break-words font-extrabold leading-6">{post.title}</h1>}
        {post?.mediaInfo?.isImage && post?.mediaInfo?.image && (
          <div className="container max-h-[500px]">
            <Image
              src={`${post.mediaInfo.image}`}
              alt=""
              height={height}
              width={width}
              objectFit={'contain'}
            />
          </div>
        )}
        {post?.mediaInfo?.isVideo && post?.mediaInfo?.video && (
          <video
          style={{backgroundColor: 'rgb(0,0,0)'}}
            className={`aspect-video`}
            src={post.mediaInfo.video.url}
            poster={post.mediaInfo.video.url.replace('mp4', 'jpg')}
            controls
            height={height}
            width={width}
          />
        )}
        {post.body && (
          <div className="resize-x-none flex-none break-words text-sm leading-6">
            <p className='whitespace-pre-wrap'>
              {post.body}
            </p>
          </div>
        )}
        <div className="flex h-[36px]">
          <Link
            href={`/b/${post.community}/comments/${post._id}`}
            scroll={false}
          >
            <a
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                if (isListing) {
                  if (isMobile) {
                    router.push(
                      {
                        pathname: `/b/${post.community}/comments/${post._id}`,
                      },
                      undefined,
                      { scroll: false }
                    )
                  } else {
                    router.push(
                      {
                        pathname: router.pathname,
                        query: {
                          postId: post._id,
                          community: post.community,
                          username: post.author,
                        },
                      },
                      '/b/' + post.community + '/comments/' + post._id,
                      { scroll: false }
                    )
                  }
                }
              }}
            >
              <div className="flex items-center rounded-sm p-2 text-sm text-reddit_text-darker hover:bg-reddit_hover">
                <CommentIcon style={{ height: 20, width: 20 }} />
                <p className="ml-1">{post.numComments} Comments</p>
              </div>
            </a>
          </Link>
          <ShareButton community={post.community} postId={post._id} />
          <MoreButton post={post} postId={post._id} />
        </div>
      </div>
    </div>
  )
}

export default PostContent
