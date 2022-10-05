import { useContext, useState } from 'react';
import { buttonClass, Spinner } from '../../utils/Button';
import CreateImage from './CreateImage';
import UploadVideo from './UploadVideo';
import CreateVideo from './CreateVideo';
import { TimeMsgContext, TimeMsgContextProps } from '../../main/TimeMsgContext';
import { NextComponentType } from 'next';
import { postRequestHeaders } from '../../main/config';
import { catchErrorWithMessage } from '../../API/common';

const Youtube:NextComponentType = () => {
  const message = useContext(TimeMsgContext) as TimeMsgContextProps;
  const _videoOptions = {
    fps: '24',
    transition: 'false',
    transitionDuration: '0', // seconds
  }
  const _input = {
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
  const [videoOptions, setVideoOptions] = useState<VideoOptionsProps>(_videoOptions);
  const [input, setInput] = useState<InputProps>(_input);
  const [modalType, setModalType] = useState<modalType>('create_image');
  const [loading, setLoading] = useState(false);


  const createVideo = async () => {
    try {
      const server = process.env.NEXT_PUBLIC_SERVER_URL
      setLoading(true)
      const body = JSON.stringify({ _videoOptions: videoOptions, images: input.localImages });
      const url = `${server}/governance/create-video`;
      const res = await fetch(url,{
        method: 'post',
        headers: postRequestHeaders,
        body,
        credentials: 'include'
      });
      if (res.ok) {
        const response = await res.json();
        message.setMessage({value:response.msg, status: 'success'})
        setInput({ ...input, video: response.video})
      } else {
        const error = await res.json();
        message.setMessage({value: error.msg, status: 'error'})
      }
      setLoading(false)
    } catch (err) {
      setLoading(false);
      catchErrorWithMessage(err, message);
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

