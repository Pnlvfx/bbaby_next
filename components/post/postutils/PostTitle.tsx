import Link from "next/link";
import { useSession } from "../../auth/UserContext";

interface PostTitle {
    isListing?: boolean
    post: PostProps
}

const PostTitle = ({post, isListing}: PostTitle) => {
    const {session} = useSession();
    const titleClass = `text-[18px] leading-[22px] words-breaks inline`
  return (
    <div className="mx-2">
        <div className="inline align-baseline">
        {isListing ? (
            <>
            {session?.device?.mobile ? (
            <div className='overflow-hidden break-words box-border block pointer-events-none'>
                <Link href={`/b/${post.community}/comments/${post._id}`}>
                <a className={`whitespace-pre-wrap text-[#D7DADC] ${titleClass} ${
                    !post.title && 'loading'
                }`}>
                    {post.title}
                </a>
                </Link>
            </div>
            ) : (
            <p
                className={`whitespace-pre-wrap text-[#D7DADC] ${titleClass} ${
                !post.title && 'loading'
                }`}
            >
                {post.title}
            </p>
            )}
            </>
        ) : (
            <h1
            className={`whitespace-pre-wrap text-[#D7DADC] ${titleClass} ${
                !post.title && 'loading'
            }`}
            >
            {post.title}
            </h1>
        )}
        </div>
    </div>
  )
}

export default PostTitle