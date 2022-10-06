import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { MouseEvent } from "react";
import TimeAgo from "timeago-react";
import { useSession } from "../../auth/UserContext";

type PostHeaderProps = {
    post: PostProps
    isListing?: boolean
}

const PostHeader = ({post, isListing}: PostHeaderProps) => {
    const {session} = useSession();
    const LinkToCommunity = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        e.stopPropagation()
        Router.push({
          pathname: `/b/${post.community.toLowerCase()}`,
        })
    }
  return (
    <div className={`relative mx-2 mb-2 flex items-start text-[12px] leading-4`}>
        <div className="flex-none align-baseline">
            <Link href={`/b/${post.community.toLowerCase()}`}>
                <a
                    aria-label="Community"
                    className={`inline align-baseline font-bold leading-5 ${session?.device?.mobile && isListing && 'articleLink'}`}
                    onClick={(e) => {
                        LinkToCommunity(e)
                    }}
                >
                {post.communityIcon && (
                    <div className="relative mr-1 inline-block h-5 w-5 rounded-full bg-[#4c075a] align-middle">
                        <Image
                            role={'presentation'}
                            src={post.communityIcon}
                            alt="Community Icon"
                            className="rounded-full"
                            layout="fill"
                        />
                    </div>
                )}
                </a>
            </Link>
        </div>
        <div className="flex flex-shrink flex-grow flex-wrap items-center overflow-hidden">
            <div className="inline items-center font-normal leading-4">
                <div className="inline-block flex-none">
                <Link href={`/b/${post.community.toLowerCase()}`}>
                    <a
                        className={`inline align-baseline font-bold leading-5 hover:underline ${session?.device?.mobile && isListing && 'articleLink'}`}
                        onClick={(e) => {
                            LinkToCommunity(e)
                        }}
                    >
                    {`b/${post.community}`}
                    </a>
                </Link>
                </div>
                <span className="mx-1 align-middle text-[6px] leading-5">-</span>
                <span className="flex-none align-baseline text-reddit_text-darker">
                Posted by
                </span>{' '}
                <div className=" inline-block flex-none text-reddit_text-darker">
                    <div>
                        <Link href={`/user/${post.author.toLowerCase()}`}>
                            <a
                                className={`hover:underline ${session?.device?.mobile && isListing && 'articleLink'}`}
                                onClick={(event) => {
                                event.preventDefault()
                                event.stopPropagation()
                                Router.push(`/user/${post.author.toLowerCase()}`)
                                }}
                            >
                                {'u/' + post.author}
                            </a>
                        </Link>
                    </div>
                </div>
                <TimeAgo
                    className="ml-[3px] font-normal text-reddit_text-darker"
                    datetime={post.createdAt}
                />
            </div>
        </div>
    </div>
  )
}

export default PostHeader