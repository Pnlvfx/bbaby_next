import PostContent from './PostContent'
import {isMobile} from 'react-device-detect'
import { useRouter } from 'next/router'

interface ExtendPostProps {
    post: PostProps
    isListing?: boolean
    open?: boolean
}

const Post = ({post,isListing,open}:ExtendPostProps) => {
    const router = useRouter()
    let postClasses = `block border rounded-md ${!open && "hover:border-reddit_text border-reddit_border cursor-pointer"} ${open && "border-none"}`;
    const url = isMobile ? `/b/${post.community}/comments/${post._id}` : router.pathname;
    const query = isMobile ? undefined : {postId : post._id, community: post.community, username: post.author}
    const as = isMobile ? undefined : `/b/${post.community}/comments/${post._id}`

    return (
    <div className={`${isListing && "mb-3"}`}>
        {open && (
            <div className={postClasses} >
                <PostContent post={post} />
            </div>
        )}
        {!open && (
            <div className={postClasses}>
                <div onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    router.push({
                        pathname: url,
                        query,
                    }, as, {scroll: false})
                }}>
                    <PostContent post={post} isListing={isListing}/>
                </div>
            </div>
        )}
    </div>
  )
}

export default Post;