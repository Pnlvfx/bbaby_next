import PostContent from './PostContent';
import {isMobile} from 'react-device-detect';
import { useRouter } from 'next/router';
import GoogleAdsense from '../google/GoogleAdsense';
import { useEffect, useState } from 'react';

interface ExtendPostProps {
    post: PostProps
    isListing?: boolean
    open?: boolean
    index?: number
}

const Post = ({post, isListing, open, index}:ExtendPostProps) => {
    const router = useRouter()
    const url = isMobile ? `/b/${post.community}/comments/${post._id}` : router.pathname;
    const query = isMobile ? undefined : {postId : post._id, community: post.community, username: post.author}
    const as = isMobile ? undefined : `/b/${post.community}/comments/${post._id}`

    const [isAds, setIsAds] = useState(false);

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') return;
        if (index === 3) {
            setIsAds(true);
        }
    }, [index])

    

    return (
   <div>
        <div>
            {open && (
                <div className={`border rounded-md border-none`} >
                    <PostContent post={post} />
                </div>
            )}
            {!open && (
                <>
                {!isAds ? (
                    <div className={`bg-[#141415] w-full mb-3 border border-reddit_border rounded-md hover:border-reddit_text cursor-pointer`}
                    onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        router.push({
                            pathname: url,
                            query,
                        }, as, {scroll: false})
                    }}
                >
                    {
                    !isAds &&
                    <PostContent post={post} isListing={isListing}/>
                    }
                </div>
                ):
                <GoogleAdsense />
                }
                </>
            )}
        </div>
   </div>
  )
}

export default Post;