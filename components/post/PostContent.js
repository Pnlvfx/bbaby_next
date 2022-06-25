import TimeAgo from "timeago-react";
import ShareButton from "./postutils/ShareButton";
import { useRouter } from "next/router";
import MoreButton from './postutils/MoreButton'
import Image from "next/image";
import Voting from "./Voting";
import {CommentIcon} from '../utils/SVG'
import Link from "next/link";
import { isMobile } from "react-device-detect";

function PostContent(props) {
  const router = useRouter()
  const {filePickerRefMore,filePickerRefShare,communityIcon} = props

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
                <Link href={`/b/${props.community}`}>
                  <a onClick={event => {
                      event.preventDefault()
                      router.push({
                        pathname: '/b/'+props.community
                      })
                      }} className="h-5 relative flex">
                        <div className="">
                          <Image src={communityIcon} alt='' className='rounded-full' height={'20px'} width={'20px'} />                      
                        </div>    
                        <span className="text-xs ml-1 hover:underline font-bold mt-[2px]">b/{props.community}</span>
                  </a>
                </Link>
                  <span className="px-1 text-sm">-</span>
                  <div className='text-reddit_text-darker text-xs mt-[3px] truncate'>
                    <span>Posted by</span> <Link href={`/user/${props.author}`}>
                      <a onClick={event => {
                        event.preventDefault()
                        router.push(`/user/${props.author}`)
                      }}>
                        <span className="hover:underline text-ellipsis">b/{props.author}</span> 
                      </a> 
                      </Link> <TimeAgo datetime={props.createdAt} className='text-ellipsis'/>
                  </div>
                </div>
                <pre>
                  <p style={{whiteSpace: 'pre-line',fontFamily: 'Helvetica'}} className='mb-4 break-words font-extrabold leading-6'>{props.title}</p>
                </pre>
                  {props.image && (
                    <div className="max-h-[500px] overflow-hidden container">
                        <Image src={`${props.image}`} alt='' height={height} width={width} objectFit={'container'} />
                    </div>
                  )}
                  {props.body && (
                    <pre className='text-sm leading-6 break-words resize-x-none flex-none'>
                      <p style={{whiteSpace: 'pre-line',fontFamily: 'Helvetica'}}>{props.body}</p>
                    </pre>
                  )}
                <div className='flex self-center'>
                    <Link href={`/b/${props.community}/comments/${props._id}`} scroll={false}>
                      <a type='button'
                      className="bg-reddit_dark-brighter"
                      onClick={event => {
                        event.preventDefault()
                          if (props.isListing) {
                            if (isMobile) {
                              router.push({
                                pathname: `/b/${props.community}/comments/${props._id}`
                              },undefined,{scroll:false})
                            } else {
                              router.push({
                                  pathname: router.pathname,
                                  query: {postId: props._id, community: props.community, username: props.author }
                              },'/b/'+props.community+'/comments/'+props._id, {scroll:false}
                              )
                            }
                          }
                        }}>
                        <div className='flex text-reddit_text-darker p-2 rounded-sm bg-reddit_dark-brighter hover:bg-reddit_hover text-sm self-center'>
                          <CommentIcon style={{height: '20px', width: '20px'}} />
                          <h1 className="ml-1">{props.numComments} Comments</h1>
                        </div>
                      </a>
                    </Link>
                    <ShareButton community={props.community} filePickerRefShare={filePickerRefShare} />
                    <MoreButton post={props} filePickerRefMore={filePickerRefMore}/>
                </div>
              </div>
          </div>
    )
  }

export default PostContent;