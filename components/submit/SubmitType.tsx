import { useState } from 'react'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { AddImageIcon } from '../utils/SVG'

const SubmitType = () => {
  const buttonClass = 
    `
    text-[14px] font-bold leading-[18px] outline-none box-border
    py-[15px] px-[17px] z-[1] relative flex-1 text-center
    solid border-r border-b border-reddit_border
    justify-center items-center whitespace-nowrap flex
    hover:bg-reddit_dark-brightest
    `
  const [activeButton, setActiveButton] = useState('post')
  return (
    <div className="mb-3 overflow-auto">
      <div className="flex flex-row items-stretch align-baseline">
        <button className={`${buttonClass} ${activeButton !== 'post' && 'text-reddit_text-darker'}`}>
            <HiOutlineDocumentText className="h-5 w-5 leading-5 align-middle mr-2" />
            Post
            <div className='box-border absolute left-0 right-0 bottom-[-1px] h-[2px] bg-white '>{' '}</div>
        </button>
        <button disabled className={`${buttonClass} ${activeButton !== 'images&video' && 'text-reddit_text-darker'}`}>
          <AddImageIcon className="h-5 w-5 leading-5 align-middle mr-2" />
          Images & Video
        </button>
        <button disabled className={`hidden lg:flex ${buttonClass} ${activeButton !== 'link' && 'text-reddit_text-darker'}`}>
          <AddImageIcon className="h-5 w-5 leading-5 align-middle mr-2" />
          Link
        </button>
        <button disabled className={`hidden lg:flex ${buttonClass} ${activeButton !== 'pool' && 'text-reddit_text-darker'}`}>
          <AddImageIcon className="h-5 w-5 leading-5 align-middle mr-2" />
          Pool
        </button>
        <button disabled className={`hidden lg:flex ${buttonClass} ${activeButton !== 'talk' && 'text-reddit_text-darker'}`}>
          <AddImageIcon className="h-5 w-5 leading-5 align-middle mr-2" />
          Talk
        </button>
      </div>
    </div>
  )
}

export default SubmitType;

