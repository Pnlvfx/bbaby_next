import { useState } from 'react';
import ClickOutHandler from "react-clickout-ts";
import { useRouter } from 'next/router';
import {BsTrashFill} from 'react-icons/bs';
import { useSession } from '../../auth/UserContext';
import {MoreIcon} from '../../utils/SVG';

type MoreButtonProps = {
  post: PostProps
  postId: string
  isListing?: boolean
}

const MoreButton = ({post, postId, isListing}: MoreButtonProps)  => {
  const {session} = useSession();
  const router = useRouter()
  const [moreDropdownVisibilityClass, setMoreDropdownVisibilityClass] = useState(false);

  const clickMoreButton = () => {
    if (session?.user?.username === post.author || session?.user?.role === 1) {
      setMoreDropdownVisibilityClass(!moreDropdownVisibilityClass)
    }
  }

  const deletePost = async() => {
    try {
      const server = process.env.NEXT_PUBLIC_SERVER_URL;
      const url = `${server}/posts/${postId}`
      const res = await fetch(url, {
        method: 'delete',
        credentials: 'include'
      })
      if (!res.ok) return;
      if(router.asPath !== '/') {
        router.push(`${window?.location?.origin}/b/${post.community.toLowerCase()}`)
      } else {
          router.reload()
      }
    } catch (err) {

    }
  }

  return (
    <div className={`flex items-center ${session?.device?.mobile && isListing && 'articleLink'}`}>
       <ClickOutHandler onClickOut={() => setMoreDropdownVisibilityClass(false)}>
          <button 
            aria-label='more options'
            aria-haspopup='true' 
            className='p-2 hover:bg-reddit_dark-brightest flex items-center h-full rounded-sm'
            type='button' 
            onClick={event =>{
              event.preventDefault()
              event.stopPropagation()
              clickMoreButton();
            }}
          >
          <MoreIcon />
         </button>
         <div className={`absolute z-30 ${moreDropdownVisibilityClass ? "block" : "hidden"}`}>
           <div className='flex bg-reddit_dark-brighter border border-reddit_border z-10 rounded-md'>
              <button 
                className='p-2 flex text-reddit_text-darker hover:bg-blue-900 w-auto lg:w-[200px]' 
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  deletePost()
              }}>
                <BsTrashFill className='w-4 h-4 mt-1 mr-2' />
                <p className='text-sm'>Delete</p>
              </button>
          </div>
           </div>
       </ClickOutHandler>
   </div>
  )
}

export default MoreButton;