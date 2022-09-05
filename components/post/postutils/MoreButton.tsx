import {useState,useEffect, useContext} from 'react'
import ClickOutHandler from "react-clickout-ts";
import { useRouter } from 'next/router';
import {BsTrashFill} from 'react-icons/bs'
import axios from 'axios';
import UserContext from '../../auth/UserContext';
import {MoreIcon} from '../../utils/SVG'

const MoreButton = (props:any)  => {
  const {session} = useContext(UserContext) as SessionProps;
  const router = useRouter()
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
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    try {
      if(router.asPath !== '/') {
        await axios.delete(`${server}/posts/${postId}`, {withCredentials:true})
        router.push(`${window?.location?.origin}/b/${post.community}`).then(() => {
        })
      } else {
          const res = await axios.delete(`${server}/posts/${postId}`,{withCredentials:true})
          router.reload()
      }
    } catch (err) {

    }
  }

  return (
    <div className='flex items-center'>
       <ClickOutHandler onClickOut={() => setMoreDropdownVisibilityClass(false)}>
          <button className='p-2 hover:bg-reddit_dark-brightest flex items-center h-full' style={{borderRadius: '2px'}} type='button' onClick={event =>{
            event.preventDefault()
            event.stopPropagation()
            setMoreDropdownVisibilityClass(!moreDropdownVisibilityClass)
        }}>
          <MoreIcon />
         </button>
         <div className={`absolute z-30 ${moreDropdownVisibilityClass ? "block" : "hidden"}`}>
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
   </div>
  )
}

export default MoreButton;