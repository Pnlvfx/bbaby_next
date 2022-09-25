import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Comment from '../comments/Comment';
import {GrDocumentText} from 'react-icons/gr';
import { CloseIcon } from "../utils/SVG";
import { CommunityContext, CommunityContextProps } from "../community/CommunityContext";
import Donations from "../widget/Donations";
import { getPost } from "./APIpost";
import { AuthModalContext, AuthModalContextProps } from "../auth/modal/AuthModalContext";
import Widget from "../widget/Widget";

type PostModalProps = {
  community?: string
  postId: string
  open: boolean
  onClickOut: Function
}

const PostModal = ({community, postId, open, onClickOut}: PostModalProps) => {
  const router = useRouter();
  const [post, setPost] = useState<PostProps>({} as PostProps);
  const [loading, setLoading] = useState(true)
  const {getCommunity} = useContext(CommunityContext) as CommunityContextProps;
  const modalContext = useContext(AuthModalContext) as AuthModalContextProps;

  useEffect(() => {
    if(!postId) return;
    const g = async () => {
      try {
        const res = await getPost(postId);
        setPost(res);
        if (!community) {
          getCommunity(res.community);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    g();
  },[postId]);

  const clickOut = () => {
    router.push({
      pathname:router.pathname,
      query: community ? {community: community} : {username: post?.author}
    },
    router.pathname, {scroll: false}
    )
    onClickOut();
    setPost({} as PostProps);
  }

  if (!postId) return null;

  return (
    <>
    {!loading && (
      <div className={`${open ? 'fixed' : 'hidden'} top-12 bottom-0 h-full left-0 right-0 w-full z-20 bg-[rgb(25,25,25)]`}>
      <div 
        className="h-full overflow-y-auto relative w-full"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation()
          clickOut();
        }} 
      >
          <div onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            //prevent closing modal
          }} tabIndex={-1} className="bg-reddit_dark box-border h-12 left-0 mx-auto sticky max-w-[1280px] right-0 top-0 w-[calc(100%_-_160px)]">
            <div className="md:px-8 items-center flex box-border h-full m-auto max-w-[1128px] w-full">
              <div className={`flex items-center flex-grow w-full max-w-[calc(100%_-_324px)] `}>
                <div className="">

                </div>
                <i className="icon mr-2">
                  <GrDocumentText className="icon w-5 h-5 text-reddit_text"/>
                </i>
                <div className="flex min-w-0 realtive break-words">
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[14px] leading-[18px] inline pr-[5px] break-words font-medium">
                    <h1 className='inline '>{post.title}</h1>
                  </div>
                </div>
              </div>
              <div className="flex justify-end ml-3 w-[312px] text-[12px] font-bold leading-4">
                <button 
                  role={'button'} 
                  tabIndex={0} 
                  title='Close' 
                  aria-label="Close" 
                  className="hover:bg-reddit_dark-brighter relative border border-transparent text-[12px] font-bold min-h-[24px] min-w-[24px] py-1 px-2 flex items-center rounded-full box-border justify-center text-center w-auto" 
                  onClick={() => {
                    clickOut()
                  }} >
                <i className='inline-block pr-1'>
                  <CloseIcon className='h-4 w-4' />
                </i>
                  <span>Close</span>
                </button>
              </div>
            </div>
          </div>
          <div tabIndex={-1}
            className="bg-reddit_dark box-border justify-center flex mx-auto pb-8 relative max-w-[1280px] w-[calc(100%_-_160px)]" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              //prevent closing modal
            }} 
          >
            <Comment post={post} />
            <div className="hidden lg:block ml-6">
              <Widget community={true} />
              <Donations />
            </div>
          </div>
      </div>
  </div>
    )}
    </>
  )
}

export default PostModal;