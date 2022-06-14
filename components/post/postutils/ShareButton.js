import {useState,useEffect} from 'react'
import ClickOutHandler from "react-clickout-handler";
import showTimeMsg from '../../utils/notification/showTimeMsg'
import { useRouter } from 'next/router';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {AiOutlineLink} from 'react-icons/ai'
import Image from 'next/image';
import shareButton from '../../../public/share.svg'



function ShareButton(props) {
 
  const router = useRouter()
  const [copied,setCopied] = useState(false);
  const [showElement,setShowElement] = useState(false)


  const value = 'Link copied!'
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME

  //Timeout after copy a link
  useEffect(() => {
    if (showElement === false) return 
    setShowElement(true)
      setTimeout(() => {
        setShowElement(false)
        setCopied(false)
    }, 8000);
  },[showElement])

  const {community,filePickerRefShare} = props
  
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
    <ClickOutHandler onClickOut={() => setShareDropdownVisibilityClass('hidden')}>
    <div>
       <button type='button' onClick={event =>{
       event.preventDefault()
       if(router.asPath === '/') {
        filePickerRefShare.current.click()
       }
        toggleShareDropdown()
      }}>
        <div className='flex text-reddit_text-darker p-2 rounded-sm hover:bg-reddit_hover text-sm'>
          <Image src={shareButton} alt='share_button' width={'20px'} height={'20px'}/>
          <h1 className='ml-1 mt-[2px]'>Share</h1>
        </div>
      </button>



      <div className={'absolute ' + ShareDropdownVisibilityClass}>
        <div className='flex bg-reddit_dark-brighter border border-reddit_border z-10 rounded-md overflow-hidden'>
          {router.asPath === '/' && (
            <div onClick={e => {e.preventDefault()}} className=''>
            <CopyToClipboard text={hostname + '/b/'+community+'/comments/'+router.query.shareId} onCopy={() => {
              setShareDropdownVisibilityClass('hidden')
              setCopied(true)
              setShowElement(true)
            }}>
              <div className='flex py-2 pl-2 pr-12 text-reddit_text-darker'>
              <AiOutlineLink className='w-5 h-5 mr-1 mt-[3px]' />
            <button className='block'>Copy Link</button>
              </div>
            </CopyToClipboard>
          </div>
          )}
          {router.asPath !== '/' && (
            <div onClick={e => {e.preventDefault()}} className=''>
            <CopyToClipboard text={hostname + router.asPath} onCopy={() => {
              setShareDropdownVisibilityClass('hidden')
              setCopied(true)
              setShowElement(true)
            }}>
              <div className='flex py-2 pl-2 pr-12 text-reddit_text-darker'>
                <AiOutlineLink className='w-5 h-5 mr-1 mt-[3px]' />
                <button className='text-sm'>Copy Link</button>
              </div>
            </CopyToClipboard>
          </div>
          )}
       </div>
        </div>
    </div>
    </ClickOutHandler>
    {copied && showElement && (
      showTimeMsg(value)
    )}
   </>
  )
}

export default ShareButton;