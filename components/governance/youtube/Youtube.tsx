import axios from "axios"
import { useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import Button from "../../utils/Button"
import ShowTimeMsg from "../../utils/notification/ShowTimeMsg"
import CreateImage from './CreateImage'
import UploadVideo from "./UploadVideo"
import CreateVideo from "./CreateVideo"

const Youtube = () => {
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  //VIDEOSHOW OPTIONS
  type VideoOptionsProps = {
    fps: number,
    transition: Boolean,
    transitionDuration: number
  }
  const _videoOptions:VideoOptionsProps = {
    fps: 24,
    transition: true,
    transitionDuration: 1, // seconds
  }
  const [videoOptions,setVideoOptions] = useState(_videoOptions)
  //
  type InputProps = {
    images: [{
      path: string
    }],
    video: string,
    localPath: string,
    audio: [],
    audioDuration: [],
    height: number,
    width: number,
    title: string,
    description: string,
    keywords: string,
    category: string,
    privacyStatus: string,
    err: string,
    success: string
  }
  //YOUTUBE INPUT
  const _input:InputProps = {
    images: [{path: ''}],
    video: '',
    localPath: '',
    audio: [],
    audioDuration: [],
    height: 0,
    width: 0,
    title: '',
    description: '',
    keywords: '',
    category: '',
    privacyStatus: '',
    err: '',
    success: ''
  }
  const [input,setInput] = useState(_input)
  const [showInput,setShowInput] = useState(false)
  const [loading,setLoading] = useState(false)
  //
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
  
  return (
    <div id="display_youtube" className="w-full mx-12">
        <div className="border border-reddit_border ml-2 bg-reddit_dark-brighter rounded-md overflow-hidden">
          <CreateImage input={input} setInput={setInput} setShowInput={setShowInput}/>
          {showInput && (
            <>
            <CreateVideo input={input} setInput={setInput} videoOptions={videoOptions} setVideoOptions={setVideoOptions} />
            <div id="create_video" className="mt-2 flex p-2">
                    <div className="self-center">
                      {!input.video && <h1 className="">Submit:</h1>}
                    </div>
                    <div className="ml-auto self-center">
                      {!input.video && (
                        <>
                        <Button type='submit' onClick={() => {
                          createVideo()
                        }} className='w-40 h-7 mb-3 ml-auto mr-5'>
                          {loading && <AiOutlineLoading3Quarters className='animate-spin mx-auto'/>}
                          {!loading && <h1>Create Video</h1>}
                        </Button>
                        </>
                      )}
                    </div>
                </div>
                <UploadVideo input={input} />
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
          <ShowTimeMsg value={input.err} status={'error'} setValue={setInput} gov_value={input}/>
        )}
         {input && input.success && (
          <ShowTimeMsg value={input.success} setValue={setInput} gov_value={input}/>
        )}
        </div>
      </div>
  )
}

export default Youtube;
