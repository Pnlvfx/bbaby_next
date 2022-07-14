import Input from "../../utils/Input"
import { FaPause, FaPlay } from "react-icons/fa"
import Image from "next/image"
import {useState} from "react"
import ReactHowler from 'react-howler'

const CreateVideo = ({setVideoOptions,input,setInput,videoOptions}:any) => {
  const [imageIndex,setImageIndex] = useState(0)
  const [isPlaying,setIsPlaying] = useState(false)

  return (
   <>
   <div className="flex">
      <form className="p-2 w-full text-sm">
          {!input?.video && (
            <>
              <div id="fps" className="mt-2 flex">
                <div className="self-center">
                  <h1 className="">Fps:</h1>
                </div>
                <div className="ml-auto self-center">
                  <Input type='text' title='fps' value={videoOptions.fps} onChange={(e: { target: { value: any } }) => setVideoOptions({...videoOptions,fps:e.target.value})} className='p-2 font-bold'/>
                </div>
            </div>
            <div id="transition" className="mt-2 flex">
                <div className="self-center">
                  <h1 className="">Transition:</h1>
                </div>
                <div className="ml-auto self-center">
                  <Input type='text' title='transition' value={videoOptions.transition} onChange={(e: { target: { value: boolean } }) => setVideoOptions({...videoOptions,transition:e.target.value})} className='p-2 font-bold'/>
                </div>
            </div>
            <div id="transition_duration" className="mt-2 flex">
                <div className="self-center">
                  <h1 className="">Transition_duration:</h1>
                </div>
                <div className="ml-auto self-center">
                  <Input type='text' title='fps' value={videoOptions.transitionDuration} onChange={(e: { target: { value: number } }) => setVideoOptions({...videoOptions,transitionDuration:e.target.value})} className='p-2 font-bold'/>
                </div>
            </div>
            <hr className="border-reddit_border" />
            <div id="audio" className="mt-2 flex">
              <div className="self-center">
                <h1 className="">Audio:</h1>
              </div>
              <div className="ml-auto self-center">
              <ReactHowler src={input.finalAudio} playing={isPlaying} onEnd={() => setIsPlaying(false)} />
                <button onClick={e => {
                  e.preventDefault()
                  setIsPlaying(!isPlaying)
                }} className="pr-[80px]">
                    {!isPlaying && <FaPlay className="w-6 h-6"/>}
                    {isPlaying && <FaPause className="w-6 h-6"/>}
                </button>
              </div>
            </div>
            </>
          )}
          {input?.video && (
            <>
              <div id="set_title" className="mt-2 flex">
                <div>
                  <h1 className="mt-[8px]">Title:</h1>
                </div>
                <div className="ml-auto w-full self-center">
                  <textarea 
                  title='title' 
                  value={input.title} 
                  onChange={(e:any) => {setInput({...input,title:e.target.value})}} 
                  className='p-2 font-bold w-full bg-reddit_dark-brighter min-h-[100px] max-h-[335px]'
                  />
                </div>
              </div>
              <div id="set_description" className="mt-2 flex">
                  <div>
                    <h1 className="mt-[8px]">Description:</h1>
                  </div>
                  <div className="ml-auto w-full self-center">
                    <textarea 
                    title='description' 
                    value={input.description} 
                    onChange={(e:any) => {setInput({...input,description:e.target.value})}} 
                    className='p-2 font-bold w-full bg-reddit_dark-brighter min-h-[135px] max-h-[335px]'
                    />
                  </div>
              </div>
              <div id="keywords" className="mt-2 flex">
                  <div className="self-center">
                    <h1 className="">Keywords:</h1>
                  </div>
                  <div className="ml-auto self-center">
                    <Input type='text' title='keywords' value={input.keywords} onChange={(e: { target: { value: any } }) => setInput({...input,keywords:e.target.value})} className='p-2 font-bold'/>
                  </div>
              </div>
              <div id="category" className="mt-2 flex">
                  <div className="self-center">
                    <h1 className="">Category:</h1>
                  </div>
                  <div className="ml-auto self-center">
                    <Input type='text' title='keywords' value={input.category} onChange={(e: { target: { value: any } }) => setInput({...input,category:e.target.value})} className='p-2 font-bold'/>
                  </div>
              </div>
              <div id="privacyStatus" className="mt-2 flex">
                  <div className="self-center">
                    <h1 className="">PrivacyStatus:</h1>
                  </div>
                  <div className="ml-auto self-center">
                    <Input type='text' title='privacyStatus' value={input.privacyStatus} onChange={(e: { target: { value: any } }) => setInput({...input,privacyStatus:e.target.value})} className='p-2 font-bold'/>
                  </div>
              </div>
            </>
          )}
      </form>
      <div className="p-6 ml-auto mt-2">
        {!input?.video && (
          <div onClick={() => {
            if (imageIndex !== input.images.length - 1) {
              setImageIndex(imageIndex + 1)
            } else {
              setImageIndex(0)
            }
          }} className='cursor-pointer' >
            <Image src={input.images[imageIndex]} alt='' width={input.width} height={input.height} unoptimized/>
          </div>
        )}
        {input?.video && (
              <video className={`aspect-video`} 
              src={input.video}
              id='video_pre-share'
              poster={input.images[0]}
              controls
              width={input.width}
              height={input.height}
              />
        )}
      </div>
    </div>
   </>
  )
}

export default CreateVideo