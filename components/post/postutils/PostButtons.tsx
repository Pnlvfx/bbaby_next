import Link from "next/link";
import { useSession } from "../../auth/UserContext";
import { CommentIcon } from "../../utils/SVG";
import { PostContentProps } from "../PostContent";
import Voting from "../Voting";
import { openPost } from "./hooks";
import MoreButton from "./MoreButton";
import ShareButton from "./ShareButton";

const PostButtons = ({post, isListing}: PostContentProps) => {
    const {session} = useSession();
  return (
    <div className="flex h-[40px] flex-row px-[2px]">
        <div className="flex flex-grow items-stretch overflow-hidden pr-2 pl-1 text-[12px] font-bold leading-4 text-reddit_text-darker">
            <div className={`md:hidden flex flex-row items-center px-[2px] ${session?.device?.mobile && isListing && 'articleLink'}`}>
                <Voting ups={post.ups} postId={post._id} liked={post.liked} />
            </div>
            {isListing ? (
                <Link
                    href={`/b/${post.community.toLowerCase()}/comments/${post._id}`}
                    scroll={false}
                    className={`mr-1 box-border flex items-center p-2 hover:bg-reddit_dark-brightest ${session?.device?.mobile && 'articleLink'}`}
                        onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (isListing) {
                            openPost(
                            e,
                            session?.device?.mobile ? session.device.mobile : false,
                            post
                            )
                        }
                    }}
                >
                    <CommentIcon role="presentation" />
                    <span className="ml-[6px]">{post.numComments} Comments</span>
                </Link>
            ) : (
                <div className="mr-1 box-border flex items-center p-2">
                    <CommentIcon role="presentation" />
                    <span className="ml-[6px]">{post.numComments} Comments</span>
                </div>
            )}
            <ShareButton linkToCopy={'/b/' + post.community + '/comments/' + post._id} isListing={isListing} />
            <MoreButton post={post} postId={post._id} isListing={isListing} />
        </div>
    </div>
  )
}

export default PostButtons