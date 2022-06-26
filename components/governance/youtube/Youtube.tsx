import axios from "axios"
import Image from "next/image"
import { useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { FaPause, FaPlay } from "react-icons/fa"
import Button from "../../utils/Button"
import Input from "../../utils/Input"
import ShowTimeMsg from "../../utils/notification/ShowTimeMsg"
import CreateImage from './CreateImage'
import {Howl} from 'howler'

const Youtube = () => {
  const server = process.env.NEXT_PUBLIC_SERVER_URL

  //VIDEOSHOW OPTIONS
  const _videoOptions = {
    loop: 15,
    fps: 24,
    transition: true,
    transitionDuration: 1, // seconds
  }
  const [videoOptions,setVideoOptions] = useState(_videoOptions)

  //

  //YOUTUBE INPUT
  const initialState = {
    images: [{path: ''}],
    video: '',
    localPath: '',
    audio: [],
    audioDuration: [],
    height: '',
    width: '',
    title: '',
    description: '',
    keywords: '',
    category: '',
    privacyStatus: '',
    err: '',
    success: ''
  }

  const [input,setInput] = useState(initialState)
  const [showInput,setShowInput] = useState(false)
  const [loading,setLoading] = useState(false)
  const [imageIndex,setImageIndex] = useState(0)
  //

  const [isPlaying,setIsPlaying] = useState(false)

  const createVideo = async() => {
    try {
      setLoading(true)
      const data = {_videoOptions:videoOptions,images:input.images}
      const res = await axios.post(`${server}/governance/create-video`,data, {withCredentials:true})
      setInput({...input, video: res.data.video, localPath: res.data.localPath, success: res.data.success})
      setLoading(false)
    } catch (err:any) {
      err?.response?.data?.msg &&
      setInput({...input,err:err.response.data.msg})
      setLoading(false)
    }
  }

  const soundPlay = () => {
    const sound = new Howl({
      src: [input.audio[imageIndex]],
      format: ['mp3'],
      html5: true
    })
    sound.once('load', function() {
      setIsPlaying(true)
      sound.play()
    })
    sound.on('end', function() {
      setIsPlaying(false)
    })
  }

  const uploadYoutube = async() => {
    try {
        const res = await axios.post(`${server}/governance/youtube`, {}, {withCredentials:true})
        console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <div id="display_youtube" className="w-full mx-12">
        <div className="border border-reddit_border ml-2 bg-reddit_dark-brighter rounded-md overflow-hidden">
          <CreateImage input={input} setInput={setInput} setShowInput={setShowInput}/>
        {showInput && (
          <>
          <div className="flex">
            <form className="p-2 w-full text-sm">
                <div id="loop" className="mt-2 flex">
                    <div className="self-center">
                      <h1 className="">Loop:</h1>
                    </div>
                    <div className="ml-auto self-center">
                      <Input type='text' title='video_loop' value={videoOptions.loop} onChange={(e: { target: { value: any } }) => setVideoOptions({...videoOptions,loop:e.target.value})} className='p-2 font-bold'/>
                    </div>
                </div>
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
                      <Input type='text' title='transition' value={videoOptions.transition} onChange={(e: { target: { value: any } }) => setVideoOptions({...videoOptions,transition:e.target.value})} className='p-2 font-bold'/>
                    </div>
                </div>
                <div id="transition_duration" className="mt-2 flex">
                    <div className="self-center">
                      <h1 className="">Transition_duration:</h1>
                    </div>
                    <div className="ml-auto self-center">
                      <Input type='text' title='fps' value={videoOptions.transitionDuration} onChange={(e: { target: { value: any } }) => setVideoOptions({...videoOptions,transitionDuration:e.target.value})} className='p-2 font-bold'/>
                    </div>
                </div>
                <hr className="border-reddit_border" />
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
                <div id="audio" className="mt-2 flex">
                    <div className="self-center">
                      <h1 className="">Audio:</h1>
                    </div>
                    <div className="ml-auto self-center">
                      <button onClick={e => {
                        e.preventDefault()
                        soundPlay()
                      }} className="pr-[80px]">
                        {!isPlaying && <FaPlay className="w-6 h-6"/>}
                        {isPlaying && <FaPause className="w-6 h-6"/>}
                      </button>
                    </div>
                </div>
                <div id="audio_duration" className="mt-2 flex">
                    <div className="self-center">
                      <h1 className="">audio_duration:</h1>
                    </div>
                    <div className="ml-auto self-center text-center">
                      <p title='audio_duration' className='p-2 font-bold w-full text-center'>{input.audioDuration[imageIndex]}</p>
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
            </form>
            <div className="p-6 ml-auto mt-2">
              {!input?.video && (
                <div onClick={() => {
                  if (imageIndex !== input.images.length -1) {
                    setImageIndex(imageIndex + 1)
                  } else {
                    setImageIndex(0)
                  }
                }} style={{width: input.width, height: input.height}} className='relative cursor-pointer' >
                  <Image src={input.images[imageIndex].path} layout='fill' unoptimized/>
                </div>
              )}
              {input?.video && (
                <div className="relative" style={{width: input.width, height: input.height}} >
                   <video className={`aspect-video`} 
                    src={input.video}
                    id='video_pre-share'
                    poster={input.images[0].path}
                    controls
                    width={input.width}
                    height={input.height}
                    />
                </div>
              )}
            </div>
          </div>
          <div id="create_video" className="mt-2 flex p-2">
                  <div className="self-center">
                    <h1 className="">Submit:</h1>
                  </div>
                  <div className="ml-auto self-center">
                    {loading && (
                      <Button disabled className='w-40 h-7 mb-3 ml-auto mr-5'>
                          <AiOutlineLoading3Quarters className='animate-spin mx-auto' />
                      </Button>
                    )}
                    {!loading && (
                      <>
                      <Button type='submit' onClick={() => {
                        createVideo()
                      }} className='w-40 h-7 mb-3 ml-auto mr-5'>
                          <h1>Create Video</h1>
                      </Button>
                       <Button type='submit' onClick={() => {
                        uploadYoutube()
                      }} className='w-40 h-7 mb-3 ml-auto mr-5'>
                          <h1>Upload to youtube</h1>
                      </Button>
                      </>
                    )}
                  </div>
              </div>
              <hr className="border-reddit_border" />
              <div id="python_code" className="mt-2 flex p-2">
                    <div>
                      <h1 className="mt-[8px] flex-none">Python Code:</h1>
                    </div>
                    <div className="ml-auto w-full self-center">
                      <p className='p-2 font-bold w-full bg-reddit_dark-brighter text-sm text-blue-600'>
                        {`python upload_video.py --file="${input.localPath}" --title="${input.title}" --description="${input.description}" --keywords="${input.keywords}" --category="${input.category}" --privacyStatus="${input.privacyStatus}"`}
                      </p>
                    </div>
                </div>
            </>
        )}
        {input && input.err && (
          <ShowTimeMsg value={input.err} setValue={setInput} gov_value={input}/>
        )}
         {input && input.success && (
          <ShowTimeMsg value={input.success} setValue={setInput} gov_value={input}/>
        )}
        </div>
      </div>
  )
}

export default Youtube;
