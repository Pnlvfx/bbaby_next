import Link from 'next/link'
import PostContent from './PostContent'
import {isMobile} from 'react-device-detect'
import {useRef} from 'react'
import { useRouter } from 'next/router'


function Post(props) {
    const filePickerRefShare = useRef(null);
    const filePickerRefMore = useRef(null);
    const router = useRouter()

    const post = props
    
    let postClasses = 'block border border-reddit_border rounded-md ' + (post.open ? '' : "hover:border-reddit_text")

    return (
    <div className='pb-3'>
        {post.open && (
            <div className={postClasses} >
                    <PostContent {...post}/>
            </div>
        )}

        {!post.open && (
            <>
                <div className={postClasses} >
                    {!isMobile && (
                        <>
                        <Link href={`${router.pathname}?postId=${post._id}&community=${post.community}&username=${post.author}`} as={'/b/'+post.community+'/comments/'+post._id}
                         scroll={false}> 
                        <a>
                            <PostContent {...post} filePickerRefShare={filePickerRefShare} filePickerRefMore={filePickerRefMore} isListing={props.isListing}/>
                        </a>
                        </Link>
                        </>
                    )}
                    {isMobile && (
                        <>
                        <Link href={'/b/'+post.community+'/comments/'+post._id}>
                            <a>
                                <PostContent {...post} filePickerRefShare={filePickerRefShare} filePickerRefMore={filePickerRefMore} isListing={props.isListing} />
                            </a>
                        </Link>
                        </>
                    )}
                        <button onClick={() => { //using reference to get the correct share Id
                                    router.push({
                                        pathname: '/',
                                        query: {shareId: props._id, community: props.community },
                                    },'/',{scroll:false}
                                    )
                                }} hidden ref={filePickerRefShare}>
                        </button>
                        <button onClick={() => { //using reference to get the correct delete Id
                            router.push({
                                query: {deleteId: props._id, community: props.community },
                            },'/',{scroll:false}
                            )
                        }} hidden ref={filePickerRefMore}>

                        </button>
                </div>
            </>
        )}
    </div>
  )
}

export default Post;