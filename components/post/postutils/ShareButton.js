import {useState,useEffect} from 'react'
import ClickOutHandler from "react-clickout-handler";
import showTimeMsg from '../../utils/notification/showTimeMsg'
import { useRouter } from 'next/router';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {AiOutlineLink} from 'react-icons/ai'
import Image from 'next/image';


const buttonClasses = "mr-2 flex text-[#717273] hover:bg-reddit_hover p-2 rounded-sm"

function ShareButton(props) {
 
  const router = useRouter()
  const [copied,setCopied] = useState(false);
  const [showElement,setShowElement] = useState(true)


  const value = 'Link copied!'
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME

  //Timeout after copy a link
  useEffect(() => {
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
    <div className='text-sm'>
       <button className={"block " + buttonClasses} onClick={event =>{
       event.preventDefault()
       if(router.asPath === '/') {
        filePickerRefShare.current.click()
       }
        toggleShareDropdown()
      }}>
        <div className='mr-2'>
          <Image src='/share.svg' alt='' width={'20px'} height={'20px'}/>
        </div>
        <h1 className=''>Share</h1>
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
                <button className='block'>Copy Link</button>
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