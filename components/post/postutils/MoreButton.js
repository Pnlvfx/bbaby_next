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
  const {comments,filePickerRefMore} = props
  const [postAuthor,setPostAuthor] = useState(false)

  useEffect(() => {
    if(session) {
      if(session.user.username === comments.author) {
        setPostAuthor(true)
      }
    }
  },[postAuthor,session])

  const deletePost = async () => {
    try {
      const {query} = router
      const {deleteId} = query
      const id = deleteId
      await axios.delete(`${server}/comments/delete/${router.query.deleteId}`,{withCredentials:true}) 
      window.location = '/'
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

  return (
    <>
    {router.asPath === ('/') && (
       <ClickOutHandler onClickOut={() => setShareDropdownVisibilityClass('hidden')}>
       <div className='text-sm'>
          <button id='moreOptions' className={"block " + buttonClasses} onClick={event =>{
          event.preventDefault()
          filePickerRefMore.current.click()
           toggleShareDropdown()
         }}>
           <Image src='/points.svg' height={'20px'} width={'20px'}/>
         </button>
   
   
   
         <div className={'absolute ' + ShareDropdownVisibilityClass}>
           <div className='flex bg-reddit_dark-brighter border border-reddit_border z-10 rounded-md'>
             <div className='w-auto lg:w-[200px]'>
               {postAuthor && (
                 <div onClick={e => {
                   e.preventDefault()
                   deletePost()
                 }} className='p-2 flex text-reddit_text-darker hover:bg-blue-900'>
                   <BsTrashFill className='w-4 h-4 mt-1 mr-2' />
                   <h1>Delete</h1>
                 </div>
               )}
             </div>
          </div>
           </div>
       </div>
       </ClickOutHandler>
    )}
   </>
  )
}

export default MoreButton;