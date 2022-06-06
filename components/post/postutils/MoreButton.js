import {useState,useEffect, useContext} from 'react'
import ClickOutHandler from "react-clickout-handler";
import showTimeMsg from '../../utils/notification/showTimeMsg'
import { useRouter } from 'next/router';
import {BsTrashFill} from 'react-icons/bs'
import axios from 'axios';
import Image from 'next/image';
import UserContext from '../../auth/UserContext';


const buttonClasses = " hover:bg-reddit_hover py-2 rounded-sm"

function MoreButton(props) {

  const provider = useContext(UserContext)
  const {session} = provider
 
  const router = useRouter()
  const [showElement,setShowElement] = useState(true)
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  const {comments,filePickerRefMore} = props
  const [postAuthor,setPostAuthor] = useState(false)

  // message
  const [deletedSuccess,setDeletedSuccess] = useState(false)
  //

  useEffect(() => {
    if(session) {
      if(session.user.username === comments.author) {
        setPostAuthor(true)
      } else {
        return
      }
    }
  },[postAuthor,comments])

  const deletePost = async () => {
    try {
      if(router.asPath !== '/') {
        const deleteId = comments._id
        await axios.delete(`${server}/posts/${deleteId}`,{withCredentials:true})
        router.push(`${hostname}/b/${comments.community}`).then(() => {
        setDeletedSuccess(true)
        })
      } else {
        const {deleteId} = router.query
      await axios.delete(`${server}/posts/${deleteId}`,{withCredentials:true})
      router.reload().then(() => {
        setDeletedSuccess(true)
      }) // to fixconst {deleteId} = router.query
        await axios.delete(`${server}/posts/${deleteId}`,{withCredentials:true})
        router.reload().then(() => {
          setDeletedSuccess(true)
        }) // to fix
      }
    } catch (err) {

    }
  }

  //Timeout after copy a link
  useEffect(() => {
      setTimeout(() => {
        setShowElement(false)
        //setCopied(false)    to define
    }, 8000);
  },[showElement])
  
  const [ShareDropdownVisibilityClass, setShareDropdownVisibilityClass] = useState('hidden');

  function toggleShareDropdown() {
    if (ShareDropdownVisibilityClass === 'hidden') {
      setShareDropdownVisibilityClass('block');
    }else {
      setShareDropdownVisibilityClass('hidden')
    }
  }

  const clickMoreButton = async() => {
    if (router.asPath !== ('/')) {
      toggleShareDropdown()
    } else {
      filePickerRefMore.current.click()
      toggleShareDropdown()
    }
    
  }

  return (
    <>
       <ClickOutHandler onClickOut={() => setShareDropdownVisibilityClass('hidden')}>
       <div className=''>
          <button id='moreOptions' type='button' onClick={event =>{
            event.preventDefault()
            clickMoreButton()
        }}>
          <div className='mt-[2px] text-[#717273] p-2 rounded-sm hover:bg-reddit_hover text-sm'>
            <Image src='/points.svg' height={'20px'} width={'20px'}/>
          </div>
         </button>
   
   
   
         <div className={'absolute ' + ShareDropdownVisibilityClass}>
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