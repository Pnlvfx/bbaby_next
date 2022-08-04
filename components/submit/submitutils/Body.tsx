import Image from "next/image";
import { useContext, useState } from "react";
import { SubmitContext, SubmitContextType } from "../SubmitContext";
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
                    <FaTrashAlt className='text-reddit_text-darker px-2 py-1 mx-auto w-full h-full' />
                  </div>
              )}
                <div onClick={(e) => {
                  e.preventDefault()
                  setShowDeleteOptions(true)
                }} className='rounded-lg border flex justify-center border-reddit_border hover:border-4 hover:border-reddit_text'>
                  {isImage && (
                    <Image
                    src={selectedFile}
                    alt={'DisplayImage'}
                    height={height}
                    width={width}
                    />
                  )}
                  {isVideo && (
                    <video style={{backgroundColor: 'rgb(0,0,0)'}} className={`aspect-video rounded-md`} 
                    src={selectedFile}
                    //poster={image}
                    controls={true}
                    height={height}
                    width={width}
                    />
                  )}
                </div>
              <div className='text-center mt-3'>
                  <textarea 
                    className='resize-none bg-reddit_dark-brighter placeholder:text-reddit_text-darker placeholder:text-sm row-span-1 min-h-[24px] h-6 max-h-[200px]'
                    placeholder="Add caption"
                  />
              </div>
          </div>
          </ClickOutHandler>
      )}
    </>
  )
}

export default Body;
