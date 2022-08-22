import { useContext, useState } from 'react';
import { buttonClass, Spinner } from '../../utils/Button';
import CreateImage from './CreateImage';
import UploadVideo from './UploadVideo';
import CreateVideo from './CreateVideo';
import { TimeMsgContext, TimeMsgContextProps } from '../../main/TimeMsgContext';
import { NextComponentType } from 'next';
import { postRequestHeaders } from '../../main/config';

const Youtube:NextComponentType = () => {
  const {setMessage} = useContext(TimeMsgContext) as TimeMsgContextProps;
  const _videoOptions: VideoOptionsProps = {
    fps: '24',
    transition: 'false',
    transitionDuration: '0', // seconds
  }
  const [videoOptions, setVideoOptions] = useState(_videoOptions)
  const _input: InputProps = {
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
    msg: ''
  }
  const [input, setInput] = useState(_input)
  const [modalType, setModalType] = useState<modalType>('create_image')
  const [loading, setLoading] = useState(false)


  const createVideo = async () => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    setLoading(true)
    try {
      const body = JSON.stringify({ _videoOptions: videoOptions, images: input.localImages })
      const url = `${server}/governance/create-video`
      const res = await fetch(url,{
        method: 'post',
        headers: postRequestHeaders,
        body,
        credentials: 'include'
      })
      if (res.ok) {
        const response = await res.json();
        setMessage({value:response.msg, status: 'success'})
        setInput({ ...input, video: response.video})
      } else {
        const error = await res.json();
        setMessage({value: error.msg, status: 'error'})
      }
      setLoading(false)
    } catch (err) {
      if (err instanceof Error) {
        setMessage({value: err.message, status: 'error'})
      } else {
        setMessage({value: `That's strange!`, status: 'error'})
      }
      setLoading(false)
    }
  }

  return (
    <main>
      {modalType === 'create_image' && (
        <CreateImage
          setModalType={setModalType}
          setInput={setInput}
        />
      )}
      {modalType === 'create_video' && (
        <>
          <CreateVideo
            input={input}
            setInput={setInput}
            videoOptions={videoOptions}
            setVideoOptions={setVideoOptions}
          />
          {!input.video && (
            <div id="create_video" className="mt-2 flex p-2">
              <div className="ml-auto">
                <>
                  <button
                    type="submit"
                    onClick={() => {
                      createVideo()
                    }}
                    className={`mb-3 ml-auto mr-5 h-7 w-40 ${buttonClass()}`}
                  >
                    {loading && <Spinner />}
                    {!loading && <p>Create Video</p>}
                  </button>
                </>
              </div>
            </div>
          )}
          <UploadVideo
            input={input}
            setModalType={setModalType}
          />
        </>
      )}
    </main>
  )
}

export default Youtube;

