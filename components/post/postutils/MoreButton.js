import {useState,useEffect, useContext} from 'react'
import ClickOutHandler from "react-clickout-handler";
import showTimeMsg from '../../utils/notification/showTimeMsg'
import { useRouter } from 'next/router';
import {BsTrashFill} from 'react-icons/bs'
import axios from 'axios';
import Image from 'next/image';
import UserContext from '../../auth/UserContext';
import moreButton from '../../../public/moreButton.svg'

function MoreButton(props) {

  const provider = useContext(UserContext)
  const {session} = provider
 
  const router = useRouter()
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  const {post,filePickerRefMore} = props
  const [postAuthor,setPostAuthor] = useState(false)
  const [moreDropdownVisibilityClass, setMoreDropdownVisibilityClass] = useState('hidden');

  // message
  const [deletedSuccess,setDeletedSuccess] = useState(false)
  //

  useEffect(() => {
    if(moreDropdownVisibilityClass === 'hidden') return
    if(session) {
      if(session.user.username === post.author) {
        setPostAuthor(true)
      } else {
        return
      }
    }
  },[post,moreDropdownVisibilityClass])

  const deletePost = async() => {
    try {
      if(router.asPath !== '/') {
        const deleteId = post._id
        await axios.delete(`${server}/posts/${deleteId}`,{withCredentials:true})
        router.push(`${hostname}/b/${post.community}`).then(() => {
        setDeletedSuccess(true)
        })
      } else {
        const {deleteId} = router.query
          const res = await axios.delete(`${server}/posts/${deleteId}`,{withCredentials:true})
          router.reload().then(() => {
          setDeletedSuccess(true)
        }) // to fixconst {deleteId} = router.query
          // await axios.delete(`${server}/posts/${deleteId}`,{withCredentials:true})
          // router.reload().then(() => {
          // setDeletedSuccess(true)
        // }) // to fix
      }
    } catch (err) {

    }
  }
  
  

  function toggleMoreDropdown() {
    if (moreDropdownVisibilityClass === 'hidden') {
      setMoreDropdownVisibilityClass('block');
    }else {
      setMoreDropdownVisibilityClass('hidden')
    }
  }

  const clickMoreButton = async() => {
    if (router.asPath !== ('/')) {
      toggleMoreDropdown()
    } else {
      filePickerRefMore.current.click()
      toggleMoreDropdown()
    }
    
  }

  return (
    <>
       <ClickOutHandler onClickOut={() => setMoreDropdownVisibilityClass('hidden')}>
       <div className=''>
          <button title='Show more options' type='button' onClick={event =>{
            event.preventDefault()
            clickMoreButton()
        }}>
          <div className='mt-[2px] text-reddit_text-darker p-2 rounded-sm hover:bg-reddit_hover text-sm'>
            <Image src={moreButton} alt='' height={'20px'} width={'20px'}/>
          </div>
         </button>
   
   
   
         <div className={'absolute ' + moreDropdownVisibilityClass}>
           <div className='flex bg-reddit_dark-brighter border border-reddit_border z-10 rounded-md'>
               {postAuthor && (
                 <button onClick={e => {
                   e.preventDefault()
                   deletePost()
                 }} className='p-2 flex text-reddit_text-darker hover:bg-blue-900 w-auto lg:w-[200px]'>
                   <BsTrashFill className='w-4 h-4 mt-1 mr-2' />
                   <h1 className='text-sm'>Delete</h1>
                 </button>
               )}
          </div>
           </div>
           {deletedSuccess && (
             showTimeMsg('Post deleted successfully.')
           )}
       </div>
       </ClickOutHandler>
   </>
  )
}

export default MoreButton;