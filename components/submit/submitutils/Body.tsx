import Image from "next/image"
import { useContext, useState } from "react"
import { SubmitContext, SubmitContextType } from "../SubmitContext"
import ClickOutHandler from 'react-clickout-ts';
import { FaTrashAlt } from "react-icons/fa";

const Body = () => {
  const [showDeleteOptions,setShowDeleteOptions] = useState(false)
  const {height,width,selectedFile,setSelectedFile,isImage,setIsImage,body,setBody,isVideo} = useContext(SubmitContext) as SubmitContextType;
  return (
    <>
    {!selectedFile && (
            <textarea 
            className='placeholder-reddit_text-darker w-full text-sm outline-none
            bg-reddit_dark-brighter p-2 min-h-[135px]'
            placeholder={'Text (optional)'}
            onChange={e => setBody(e.target.value)}
            value={body}/>
      )}
      {selectedFile && height && width && (
          <ClickOutHandler onClickOut={() => setShowDeleteOptions(false)}>
              <div className='relative rounded-lg my-9 mx-5'>
              {showDeleteOptions && (
                  <div onClick={() => {
                      setSelectedFile(null)
                      setIsImage(false)
                      setShowDeleteOptions(false)
                      }} className='border border-reddit_border mx-auto w-9 h-8 hover:bg-reddit_dark-brightest cursor-pointer'>
                  <FaTrashAlt className='text-reddit_text-darker px-2 py-1 self-center mx-auto w-full h-full' />
                  </div>
              )}
              <div onClick={() => {
                      setShowDeleteOptions(true)
                  }}>
                  <div className='rounded-lg mx-auto border border-reddit_border hover:border-4 hover:border-reddit_text'>
                    {isImage && (
                      <Image
                      src={selectedFile}
                      alt={'DisplayImage'}
                      height={`${height}px`}
                      width={`${width}px`}
                      />
                    )}
                    {isVideo && (
                      <video className={`aspect-video`} 
                      src={selectedFile}
                      //poster={image}
                      controls
                      height={`${height}px`}
                      width={`${width}px`}
                      />
                    )}
                  </div>
              </div>
              <div className='text-center'>
                  <textarea className='bg-reddit_dark-brighter' />
              </div>
          </div>
          </ClickOutHandler>
      )}
    </>
  )
}

export default Body