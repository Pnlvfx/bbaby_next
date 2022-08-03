import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { buttonClass, Spinner } from '../../utils/Button';
import CreateImage from './CreateImage';
import UploadVideo from './UploadVideo';
import CreateVideo from './CreateVideo';
import { useRouter } from 'next/router';
import { getOneNews } from '../../mynews/APInews';
import { YoutubeContext, YoutubeContextProps } from './YoutubeContext';
import { TimeMsgContext, TimeMsgContextProps } from '../../main/TimeMsgContext';

const Youtube = () => {
  const server = process.env.NEXT_PUBLIC_SERVER_URL
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
  const router = useRouter()
  const {setNews} = useContext(YoutubeContext) as YoutubeContextProps;

  useEffect(() => { //GET THE NEWS FROM THE QUERY
    if (!router.isReady) return
    if (!router.query.newsId) {
      if (!router.query.code) {
        router.push('/news')
      }
    } else {
      getOneNews(router.query.newsId.toString()).then((res) => {
        setNews(res.data);
    })
    }
  }, [router])


  const createVideo = async () => {
    try {
      setLoading(true)
      const data = { _videoOptions: videoOptions, images: input.localImages }
      const res = await axios.post(`${server}/governance/create-video`, data, {withCredentials: true})
      setMessage({value:res.data.msg, status: 'success'})
      setInput({ ...input, video: res.data.video})
      setLoading(false)
    } catch (err: any) {
      err?.response?.data?.msg &&
        setMessage({value: err.response.data.msg, status: 'error'})
        setLoading(false)
    }
  }

  return (
    <main>
      <CreateImage
        modalType={modalType}
        setModalType={setModalType}
        setInput={setInput}
      />
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
            setInput={setInput}
            setModalType={setModalType}
          />
          <hr className="border-reddit_border" />
        </>
      )}
    </main>
  )
}

export default Youtube
