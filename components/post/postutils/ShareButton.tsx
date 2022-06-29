import {useState} from 'react'
import ClickOutHandler from "react-clickout-ts";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {AiOutlineLink} from 'react-icons/ai'
import { ShareIcon } from '../../utils/SVG';
import dynamic from 'next/dynamic';

type ShareButtonProps = {
  community: string,
  postId: string
}

function ShareButton({community,postId}:ShareButtonProps) {

  //TIMEMSG
  const ShowTimeMsg = dynamic(() => import('../../utils/notification/ShowTimeMsg'))
  const [value,setValue] = useState('')
  //

  const hostname = process.env.NEXT_PUBLIC_HOSTNAME
  
  const [ShareDropdownVisibilityClass, setShareDropdownVisibilityClass] = useState('hidden');
  function toggleShareDropdown() {
    if (ShareDropdownVisibilityClass === 'hidden') {
      setShareDropdownVisibilityClass('block');
    }else {
      setShareDropdownVisibilityClass('hidden')
    }
  }

  return (
    <div>
      <ClickOutHandler onClickOut={() => setShareDropdownVisibilityClass('hidden')}>
      <div>
        <button type='button' onClick={event =>{
        event.preventDefault()
          toggleShareDropdown()
        }}>
          <div className='flex text-reddit_text-darker p-2 rounded-sm hover:bg-reddit_hover text-sm self-center'>
            <ShareIcon style={{height: '20px', width: '20px'}} />
            <h1 className='ml-1'>Share</h1>
          </div>
        </button>

          <div className={'absolute ' + ShareDropdownVisibilityClass}>
            <div className='flex bg-reddit_dark-brighter border border-reddit_border z-10 rounded-md overflow-hidden'>
                <div onClick={e => {e.preventDefault()}}>
                <CopyToClipboard
                text={hostname + '/b/'+community+'/comments/'+postId} 
                onCopy={() => {
                  setShareDropdownVisibilityClass('hidden')
                  setValue('Link copied!')
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
      <ShowTimeMsg value={value} setValue={setValue} />
   </div>
  )
}

export default ShareButton;