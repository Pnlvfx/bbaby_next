import {useState,useEffect, useContext} from 'react'
import ClickOutHandler from "react-clickout-ts";
import { useRouter } from 'next/router';
import {BsTrashFill} from 'react-icons/bs'
import axios from 'axios';
import UserContext from '../../auth/UserContext';
import {MoreIcon} from '../../utils/SVG'

const MoreButton = (props:any)  => {
  const {session} = useContext(UserContext)
  const router = useRouter()
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  const {post,postId} = props
  const [postAuthor,setPostAuthor] = useState(false)
  const [moreDropdownVisibilityClass, setMoreDropdownVisibilityClass] = useState(false);

  useEffect(() => {
    if(!moreDropdownVisibilityClass) return
      if(session?.user?.username === post.author) {
        setPostAuthor(true)
      } else {
        return
      }
  },[moreDropdownVisibilityClass])

  const deletePost = async() => {
    try {
      if(router.asPath !== '/') {
        await axios.delete(`${server}/posts/${postId}`,{withCredentials:true})
        router.push(`${hostname}/b/${post.community}`).then(() => {
        })
      } else {
          const res = await axios.delete(`${server}/posts/${postId}`,{withCredentials:true})
          router.reload()
      }
    } catch (err) {

    }
  }

  return (
    <>
       <ClickOutHandler onClickOut={() => setMoreDropdownVisibilityClass(false)}>
          <button title='Show more options' type='button' onClick={event =>{
            event.preventDefault()
            event.stopPropagation()
            setMoreDropdownVisibilityClass(!moreDropdownVisibilityClass)
        }}>
          <div className='self-center text-reddit_text-darker p-2 rounded-sm hover:bg-reddit_hover text-sm'>
            <MoreIcon style={{height: 20, width: 20}} />
          </div>
         </button>
         <div className={`absolute ${moreDropdownVisibilityClass ? "block" : "hidden"}`}>
           <div className='flex bg-reddit_dark-brighter border border-reddit_border z-10 rounded-md'>
               {postAuthor && (
                 <button onClick={e => {
                   e.preventDefault()
                   e.stopPropagation()
                   deletePost()
                 }} className='p-2 flex text-reddit_text-darker hover:bg-blue-900 w-auto lg:w-[200px]'>
                   <BsTrashFill className='w-4 h-4 mt-1 mr-2' />
                   <p className='text-sm'>Delete</p>
                 </button>
               )}
          </div>
           </div>
       </ClickOutHandler>
   </>
  )
}

export default MoreButton;