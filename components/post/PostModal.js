import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import ClickOutHandler from "react-clickout-ts";
import Comment from '../comments/Comment';
import {GrDocumentText} from 'react-icons/gr'
import { CloseIcon } from "../utils/SVG";

function PostModal(props) {

  let router = useRouter();

  const [post,setPost] = useState({});
  const [loading,setLoading] = useState(true)

  const visibleClass = props.open ? 'block' : 'hidden'

  const {postId,community} = props

  useEffect(() => {
    if(!postId) return
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    axios.get(server+'/posts/'+postId, {withCredentials:true})
    .then(response => {
      setPost(response.data)
      setLoading(false)
    });
  },[postId]);

  return (
    <div className={"fixed top-0 left-0 right-0 z-20 flex mx-32 " +visibleClass} style={{backgroundColor:'rgba(0,0,0,1'}}>
      <ClickOutHandler onClickOut={() => {
        setLoading(true)
        router.push({
          pathname:router.pathname,
          query: community ? {community: community} : {username: post.author}
        },
        router.pathname,{scroll:false}
        )
        props.onClickOut()
        setPost({})
        
      }}>
          <div className="py-[51px] w-full mx-8">
            <div className="flex">
              <div className="flex pt-4 pb-8 w-full mr-4 overflow-hidden">
                <GrDocumentText className="w-4 h-4 text-reddit_text bg-white mr-3" />
                <h1 className='text-sm flex-none'>{post.title}</h1>
              </div>
              <button title='close' id="closeButton" onClick={() => {
                setLoading(true)
                router.push({
                  pathname:router.pathname,
                  query: props.community ? {community: props.community} : {}
                },
                router.pathname,{scroll:false}
                )
                props.onClickOut()
                setPost({})
                }} className="text-right ml-auto flex pt-4 pb-8">
                  <div className="mr-1">
                    <CloseIcon style={{height: '20px', width: '20px'}} />
                  </div>
                <h1 className="text-xs font-bold mt-[2px]">Close</h1>
              </button>
          </div>
          {loading && (
            <div>Loading...</div>
          )}
            <div className="bg-reddit_dark-brighter">
              <div className="block overflow-scroll" style={{maxHeight:"calc(100vh - 200px)"}}>
                {!loading && (
                  <Comment post={post} postId={postId} />
                )}
              </div>
            </div>
          </div>
      </ClickOutHandler>
    </div>
  )
}

export default PostModal;