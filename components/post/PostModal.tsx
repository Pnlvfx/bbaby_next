import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react"
import ClickOutHandler from "react-clickout-ts";
import Comment from '../comments/Comment';
import {GrDocumentText} from 'react-icons/gr';
import { CloseIcon } from "../utils/SVG";
import CommunitiesInfo from "../widget/CommunitiesInfo";
import { CommunityContext, CommunityContextProps } from "../community/CommunityContext";
import Donations from "../widget/Donations";
import { getPost } from "./APIpost";

type PostModalProps = {
  community?: string
  postId?: string
  open: boolean
  onClickOut: Function
}

const PostModal = ({community,postId,open,onClickOut}:PostModalProps) => {
  const router = useRouter();
  const [post,setPost] = useState<PostProps>({} as PostProps);
  const [loading,setLoading] = useState(true)
  const visibleClass = open ? 'block' : 'hidden'
  const {getCommunity} = useContext(CommunityContext) as CommunityContextProps;

  useEffect(() => {
    if(!postId) return;
    getPost(postId)
    .then(res => {
      setPost(res)
      if (!community) {
        getCommunity(res.community)
      }
      setLoading(false)
    });
  },[postId]);


  const [isCategoryDropdownOpen,setIsCategoryDropdownOpen] = useState(false)

  const clickOut = () => {
    if (isCategoryDropdownOpen) return
    router.push({
      pathname:router.pathname,
      query: community ? {community: community} : {username: post?.author}
    },
    router.pathname,{scroll:false}
    )
    onClickOut()
    setPost({} as PostProps)
  }

  if (!postId) return null;

  return (
    <div className={"w-full z-20 flex items-center justify-center " + visibleClass} style={{backgroundColor:'rgb(25,25,25'}}>
      <ClickOutHandler onClickOut={() => {
        clickOut()
        }}>
      <div className="bg-reddit_dark items-center w-[75%] max-w-[1300px] justify-center flex">
          <div className="w-[85%]">
            {!loading ? (<div className="flex justify-center">
              <div className={`flex pt-4 pb-10 w-full overflow-hidden`}>
                <GrDocumentText className="w-4 h-4 text-reddit_text"/>
                <p className='text-sm flex-none text-ellipsis'>{post.title}</p>
              </div>
              <button title='close' id="closeButton" onClick={() => {
                clickOut()
                }} className="text-right ml-auto flex pt-4 pb-8">
                  <div className="mr-1">
                    <CloseIcon style={{height: 20, width: 20}} />
                  </div>
                <p className="text-xs font-bold mt-[2px]">Close</p>
              </button>
          </div>) : (<div id="loading" className="h-76 pt-4 pb-10 w-[99%] overflow-hidden loading" />)}
          {!loading ? (
            <div className="block lg:flex space-x-4 justify-center">
            <Comment post={post} postId={postId}/>
              <div className="hidden lg:block">
                <CommunitiesInfo isCategoryDropdownOpen={isCategoryDropdownOpen} setIsCategoryDropdownOpen={setIsCategoryDropdownOpen} />
                <Donations />
              </div>
          </div>
          ) : (<div id="loading-2" className="h-full" />)}
          </div>
      </div>
      </ClickOutHandler>
    </div>
  )
}

export default PostModal;