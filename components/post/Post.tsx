import PostContent from './PostContent';
import {isMobile} from 'react-device-detect';
import { useRouter } from 'next/router';

interface ExtendPostProps {
    post: PostProps
    isListing?: boolean
    open?: boolean
}

const Post = ({post, isListing, open}:ExtendPostProps) => {
    const router = useRouter()
    const url = isMobile ? `/b/${post.community}/comments/${post._id}` : router.pathname;
    const query = isMobile ? undefined : {postId : post._id, community: post.community, username: post.author}
    const as = isMobile ? undefined : `/b/${post.community}/comments/${post._id}`
    
    return (
   <div>
        <div>
            {open && (
                <div className={`border rounded-md border-none bg-reddit_dark-brighter`} >
                    <PostContent post={post} />
                </div>
            )}
            {!open && (
                <div className={`bg-reddit_dark-brighter w-full mb-3 border border-reddit_border rounded-md hover:border-reddit_text cursor-pointer`}
                    onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        router.push({
                            pathname: url,
                            query,
                        }, as, {scroll: false})
                    }}
                >
                    <PostContent post={post} isListing={isListing}/>
                </div>
            )}
        </div>
   </div>
  )
}

export default Post;