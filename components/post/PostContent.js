import TimeAgo from "timeago-react";
import ShareButton from "./postutils/ShareButton";
import { useRouter } from "next/router";
import MoreButton from './postutils/MoreButton'
import Image from "next/image";
import Voting from "./Voting";
import CommentIcon from '../../public/comment.svg'
import LoaderPlaceholder from './LoaderPlaceholder'

function PostContent(props) {
  const router = useRouter()
  const {filePickerRefMore,filePickerRef,filePickerRefShare,communityIcon} = props

  let height = null
  let width = null

  if(props.image) {
    height = props.mediaInfo.dimension[0]
    width = props.mediaInfo.dimension[1]
  }

    return (
        <div className="flex bg-reddit_dark-brighter rounded-md overflow-hidden max-h-[700px]">
          <div className='bg-[#141415] w-10 flex-none'>
            <Voting ups={props.ups} postId={props._id} liked={props.liked} />
          </div>
            <div className="p-2">
              <div className="flex mb-3 truncate">
                <div onClick={event => {
                    event.preventDefault()
                    router.push({
                      pathname: '/b/'+props.community
                    })
                    }} className="flex cursor-pointer">
                      <div className="relative">
                        <Image src={communityIcon} alt='' className='rounded-full' height={'20px'} width={'20px'} />                      
                      </div>    
                      <span className="text-xs ml-1 hover:underline font-bold mt-[2px]">b/{props.community}</span>
                </div>
                  <h2 className="px-1 text-sm">-</h2>
                  <div className='text-reddit_text-darker text-xs mt-[3px] truncate'>
                    <button onClick={event => {
                      event.preventDefault()
                      router.push(`/user/${props.author}`)
                    }}>
                      <div className="hover:underline text-ellipsis">
                        Posted by b/{props.author}
                      </div> 
                    </button> <TimeAgo datetime={props.createdAt} className='text-ellipsis'/>
                  </div>
                </div>
                <pre>
                  <p style={{whiteSpace: 'pre-line'}} className='mb-4 break-words font-extrabold'>{props.title}</p>
                </pre>
                  {props.image && (
                    <div className="relative">
                        <Image src={`${props.image}`} alt='' height={height} width={width} />
                    </div>
                  )}
                  {props.body && (
                    <pre className='text-sm leading-6 break-words resize-x-none flex-none'>
                      <p style={{whiteSpace: 'pre-line'}}>{props.body}</p>
                    </pre>
                  )}
                <div className='flex'>
                  <button type='button' onClick={event => {
                      event.preventDefault()
                        if (router.asPath === '/') {
                          filePickerRef.current.click()
                        } else {
                          null
                        }
                      }}>
                      <div className='flex text-reddit_text-darker p-2 rounded-sm hover:bg-reddit_hover text-sm'>
                      <Image src={CommentIcon} alt='comment_button' height={'20px'} width={'20px'} />
                      <h1 className="ml-1">{props.numComments} Comments</h1>
                      </div>
                    </button>
                      <ShareButton community={props.community} filePickerRefShare={filePickerRefShare} />
                      <MoreButton post={props} filePickerRefMore={filePickerRefMore}/>
                </div>
              </div>
          </div>
    )
  }

export default PostContent;