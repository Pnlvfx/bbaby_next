import Link from 'next/link'
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
    let postClasses = 'block border border-reddit_border rounded-md ' + (open ? '' : "hover:border-reddit_text")

    return (
    <div className='pb-3'>
        {open && (
            <div className={postClasses} >
                <PostContent post={post} />
            </div>
        )}
        {!open && (
            <div className={postClasses} >
                <Link 
                    href={!isMobile ? `${router.pathname}?postId=${post._id}&community=${post.community}&username=${post.author}` : `/b/${post.community}/comments/${post._id}`} 
                    as={!isMobile ? '/b/'+post.community+'/comments/'+post._id : undefined}
                    scroll={false}>
                    <a>
                        <PostContent post={post} isListing={isListing} />
                    </a>
                </Link>
            </div>
        )}
    </div>
  )
}

export default Post;