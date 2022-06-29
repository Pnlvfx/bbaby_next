import TimeAgo from "timeago-react";
import ShareButton from "./postutils/ShareButton";
import { useRouter } from "next/router";
import MoreButton from './postutils/MoreButton'
import Image from "next/image";
import Voting from "./Voting";
import {CommentIcon} from '../utils/SVG'
import Link from "next/link";
import { isMobile } from "react-device-detect";

type PostContentProps = {
  post: {
    author:string,
    title:string,
    body:string,
    image: string,
    ups: number,
    _id: string,
    liked: string,
    community:string,
    communityIcon: string,
    numComments: number,
    createdAt: Date,

    mediaInfo: {
      dimension: any,
    }

  },
  isListing?:Boolean
}

const PostContent = ({post,isListing}:PostContentProps) => {
  const router = useRouter()

  let height = 0
  let width = 0

  if(post.image) {
    height = post.mediaInfo.dimension[0]
    width = post.mediaInfo.dimension[1]
  }

    return (
        <div className="flex bg-reddit_dark-brighter rounded-md overflow-hidden max-h-[700px]">
          <div className='bg-[#141415] w-10 flex-none'>
            <Voting ups={post.ups} postId={post._id} liked={post.liked} author={post.author} />
          </div>
            <div className="p-2">
              <div className="flex mb-3 truncate">
                <Link href={`/b/${post.community}`}>
                  <a onClick={event => {
                      event.preventDefault()
                      router.push({
                        pathname: '/b/'+post.community
                      })
                      }} className="h-5 relative flex">
                        <div className="">
                          <Image src={post.communityIcon} alt='' className='rounded-full' height={'20px'} width={'20px'} />                      
                        </div>    
                        <span className="text-xs ml-1 hover:underline font-bold mt-[2px]">b/{post.community}</span>
                  </a>
                </Link>
                  <span className="px-1 text-sm">-</span>
                  <div className='text-reddit_text-darker text-xs mt-[3px] truncate'>
                    <span>Posted by</span> <Link href={`/user/${post.author}`}>
                      <a onClick={event => {
                        event.preventDefault()
                        router.push(`/user/${post.author}`)
                      }}>
                        <span className="hover:underline text-ellipsis">b/{post.author}</span> 
                      </a> 
                      </Link> <TimeAgo datetime={post.createdAt} className='text-ellipsis'/>
                  </div>
                </div>
                <pre>
                  <p style={{whiteSpace: 'pre-line',fontFamily: 'Helvetica'}} className='mb-4 break-words font-extrabold leading-6'>{post.title}</p>
                </pre>
                  {post.image && (
                    <div className="max-h-[500px] overflow-hidden container">
                        <Image src={`${post.image}`} alt='' height={height} width={width} objectFit={'contain'} />
                    </div>
                  )}
                  {post.body && (
                    <pre className='text-sm leading-6 break-words resize-x-none flex-none'>
                      <p style={{whiteSpace: 'pre-line',fontFamily: 'Helvetica'}}>{post.body}</p>
                    </pre>
                  )}
                <div className='flex self-center'>
                    <Link href={`/b/${post.community}/comments/${post._id}`} scroll={false}>
                      <a
                      onClick={event => {
                        event.preventDefault()
                          if (isListing) {
                            if (isMobile) {
                              router.push({
                                pathname: `/b/${post.community}/comments/${post._id}`
                              },undefined,{scroll:false})
                            } else {
                              router.push({
                                  pathname: router.pathname,
                                  query: {postId: post._id, community: post.community, username: post.author }
                              },'/b/'+post.community+'/comments/'+post._id, {scroll:false}
                              )
                            }
                          }
                        }}>
                        <div className='flex text-reddit_text-darker p-2 rounded-sm hover:bg-reddit_hover text-sm self-center'>
                          <CommentIcon style={{height: '20px', width: '20px'}} />
                          <h1 className="ml-1">{post.numComments} Comments</h1>
                        </div>
                      </a>
                    </Link>
                    <ShareButton community={post.community} postId={post._id} />
                    <MoreButton post={post} postId={post._id}/>
                </div>
              </div>
          </div>
    )
  }

export default PostContent;