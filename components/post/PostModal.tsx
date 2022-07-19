import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react"
import ClickOutHandler from "react-clickout-ts";
import Comment from '../comments/Comment';
import {GrDocumentText} from 'react-icons/gr'
import { CloseIcon } from "../utils/SVG";
import CommunitiesInfo from "../widget/CommunitiesInfo";
import { CommunityContext, CommunityContextProps } from "../community/CommunityContext";

type PostModalProps = {
  community?: string,
  postId: string | string[],
  open: Boolean,
  onClickOut: () => void
}
type PostProps = {
  author?: string,
  title?: string
}

function PostModal({community,postId,open,onClickOut}:PostModalProps) {

  const router = useRouter();

  const [post,setPost] = useState<PostProps>({});
  const [loading,setLoading] = useState(true)

  const visibleClass = open ? 'block' : 'hidden'
  const {getCommunity} = useContext(CommunityContext) as CommunityContextProps;

  useEffect(() => {
    if(!postId) return
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    axios.get(server+'/posts/'+postId, {withCredentials:true})
    .then(response => {
      setPost(response.data)
      getCommunity(response.data.community)
      setLoading(false)
    });
  },[postId]);

  return (
    <div className={"w-full z-20 flex items-center " + visibleClass} style={{backgroundColor:'rgb(25,25,25'}}>
      <div className="mx-[270px] bg-reddit_dark items-center">
        <ClickOutHandler onClickOut={() => {
          router.push({
            pathname:router.pathname,
            query: community ? {community: community} : {username: post.author}
          },
          router.pathname,{scroll:false}
          )
          onClickOut()
          setPost({})
        }}>
            {loading && (
              <div>Loading...</div>
            )}
            {!loading && (
              <div className="mx-28">
                <div className="flex">
                  <div className="flex pt-4 pb-10 w-full mr-4 overflow-hidden">
                    <GrDocumentText className="w-4 h-4"/>
                    <p className='text-sm flex-none text-ellipsis'>{post.title}</p>
                  </div>
                  <button title='close' id="closeButton" onClick={() => {
                    setLoading(true)
                    router.push({
                      pathname:router.pathname,
                      query: community ? {community: community} : {}
                    },
                    router.pathname,{scroll:false}
                    )
                    onClickOut()
                    setPost({})
                    }} className="text-right ml-auto flex pt-4 pb-8">
                      <div className="mr-1">
                        <CloseIcon style={{height: '20px', width: '20px'}} />
                      </div>
                    <h1 className="text-xs font-bold mt-[2px]">Close</h1>
                  </button>
              </div>
              <div className="flex">
                  <Comment post={post} postId={postId}/>
                  <CommunitiesInfo />
              </div>
              </div>
            )}
        </ClickOutHandler>
      </div>
    </div>
  )
}

export default PostModal;