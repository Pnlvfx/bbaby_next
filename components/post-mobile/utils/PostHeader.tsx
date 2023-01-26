import Link from 'next/link'
import TimeAgo from 'react-timeago'
import { PostMobile } from './VideoMobile'

const PostHeader = ({ post }: PostMobile) => {
  return (
    <div className="flex items-center">
      <span className="relative flex flex-shrink-0 flex-grow items-center whitespace-nowrap">
        <div className="relative mb-2 flex flex-shrink-0 flex-grow items-center whitespace-nowrap py-2 pr-12 pl-4 text-[.875rem] leading-5">
          <div className="flex items-center whitespace-nowrap text-[.875rem] leading-5">
            <span className="mr-2 h-8 w-8 flex-shrink-0 overflow-hidden whitespace-nowrap align-middle text-[2rem] leading-[1px]">
              <Link href={`/b/${post.community.toLowerCase()}`}>
                <span>
                  <div className="overflow-hidden rounded-full">
                    <div className="relative m-auto flex items-center overflow-hidden text-center">
                      <img alt={`${post.community} icon`} className="bg-[#6FA5F4]" width={'100%'} height={'100%'} src={post.communityIcon} />
                    </div>
                  </div>
                </span>
              </Link>
            </span>
            <div>
              <div className="whitespace-nowrap text-[.875rem] font-semibold leading-5">
                <span>
                  <Link href={`/b/${post.community.toLowerCase()}`} className="white-space-nowrap font-semibold">
                    r/{post.community}
                  </Link>
                </span>
                <span className="mx-1 inline-block font-semibold">•</span>
                <TimeAgo date={post.createdAt} className="whitespace-nowrap font-semibold text-reddit_text-darker" />
              </div>
              <div className="whitespace-nowrap text-[.75rem] leading-6 text-reddit_text-darker">
                <span>Posted by </span>
                <span>
                  <Link href={`/user/${post.author.toLowerCase()}`}>{post.author}</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </span>
    </div>
  )
}

export default PostHeader
