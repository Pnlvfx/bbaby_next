import {useContext, useState} from 'react'
import ClickOutHandler from "react-clickout-ts";
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {AiOutlineLink} from 'react-icons/ai'
import { ShareIcon } from '../../utils/SVG';
import { TimeMsgContext, TimeMsgContextProps } from '../../main/TimeMsgContext';

type ShareButtonProps = {
  community: string,
  postId: string
}

function ShareButton({community,postId}:ShareButtonProps) {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  const [ShareDropdownVisibilityClass, setShareDropdownVisibilityClass] = useState(false);
  const {setMessage} = useContext(TimeMsgContext) as TimeMsgContextProps;

  return (
    <div>
      <ClickOutHandler onClickOut={() => setShareDropdownVisibilityClass(false)}>
      <div>
        <button type='button' onClick={event =>{
        event.preventDefault()
        event.stopPropagation()
          setShareDropdownVisibilityClass(!ShareDropdownVisibilityClass)
        }}>
          <div className='flex text-reddit_text-darker p-2 rounded-sm hover:bg-reddit_hover text-sm items-center'>
            <ShareIcon style={{height: '20px', width: '20px'}} />
            <h1 className='ml-1'>Share</h1>
          </div>
        </button>
          <div className={`absolute ${ShareDropdownVisibilityClass ? "block" : "hidden"} `}>
            <div className='flex bg-reddit_dark-brighter border border-reddit_border z-10 rounded-md overflow-hidden'>
                <div onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  }}>
                <CopyToClipboard
                text={hostname + '/b/'+community+'/comments/'+postId} 
                onCopy={() => {
                  setShareDropdownVisibilityClass(false)
                  setMessage({value: 'Link copied!', time: 8000, status: 'success'})
                }}>
                  <div className='flex py-2 pl-2 pr-12 text-reddit_text-darker'>
                  <AiOutlineLink className='w-5 h-5 mr-1 mt-[3px]' />
                  <button className='block'>Copy Link</button>
                  </div>
                </CopyToClipboard>
              </div>
          </div>
        </div>
      </div>
      </ClickOutHandler>
   </div>
  )
}

export default ShareButton;