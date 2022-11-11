import { useState} from 'react'
import ClickOutHandler from "react-clickout-ts";
import {AiOutlineLink} from 'react-icons/ai'
import { ShareIcon } from '../../utils/SVG';
import { useMessage } from '../../main/TimeMsgContext';
import { shareAnalytics } from '../../../lib/gtag';
import { useSession } from '../../auth/UserContext';

type ShareButtonProps = {
  community: string
  postId: string
  isListing?: boolean
}

const ShareButton = ({community, postId, isListing}: ShareButtonProps) => {
  const {session} = useSession();
  const [ShareDropdownVisibilityClass, setShareDropdownVisibilityClass] = useState(false);
  const message = useMessage();

  const copyTextToClipboard = async (text: string) => {
    try {
      if ('clipboard' in navigator) {
        const copy = await navigator.clipboard.writeText(text);
      } else {
        const copy = document.execCommand('copy', true, text);
      }
      setShareDropdownVisibilityClass(false)
      message.setMessage({value: 'Link copied!', time: 8000, status: 'success'})
      shareAnalytics();
    } catch (error) {
      message.setMessage({value: 'Error while trying to copy the url, please retry.'})
    }
  }

  return (
    <div className={`mr-1 flex items-center ${session?.device?.mobile && isListing && 'articleLink'}`}>
      <ClickOutHandler onClickOut={() => setShareDropdownVisibilityClass(false)}>
        <button 
          className='p-2 flex items-center h-full hover:bg-reddit_dark-brightest rounded-sm' 
          type='button' 
          onClick={event =>{
            event.preventDefault()
            event.stopPropagation()
            setShareDropdownVisibilityClass(!ShareDropdownVisibilityClass)
          }}
        >
          <ShareIcon className='leading-4 mr-[6px]' />
          <span className='text-left overflow-hidden text-ellipsis leading-3 max-h-[36px] '>Share</span>
        </button>
          <div className={`z-20 absolute ${ShareDropdownVisibilityClass ? "block" : "hidden"} `}>
            <div className='flex bg-reddit_dark-brighter border border-reddit_border z-10 rounded-md overflow-hidden'>
                <div onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  copyTextToClipboard(window?.location?.origin + '/b/'+community+'/comments/'+postId)
                  }}>
                  <div className='flex py-2 pl-2 pr-12 text-reddit_text-darker'>
                    <AiOutlineLink className='w-5 h-5 mr-1 mt-[3px]' />
                  <button className='block'>Copy Link</button>
                </div>
              </div>
          </div>
        </div>
      </ClickOutHandler>
   </div>
  )
}

export default ShareButton;