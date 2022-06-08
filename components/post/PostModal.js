import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import ClickOutHandler from "react-clickout-handler";
import Comment from '../comments/Comment';
import {GrDocumentText} from 'react-icons/gr'
import Image from "next/image";
import closeIcon from '../../public/closeIcon.svg'

function CommentModal(props) {

  let router = useRouter();

  const [post,setPost] = useState({});
  const [loading,setLoading] = useState(true)

  const visibleClass = props.open ? 'block' : 'hidden'

  const {postId} = props

  useEffect(() => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    axios.get(server+'/posts/'+postId, {withCredentials:true})
    .then(response => {
      setPost(response.data)
      setLoading(false)
    });
  },[postId]);


  return (
    <>
      <ClickOutHandler onClickOut={() => {
        router.push({pathname:'/'},`/`,{scroll:false})
        props.onClickOut()
        setLoading(true)
        setPost({})
        
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
                props.onClickOut()
                setLoading(true)
                setPost({})
                }} className="text-right ml-auto flex pt-4 pb-8">
                  <div className="mr-1">
                  <Image src={closeIcon} alt="" width={'20px'} height={'20px'} style={{filter:'invert(80%)'}} />
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
        </div>
      </ClickOutHandler>
    </>
  )
}

export default CommentModal;