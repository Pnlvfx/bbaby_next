import axios from "axios"
import { useState } from "react"
import { buttonClass, Spinner } from "../../utils/Button"
import ShowTimeMsg from "../../utils/notification/ShowTimeMsg"
import CreateImage from './CreateImage'
import UploadVideo from "./UploadVideo"
import CreateVideo from "./CreateVideo"

const Youtube = () => {
  const server = process.env.NEXT_PUBLIC_SERVER_URL
  //VIDEOSHOW OPTIONS
  type VideoOptionsProps = {
    fps: number
    transition: Boolean
    transitionDuration: number
  }
  const _videoOptions:VideoOptionsProps = {
    fps: 24,
    transition: true,
    transitionDuration: 1, // seconds
  }
  const [videoOptions,setVideoOptions] = useState(_videoOptions)
  //
  
  //YOUTUBE INPUT
  const _input:InputProps = {
    images: [],
    video: '',
    localImages: [],
    audio: [],
    finalAudio: '',
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
  const [modalType,setModalType] = useState('create_image') // create_image // create_video
  const [loading,setLoading] = useState(false)
  //
  const createVideo = async() => {
    try {
      setLoading(true)
      const data = {_videoOptions:videoOptions,images:input.localImages}
      const res = await axios.post(`${server}/governance/create-video`,data, {withCredentials:true})
      setInput({...input, video: res.data.video, success: res.data.success})
      setLoading(false)
    } catch (err:any) {
      err?.response?.data?.msg &&
      setInput({...input,err:err.response.data.msg})
      setLoading(false)
    }
  }
  
  return (
    <div id="display_youtube" className="w-full">
        <div className="border border-reddit_border bg-reddit_dark-brighter rounded-md overflow-hidden">
          <CreateImage modalType={modalType} setModalType={setModalType} input={input} setInput={setInput}/>
          {modalType === 'create_video' && (
            <>
            <CreateVideo input={input} setInput={setInput} videoOptions={videoOptions} setVideoOptions={setVideoOptions} />
            {!input.video && <div id="create_video" className="mt-2 flex p-2">
                    <div className="self-center">
                      <h1 className="">Submit:</h1>
                    </div>
                    <div className="ml-auto self-center">
                        <>
                        <button type='submit' onClick={() => {
                          createVideo()
                        }} className={`w-40 h-7 mb-3 ml-auto mr-5 ${buttonClass()}`}>
                          {loading && <Spinner />}
                          {!loading && <h1>Create Video</h1>}
                        </button>
                        </>
                    </div>
                </div>}
                <UploadVideo input={input} setInput={setInput} setModalType={setModalType} />
                <hr className="border-reddit_border" />
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
