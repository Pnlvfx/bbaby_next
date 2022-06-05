import TimeAgo from "timeago-react";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import ShareButton from "./postutils/ShareButton";
import { useRouter } from "next/router";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import MoreButton from './postutils/MoreButton'
import Image from "next/image";
import Voting from "./Voting";

function PostContent(props) {

  const router = useRouter()
  const {filePickerRefMore,filePickerRef,filePickerRefShare,communityIcon} = props

    return (
      <div className="bg-reddit_dark-brighter rounded-md">
        <div className="flex">
          <div className='bg-[#141415] w-10 flex-none'>
            <Voting ups={props.ups} postId={props._id} liked={props.liked} />
            </div>
          <div className="p-2">
              <div className="">
                  <div onClick={event => {
                      event.preventDefault()
                      router.push({
                        pathname: '/b/'+props.community
                      })
                    }} className="flex mb-3 cursor-pointer">    
                      <img src={communityIcon} className='rounded-full flex-none' height={'20px'} width={'20px'} />
                    <span className="text-xs ml-1 hover:underline font-bold mt-[2px]">b/{props.community}
                    </span>
                    <h2 className="px-1 text-sm">-</h2>
                    <h3 className='text-reddit_text-darker text-xs mt-[3px]'>Posted by b/{props.author} <TimeAgo datetime={props.createdAt}/></h3>
                  </div>

                  <h3 className='text-lg mb-4 break-words'>{props.title}</h3>
                    {props.image && (
                      <div className="w-full ">
                         <img src={props.image} className='w-full max-h-[400px] object-contain'/>
                      </div>
                    )}
                    {props.body && (
                      <div className='text-sm leading-6 break-words resize-x-none flex-none'>
                        <ReactMarkdown remarkPlugins={[gfm]}>{props.body}</ReactMarkdown>
                      </div>
                    )}
                </div>
              <div className='flex'>
                <button type='button' onClick={event => {
                    event.preventDefault()
                      if (router.asPath === '/') {
                        filePickerRef.current.click()
                      } else {
                        null
                      }
                    }}>
                    <div className='flex text-[#717273] p-2 rounded-sm hover:bg-reddit_hover text-sm'>
                    <Image src='/comment.svg' alt='' height={'20px'} width={'20px'} />
                    <h1 className="ml-1">{props.numComments} Comments</h1>
                    </div>
                  </button>
                    <ShareButton community={props.community} filePickerRefShare={filePickerRefShare} />
                    <MoreButton comments={props} filePickerRefMore={filePickerRefMore} />
              </div>
          </div>
          </div>
      </div>
    )
  }

export default PostContent;