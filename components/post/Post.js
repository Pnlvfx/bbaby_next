import Link from 'next/link'
import PostContent from './PostContent'
import {isMobile} from 'react-device-detect'
import {useRef} from 'react'
import { useRouter } from 'next/router'


function Post(props) {
    const filePickerRef = useRef(null);
    const filePickerRefShare = useRef(null);
    const filePickerRefMore = useRef(null);
    const router = useRouter()

    const post = props
    const {loadingPosts} = props
    
    let postClasses = 'block border border-reddit_border rounded-md ' + (post.open ? '' : "hover:border-reddit_text")

    return (
    <div className='pb-3'>
        {post.open && (
            <div className={postClasses}>
                    <PostContent {...post} loadingPosts={loadingPosts}/>
            </div>
        )}

        {!post.open && (
            <>
                <div className={postClasses} tabIndex='-1'>
                    {!isMobile && (
                        <>
                        <Link href={`${router.pathname}?postId=${post._id}&community=${post.community}`} as={`/b/${post.community}/comments/${post._id}`} scroll={false}> 
                        <a>
                            <PostContent {...post} loadingPosts={loadingPosts} filePickerRef={filePickerRef} filePickerRefShare={filePickerRefShare} filePickerRefMore={filePickerRefMore} />
                        </a>
                        </Link>
                        <button id='commentButtonRef' onClick={e => { //using reference to get the correct comment Id
                            e.preventDefault()
                                router.push({
                                    pathname: '/',
                                    query: {postId: props._id, community: props.community }
                                },'/b/'+props.community+'/comments/'+props._id,{scroll:false}
                                )
                            
                            }} hidden ref={filePickerRef}>
                        </button>
                        </>
                    )}
                    {isMobile && (
                        <>
                        <Link href={'/b/'+post.community+'/comments/'+post._id}>
                            <a>
                                <PostContent {...post} loadingPosts={loadingPosts} filePickerRef={filePickerRef} filePickerRefShare={filePickerRefShare} filePickerRefMore={filePickerRefMore} />
                            </a>
                        </Link>
                        <button onClick={e => { //using reference to get the correct comment Id
                                e.preventDefault()
                                    router.push({
                                        pathname: '/b/'+post.community+'/comments/'+post._id,
                                    },undefined,{scroll:false}
                                    )
                                }} hidden ref={filePickerRef}>
                        </button>
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