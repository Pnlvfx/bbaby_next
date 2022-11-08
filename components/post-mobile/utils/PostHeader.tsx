import Link from "next/link";
import TimeAgo from "timeago-react";
import { PostMobile } from "./VideoMobile";

const PostHeader = ({post}: PostMobile) => {
  return (
    <div className="flex items-center">
        <span className="items-center flex whitespace-nowrap relative flex-grow flex-shrink-0">
                <div className="text-[.875rem] pr-12 pl-4 py-2 items-center whitespace-nowrap flex-grow flex-shrink-0 flex mb-2 relative leading-5">
                    <div className="items-center flex text-[.875rem] whitespace-nowrap leading-5">
                        <span className="leading-[1px] text-[2rem] align-middle overflow-hidden flex-shrink-0 w-8 h-8 mr-2 whitespace-nowrap">
                            <Link href={`/b/${post.community.toLowerCase()}`}>
                                <span>
                                    <div className="rounded-full overflow-hidden">
                                        <div className="flex items-center text-center m-auto relative overflow-hidden">
                                            <img
                                                alt={`${post.community} icon`}
                                                className="bg-[#6FA5F4]"
                                                width={'100%'}
                                                height={'100%'}
                                                src={post.communityIcon}
                                            />
                                        </div>
                                    </div>
                                </span>
                            </Link>
                        </span>
                        <div>
                            <div className="font-semibold whitespace-nowrap leading-5 text-[.875rem]">
                                <span>
                                    <Link 
                                        href={`/b/${post.community.toLowerCase()}`}
                                        className="white-space-nowrap font-semibold"
                                    >
                                        r/{post.community}
                                    </Link>
                                </span>
                                <span className="inline-block mx-1 font-semibold">•</span>
                                <TimeAgo datetime={post.createdAt} className='whitespace-nowrap font-semibold text-reddit_text-darker' />
                            </div>
                            <div className="leading-6 text-[.75rem] text-reddit_text-darker whitespace-nowrap">
                                <span>Posted by </span>
                                <span>
                                    <Link href={`/user/${post.author.toLowerCase()}`}>
                                        {post.author}
                                    </Link>
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