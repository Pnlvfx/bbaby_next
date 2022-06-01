import Link from 'next/link'
import PostContent from './PostContent'
import {isMobile} from 'react-device-detect'
import axios from 'axios'
import {useEffect,useState,useRef} from 'react'
import { useRouter } from 'next/router'



function Post(props) {
    const server = process.env.NEXT_PUBLIC_SERVER_URL

    const filePickerRef = useRef(null);
    const filePickerRefShare = useRef(null);
    const filePickerRefMore = useRef(null);
    const router = useRouter()

    //getting community Info
    const [subComments,setSubComments] = useState([]);


    function refreshCommentsLength() {
        const id = props._id || router.query.commentId
        if(id === undefined) return
        if(subComments.length === undefined) return
        axios.get(server+'/comments/length/'+id)
        .then(response => {
        setSubComments(response.data)
        })
    }

    useEffect(() => {
        refreshCommentsLength()
    },[subComments])

   
    let postClasses = 'block border border-reddit_border rounded-md ' + (props.open ? '' : "hover:border-reddit_text")

    return (
    <div className='pb-3'>
        {props.open && (
            <div className={postClasses}>
                    <PostContent {...props} subComments={subComments} />
            </div>
        )}

        {!props.open && (
            <>
                <div className={postClasses} tabIndex='-1'>
                    {!isMobile && (
                        <>
                        <Link href={`/?postId=${props._id}&community=${props.community}`} as={'/b/'+props.community+'/comments/'+props._id} scroll={false} >
                        <a>
                            <PostContent {...props} filePickerRef={filePickerRef} subComments={subComments} filePickerRefShare={filePickerRefShare} filePickerRefMore={filePickerRefMore} />
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
                        <Link href={'/b/'+props.community+'/comments/'+props._id}>
                            <a>
                                <PostContent {...props} subComments={subComments} filePickerRef={filePickerRef} filePickerRefShare={filePickerRefShare} filePickerRefMore={filePickerRefMore} />
                            </a>
                        </Link>
                        <button onClick={e => { //using reference to get the correct comment Id
                                e.preventDefault()
                                    router.push({
                                        pathname: '/b/'+props.community+'/comments/'+props._id,
                                    },'/b/'+props.community+'/comments/'+props._id,{scroll:false}
                                    )
                                }} hidden ref={filePickerRef}>
                        </button>
                        </>
                    )}
                        <button id='shareButtonRef' onClick={() => { //using reference to get the correct share Id
                                    router.push({
                                        pathname: '/',
                                        query: {shareId: props._id, community: props.community },
                                    },'/',{scroll:false}
                                    )
                                }} hidden ref={filePickerRefShare}>
                        </button>
                        <button id='moreButtonRef' onClick={() => {
                            router.push({
                                pathname: '/',
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