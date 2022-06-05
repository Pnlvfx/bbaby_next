import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import ClickOutHandler from "react-clickout-handler";
import Comment from './Comment';
import {GrDocumentText} from 'react-icons/gr'
import Image from "next/image";

function CommentModal(props) {

  let router = useRouter();

  const server = process.env.NEXT_PUBLIC_SERVER_URL

  const [post,setPost] = useState({});

  const visibleClass = props.open ? 'block' : 'hidden'

  const {postId} = props

  useEffect(() => {
    axios.get(server+'/posts/'+postId)
    .then(response => {
      setPost(response.data)
    });
  },[postId]);

  return (
      <ClickOutHandler onClickOut={(event) => {
        event.preventDefault()
        router.push({pathname:'/'},`/`,{scroll:false})
        setPost({})
        props.onClickOut()
      }}>
        <div className={"fixed top-0 left-0 right-0 z-20 flex mx-32 " +visibleClass} style={{backgroundColor:'rgba(0,0,0,1'}}>
          <div className="py-[51px] w-full mx-8">
            <div className="flex">
              <div className="flex pt-4 pb-8 w-full mr-4 overflow-hidden">
              <GrDocumentText className="w-4 h-4 text-reddit_text bg-white mr-3" />
              <h1 className='text-sm flex-none'>{post.title}</h1>
              </div>
              <button id="closeButton" onClick={() => {
                    router.push({pathname:'/'},'/',{scroll:false})
                    setPost({})
                    props.onClickOut()
                }} className="text-right ml-auto flex pt-4 pb-8">
                  <div className="mr-1">
                  <Image src="/closeIcon.svg" alt="" width={'20px'} height={'20px'} style={{filter:'invert(80%)'}} />
                  </div>
                <h1 className="text-xs font-bold mt-[2px]">Close</h1>
                </button>
            </div>
          <div className="bg-reddit_dark-brighter">
          <div className="block overflow-scroll" style={{maxHeight:"calc(100vh - 200px)"}}>
            <Comment post={post} postId={postId} />
          </div>
        </div>
        </div>
        </div>
      </ClickOutHandler>
  )
}

export default CommentModal;