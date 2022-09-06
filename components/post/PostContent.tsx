import TimeAgo from 'timeago-react';
import ShareButton from './postutils/ShareButton';
import { useRouter } from 'next/router';
import MoreButton from './postutils/MoreButton';
import Image from 'next/image';
import Voting from './Voting';
import { CommentIcon } from '../utils/SVG';
import Link from 'next/link';
import { isMobile } from 'react-device-detect';
import { CSSProperties, } from 'react';
import Video from '../utils/video/Video';

type PostContentProps = {
  post: PostProps
  isListing?: boolean
}

const PostContent = ({ post, isListing }: PostContentProps) => {
  const router = useRouter()
  const titleStyle: CSSProperties = {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: '22px',
    wordWrap: 'break-word',
    display: 'inline'
   }
  return (
  <div className='bg-reddit_dark-brighter md:pl-10 flex max-h-[800px] relative' style={{ borderRadius: 6 }}>
      <div className="w-10 md:flex flex-col items-center box-border left-0 absolute py-2 pr-1 top-0 hidden" style={{borderLeft: '4px solid transparent'}}>
        <div className='md:flex items-center flex-col hidden'>
          <Voting ups={post.ups} postId={post._id} liked={post.liked} />
        </div>
      </div>
      <div className=' pt-2 w-full'>
        <div className={`text-[12px] items-start flex mx-2 mb-2 relative leading-4`}>
          <div className='flex-none align-baseline'>
            <Link href={`/b/${post.community}`}>
              <a className=' font-bold inline leading-5 align-baseline'
               onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                router.push({
                  pathname: '/b/' + post.community,
                })
              }}>
                {post.communityIcon && 
                  <div className='mr-1 bg-[#4c075a] rounded-full w-5 h-5 inline-block align-middle'>
                    <Image
                      role={'presentation'}
                      src={post.communityIcon}
                      alt=""
                      className='rounded-full'
                      height={20}
                      width={20}
                    />
                  </div>
                }
              </a>
            </Link>
          </div>
          <div className='flex items-center flex-wrap flex-grow flex-shrink overflow-hidden'>
            <div className='inline font-normal items-center leading-4'>
                <div className='inline-block flex-none'>
                  <Link href={`/b/${post.community}`}>
                    <a
                      className="font-bold inline leading-5 hover:underline align-baseline"
                      onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        router.push({
                          pathname: '/b/' + post.community,
                        })
                      }}
                    >
                      {post.community ? 'b/' + post.community : null}
                    </a>
                  </Link>
                </div>
                <span className='mx-1 text-[6px] leading-5 align-middle'>-</span>
                <span className='text-reddit_text-darker flex-none align-baseline'>Posted by</span>{' '}
                <div className=" text-reddit_text-darker inline-block flex-none">
                  <div>
                    <Link href={`/user/${post.author}`}>
                      <a className='hover:underline'
                        onClick={(event) => {
                          event.preventDefault()
                          event.stopPropagation()
                          router.push(`/user/${post.author}`)
                        }}
                      >
                        {post.author && 'u/' + post.author}
                      </a>
                    </Link>
                  </div>
              </div>
              <TimeAgo className='ml-[3px] font-normal text-reddit_text-darker' datetime={post.createdAt} />
              </div>
          </div>
        </div>
        <div className='mx-2'>
          <div className='inline align-baseline'>
            {isListing ?
              <p style={titleStyle} className={`text-[#D7DADC] whitespace-pre-wrap ${!post.title && 'loading'}`}>{post.title}</p>
              : 
              <h1 style={titleStyle} className={`text-[#D7DADC] whitespace-pre-wrap ${!post.title && 'loading'}`}>{post.title}</h1>
            }
          </div>
        </div>
        <div className='mt-2'>
          <div className='max-h-[512px] relative overflow-hidden'>
            {post?.mediaInfo?.isImage && post?.mediaInfo?.image && (
              <Image
                src={`${post.mediaInfo.image}`}
                alt=""
                height={post.mediaInfo.dimension[0]}
                width={post.mediaInfo.dimension[1]}
              />
            )}
            {post?.mediaInfo?.isVideo && post?.mediaInfo?.video && (
              <>
                <div className='pb-[105.35%] w-full' />
                  <div className='absolute top-0 left-0 bottom-0 right-0'>
                    <Video
                      url={post.mediaInfo.video.url}
                      poster={post.mediaInfo.video.url.replace('mp4', 'jpg')}
                      scroll={isListing}
                  />
                </div>
              </>
            )}
            {post.body && (
              <div className="resize-x-none flex-none break-words text-sm leading-6">
                <p className='whitespace-pre-wrap'>
                  {post.body}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex h-[40px] flex-row px-[2px]">
          <div className='text-[12px] text-reddit_text-darker font-bold leading-4 flex overflow-hidden flex-grow pr-2 pl-1' style={{alignItems: 'stretch'}}>
            <div className='px-[2px] flex flex-row items-center md:hidden'>
              <Voting ups={post.ups} postId={post._id} liked={post.liked} />
            </div>
              <Link
                href={`/b/${post.community}/comments/${post._id}`}
                scroll={false}
              >
                <a className='p-2 hover:bg-reddit_dark-brightest mr-1 flex items-center box-border'
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
                <CommentIcon role='presentation' />
                <span className='ml-[6px]'>{post.numComments} Comments</span>
                </a>
              </Link>
              <ShareButton community={post.community} postId={post._id} />
              <MoreButton post={post} postId={post._id} />
            </div>
          </div>
      </div>
    </div>
  )
}

export default PostContent;

